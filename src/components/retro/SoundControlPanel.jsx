import { useState } from 'react';
import { SoundManager } from '../../utils/SoundManager';

export default function SoundControlPanel({ onClose }) {
    const [bgmVol, setBgmVol] = useState(SoundManager.getBgmVolume());
    const [sfxVol, setSfxVol] = useState(SoundManager.getSfxVolume());
    const [bgmOn, setBgmOn] = useState(SoundManager.isBgmPlaying());

    const handleBgmVolChange = (e) => {
        const v = parseFloat(e.target.value);
        setBgmVol(v);
        SoundManager.setBgmVolume(v);
    };

    const handleSfxVolChange = (e) => {
        const v = parseFloat(e.target.value);
        setSfxVol(v);
        SoundManager.setSfxVolume(v);
        // Play a test click so user can hear the volume
        SoundManager.play('click');
    };

    const toggleBgm = () => {
        if (bgmOn) {
            SoundManager.stopMusic();
            setBgmOn(false);
        } else {
            SoundManager.startMusic();
            setBgmOn(true);
        }
    };

    return (
        <div className="sound-panel" onClick={(e) => e.stopPropagation()}>
            <div className="sound-panel__header">
                <span className="sound-panel__title">🎮 Sound Settings</span>
                <button className="sound-panel__close" onClick={onClose}>✕</button>
            </div>

            {/* BGM Volume */}
            <div className="sound-panel__row">
                <div className="sound-panel__label">
                    <span>🎵 Music</span>
                    <span className="sound-panel__val">{Math.round(bgmVol * 100)}%</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={bgmVol}
                    onChange={handleBgmVolChange}
                    className="sound-panel__slider sound-panel__slider--bgm"
                />
            </div>

            {/* SFX Volume */}
            <div className="sound-panel__row">
                <div className="sound-panel__label">
                    <span>🔊 Effects</span>
                    <span className="sound-panel__val">{Math.round(sfxVol * 100)}%</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={sfxVol}
                    onChange={handleSfxVolChange}
                    className="sound-panel__slider sound-panel__slider--sfx"
                />
            </div>

            {/* BGM Toggle */}
            <div className="sound-panel__actions">
                <button
                    className={`sound-panel__btn ${bgmOn ? 'sound-panel__btn--stop' : 'sound-panel__btn--play'}`}
                    onClick={toggleBgm}
                >
                    {bgmOn ? '⏸ Stop Music' : '▶ Play Music'}
                </button>
            </div>
        </div>
    );
}
