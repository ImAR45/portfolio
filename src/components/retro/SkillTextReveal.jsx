import { useState, useEffect, useMemo } from 'react';

const ANIMATION_STYLES = [
    'fall-down',     // Words drop from above
    'fly-up',        // Words fly up from below
    'fly-left',      // Words slide in from the right
    'scatter',       // Words start scattered then assemble
    'glitch',        // Matrix glitch effect
    'bounce-in',     // Words bounce in with spring physics
];

const EMOJI_PARTICLES = ['✨', '💥', '⚡', '🔥', '💫', '⭐', '🌟', '💎', '🎯', '🚀'];

function splitIntoTokens(text) {
    // Split into words but keep emojis separate for special treatment
    const tokens = [];
    const regex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            const words = text.slice(lastIndex, match.index).trim().split(/\s+/).filter(Boolean);
            words.forEach((w) => tokens.push({ text: w, isEmoji: false }));
        }
        tokens.push({ text: match[0], isEmoji: true });
        lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
        const words = text.slice(lastIndex).trim().split(/\s+/).filter(Boolean);
        words.forEach((w) => tokens.push({ text: w, isEmoji: false }));
    }

    return tokens;
}

export default function SkillTextReveal({ text, skillName }) {
    const [phase, setPhase] = useState('animating');
    const [particles, setParticles] = useState([]);

    // Pick a consistent random animation per skill name
    const animStyle = useMemo(() => {
        let hash = 0;
        for (let i = 0; i < skillName.length; i++) {
            hash = ((hash << 5) - hash) + skillName.charCodeAt(i);
            hash |= 0;
        }
        return ANIMATION_STYLES[Math.abs(hash) % ANIMATION_STYLES.length];
    }, [skillName]);

    const tokens = useMemo(() => splitIntoTokens(text), [text]);

    // Spawn emoji particles on mount
    useEffect(() => {
        const spawned = Array.from({ length: 6 }, (_, i) => ({
            id: i,
            emoji: EMOJI_PARTICLES[Math.floor(Math.random() * EMOJI_PARTICLES.length)],
            x: 20 + Math.random() * 60,
            y: 20 + Math.random() * 60,
            delay: Math.random() * 0.3,
            size: 1 + Math.random() * 1.2,
        }));
        setParticles(spawned);

        // Settle into final position
        const timer = setTimeout(() => setPhase('settled'), 1800);
        return () => clearTimeout(timer);
    }, [text]);

    return (
        <div className={`skill-reveal skill-reveal--${animStyle} skill-reveal--${phase}`}>
            {/* Emoji burst particles */}
            {phase === 'animating' && particles.map((p) => (
                <span
                    key={p.id}
                    className="skill-reveal__particle"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        animationDelay: `${p.delay}s`,
                        fontSize: `${p.size}rem`,
                    }}
                >
                    {p.emoji}
                </span>
            ))}

            {/* Animated tokens */}
            <p className="skill-reveal__text">
                {tokens.map((token, i) => (
                    <span
                        key={`${skillName}-${i}`}
                        className={`skill-reveal__token ${token.isEmoji ? 'skill-reveal__token--emoji' : ''}`}
                        style={{
                            animationDelay: `${i * 0.07}s`,
                            '--rand-x': `${(Math.random() - 0.5) * 200}px`,
                            '--rand-y': `${(Math.random() - 0.5) * 200}px`,
                            '--rand-rot': `${(Math.random() - 0.5) * 720}deg`,
                        }}
                    >
                        {token.text}
                    </span>
                ))}
            </p>
        </div>
    );
}
