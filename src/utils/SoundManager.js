/**
 * RetroSoundManager — 8-bit chiptune sound effects & background music
 * using the Web Audio API. No external audio files needed.
 */

let audioCtx = null;
let isMuted = false;
let bgmGain = null;
let sfxGain = null;
let bgmOscillators = [];
let bgmRunning = false;
let bgmVolume = 0.5;   // 0-1 user control
let sfxVolume = 0.7;   // 0-1 user control
let bgmUserStopped = false; // true when user explicitly stopped BGM

/* ─── helpers ─── */

function getCtx() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    // Create SFX gain if missing
    if (!sfxGain) {
        sfxGain = audioCtx.createGain();
        sfxGain.gain.setValueAtTime(sfxVolume, audioCtx.currentTime);
        sfxGain.connect(audioCtx.destination);
    }
    return audioCtx;
}

function playNote(freq, duration, type = 'square', volume = 0.08, delay = 0) {
    if (isMuted) return;
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
    osc.connect(gain);
    gain.connect(sfxGain); // route through SFX volume control
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration + 0.05);
}

function playNotes(notes, type = 'square', volume = 0.08) {
    if (isMuted) return;
    let time = 0;
    notes.forEach(([freq, dur]) => {
        if (freq > 0) playNote(freq, dur, type, volume, time);
        time += dur;
    });
}

/* ─── SOUND EFFECTS ─── */

const SFX = {
    /** Generic UI click */
    click() {
        playNote(800, 0.06, 'square', 0.06);
        playNote(1200, 0.04, 'square', 0.04, 0.03);
    },

    /** Card / skill select */
    cardSelect() {
        playNotes([
            [523, 0.06], [659, 0.06], [784, 0.08],
        ], 'square', 0.07);
    },

    /** Card / skill deselect */
    cardDeselect() {
        playNotes([
            [784, 0.06], [523, 0.08],
        ], 'square', 0.05);
    },

    /** Text animation typing tick */
    textTick() {
        playNote(440 + Math.random() * 200, 0.03, 'square', 0.03);
    },

    /** Navigate to a new room/section */
    navigate() {
        playNotes([
            [330, 0.08], [440, 0.08], [550, 0.08], [660, 0.1],
        ], 'square', 0.06);
    },

    /** Quest / experience section opens */
    questOpen() {
        playNotes([
            [392, 0.12], [494, 0.12], [588, 0.15],
        ], 'triangle', 0.08);
    },

    /** Quest expanded */
    questExpand() {
        playNotes([
            [294, 0.08], [370, 0.08], [440, 0.1],
        ], 'square', 0.06);
    },

    /** Achievement unlocked — victory fanfare! */
    achievement() {
        playNotes([
            [523, 0.1], [0, 0.02],
            [659, 0.1], [0, 0.02],
            [784, 0.1], [0, 0.02],
            [1047, 0.25],
        ], 'square', 0.1);
        // Harmony layer
        setTimeout(() => {
            playNotes([
                [330, 0.1], [0, 0.02],
                [415, 0.1], [0, 0.02],
                [494, 0.1], [0, 0.02],
                [659, 0.25],
            ], 'triangle', 0.06);
        }, 0);
    },

    /** Level up — power-up jingle */
    levelUp() {
        playNotes([
            [262, 0.06], [330, 0.06], [392, 0.06],
            [523, 0.06], [659, 0.06], [784, 0.06],
            [1047, 0.2],
        ], 'square', 0.1);
        // Bass
        playNotes([
            [131, 0.06], [165, 0.06], [196, 0.06],
            [262, 0.06], [330, 0.06], [392, 0.06],
            [523, 0.2],
        ], 'triangle', 0.06);
    },

    /** Treasure / project revealed */
    treasureOpen() {
        playNotes([
            [440, 0.08], [554, 0.08], [659, 0.12],
            [0, 0.04],
            [880, 0.06], [784, 0.06], [880, 0.15],
        ], 'square', 0.08);
    },

    /** Contact / social section opened */
    contactOpen() {
        playNotes([
            [392, 0.1], [494, 0.1], [588, 0.1], [494, 0.08], [588, 0.15],
        ], 'triangle', 0.07);
    },

    /** Start quest / begin adventure */
    startQuest() {
        playNotes([
            [262, 0.1], [330, 0.08], [392, 0.08], [523, 0.12],
            [0, 0.05],
            [392, 0.06], [523, 0.06], [659, 0.15],
        ], 'square', 0.09);
    },

    /** Journey map open */
    mapOpen() {
        playNotes([
            [330, 0.12], [392, 0.12], [494, 0.12], [588, 0.18],
        ], 'triangle', 0.07);
    },

    /** Hover over node */
    hover() {
        playNote(600 + Math.random() * 100, 0.05, 'sine', 0.03);
    },
};

/* ─── BACKGROUND MUSIC — Bubble Bobble inspired theme ─── */

// Bouncy, cheerful chiptune inspired by the Bubble Bobble main theme.
// Fast tempo, major key, iconic ascending/descending runs.
const PATTERNS = [
    // A — main hook (bouncy ascending)
    {
        melody: [659, 659, 587, 523, 587, 659, 784, 0, 659, 587, 523, 440, 523, 587, 659, 0],
        bass: [262, 262, 262, 262, 294, 294, 392, 392, 262, 262, 220, 220, 262, 262, 330, 330]
    },
    // B — playful response
    {
        melody: [784, 784, 698, 659, 698, 784, 880, 0, 784, 698, 659, 587, 659, 698, 784, 0],
        bass: [392, 392, 349, 349, 349, 349, 440, 440, 392, 392, 330, 330, 330, 330, 392, 392]
    },
    // C — bouncy bridge
    {
        melody: [659, 587, 523, 587, 659, 523, 440, 0, 523, 587, 659, 784, 659, 587, 523, 0],
        bass: [262, 262, 262, 262, 330, 330, 220, 220, 262, 262, 330, 330, 392, 392, 262, 262]
    },
    // D — energetic climb
    {
        melody: [440, 523, 659, 523, 440, 392, 440, 0, 523, 659, 784, 659, 523, 440, 392, 0],
        bass: [220, 220, 330, 330, 220, 220, 196, 196, 262, 262, 392, 392, 262, 262, 196, 196]
    },
    // E — triumphant peak
    {
        melody: [784, 880, 784, 659, 523, 659, 784, 0, 880, 784, 659, 523, 659, 784, 880, 0],
        bass: [392, 392, 392, 392, 262, 262, 392, 392, 440, 440, 330, 330, 330, 330, 440, 440]
    },
    // F — cheerful resolution (back to start)
    {
        melody: [659, 784, 659, 523, 440, 523, 659, 0, 523, 440, 392, 440, 523, 587, 659, 0],
        bass: [330, 330, 330, 330, 220, 220, 330, 330, 262, 262, 196, 196, 262, 262, 330, 330]
    },
];

const BGM_NOTE_DUR = 0.15;   // fast bouncy tempo like Bubble Bobble
const BGM_BASE_VOL = 0.06;   // base melody volume (scaled by bgmVolume)
const BGM_BASS_RATIO = 0.65; // bass relative to melody
const BGM_ARP_RATIO = 0.35;  // arpeggio relative to melody

let bgmPatternIdx = 0;
let bgmTimerId = null;
let bgmStarted = false; // has BGM ever been started this session?

function schedulePattern() {
    if (!bgmRunning || isMuted) return;
    const ctx = getCtx();
    const now = ctx.currentTime;
    const pat = PATTERNS[bgmPatternIdx % PATTERNS.length];

    // Clean up old oscillators
    bgmOscillators = bgmOscillators.filter(o => {
        try { return o.context && o.playbackState !== 'finished'; } catch { return false; }
    });

    // Melody
    pat.melody.forEach((freq, i) => {
        if (freq <= 0) return;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + i * BGM_NOTE_DUR);
        const melVol = BGM_BASE_VOL * bgmVolume;
        g.gain.setValueAtTime(melVol, now + i * BGM_NOTE_DUR);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * BGM_NOTE_DUR + BGM_NOTE_DUR * 0.85);
        osc.connect(g);
        g.connect(bgmGain);
        osc.start(now + i * BGM_NOTE_DUR);
        osc.stop(now + i * BGM_NOTE_DUR + BGM_NOTE_DUR);
        bgmOscillators.push(osc);
    });

    // Bass line
    pat.bass.forEach((freq, i) => {
        if (freq <= 0) return;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * BGM_NOTE_DUR);
        const bassVol = BGM_BASE_VOL * bgmVolume * BGM_BASS_RATIO;
        g.gain.setValueAtTime(bassVol, now + i * BGM_NOTE_DUR);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * BGM_NOTE_DUR + BGM_NOTE_DUR * 0.85);
        osc.connect(g);
        g.connect(bgmGain);
        osc.start(now + i * BGM_NOTE_DUR);
        osc.stop(now + i * BGM_NOTE_DUR + BGM_NOTE_DUR);
        bgmOscillators.push(osc);
    });

    // Arpeggio layer — quick notes for shimmer
    pat.melody.forEach((freq, i) => {
        if (freq <= 0 || i % 2 !== 0) return; // every other note
        const arpFreq = freq * 2; // octave up
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(arpFreq, now + i * BGM_NOTE_DUR);
        const arpVol = BGM_BASE_VOL * bgmVolume * BGM_ARP_RATIO;
        g.gain.setValueAtTime(arpVol, now + i * BGM_NOTE_DUR);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * BGM_NOTE_DUR + BGM_NOTE_DUR * 0.5);
        osc.connect(g);
        g.connect(bgmGain);
        osc.start(now + i * BGM_NOTE_DUR);
        osc.stop(now + i * BGM_NOTE_DUR + BGM_NOTE_DUR * 0.6);
        bgmOscillators.push(osc);
    });

    bgmPatternIdx++;

    // Schedule next pattern
    const patternDuration = pat.melody.length * BGM_NOTE_DUR;
    bgmTimerId = setTimeout(() => schedulePattern(), patternDuration * 1000 - 50);
}

function startBGM() {
    if (bgmRunning || isMuted || bgmUserStopped) return;
    bgmRunning = true;
    bgmStarted = true;

    const ctx = getCtx();
    bgmGain = ctx.createGain();
    bgmGain.gain.setValueAtTime(1, ctx.currentTime);
    bgmGain.connect(ctx.destination);

    schedulePattern();
}

function stopBGM() {
    bgmRunning = false;
    if (bgmTimerId) { clearTimeout(bgmTimerId); bgmTimerId = null; }
    bgmOscillators.forEach(o => { try { o.stop(); } catch { } });
    bgmOscillators = [];
    if (bgmGain) { try { bgmGain.disconnect(); } catch { } bgmGain = null; }
}

/* ─── AUTO-START on first interaction ─── */

let autoStartBound = false;

function autoStartHandler() {
    if (!bgmStarted && !isMuted) {
        startBGM();
    }
    document.removeEventListener('click', autoStartHandler);
    document.removeEventListener('keydown', autoStartHandler);
    autoStartBound = false;
}

function bindAutoStart() {
    if (autoStartBound) return;
    autoStartBound = true;
    document.addEventListener('click', autoStartHandler, { once: true });
    document.addEventListener('keydown', autoStartHandler, { once: true });
}

if (typeof document !== 'undefined') {
    bindAutoStart();
}

/* ─── PUBLIC API ─── */

export const SoundManager = {
    /** Play a named sound effect */
    play(name) {
        if (isMuted) return;
        if (!bgmStarted && !bgmRunning && !bgmUserStopped) startBGM();
        const fn = SFX[name];
        if (fn) fn();
    },

    /** Start background music */
    startMusic() {
        bgmUserStopped = false;
        if (!isMuted) startBGM();
    },

    /** Stop background music */
    stopMusic() {
        bgmUserStopped = true;
        stopBGM();
        bgmStarted = false;
    },

    /** Is BGM currently playing? */
    isBgmPlaying() {
        return bgmRunning;
    },

    /** Toggle mute on/off (everything) */
    toggleMute() {
        isMuted = !isMuted;
        if (isMuted) {
            stopBGM();
        } else {
            startBGM();
        }
        return isMuted;
    },

    /** Get mute state */
    isMuted() {
        return isMuted;
    },

    /** Set BGM volume (0–1) */
    setBgmVolume(val) {
        bgmVolume = Math.max(0, Math.min(1, val));
    },

    /** Get BGM volume (0–1) */
    getBgmVolume() {
        return bgmVolume;
    },

    /** Set SFX volume (0–1) */
    setSfxVolume(val) {
        sfxVolume = Math.max(0, Math.min(1, val));
        if (sfxGain && audioCtx) {
            sfxGain.gain.setValueAtTime(sfxVolume, audioCtx.currentTime);
        }
    },

    /** Get SFX volume (0–1) */
    getSfxVolume() {
        return sfxVolume;
    },
};

