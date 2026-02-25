import { useState, useCallback } from 'react';
import { useGame } from '../../context/GameContext';
import { SoundManager } from '../../utils/SoundManager';
import portfolioData from '../../data/portfolio';

const BOSS_MAX_HP = 3;

const BOSS_ART = `
    /\\_/\\
   ( o.o )
    > ^ <
   /|   |\\
  (_|   |_)
`;

const ATTACK_MESSAGES = [
    'Critical hit! The guardian staggers!',
    'A devastating blow! Cracks appear in its armor!',
    'FINAL STRIKE! The guardian crumbles!',
];

const TAUNT_MESSAGES = [
    '"You dare challenge ME for the resume?!"',
    '"My skills are documented... try to take them!"',
    '"No one has ever defeated me... until now?!"',
];

export default function BossBattle({ onClose }) {
    const [phase, setPhase] = useState('intro'); // intro | battle | victory
    const [bossHp, setBossHp] = useState(BOSS_MAX_HP);
    const [lastMessage, setLastMessage] = useState('');
    const [shaking, setShaking] = useState(false);
    const [attacking, setAttacking] = useState(false);
    const { unlockAchievement } = useGame();

    const triggerShake = useCallback(() => {
        setShaking(true);
        setTimeout(() => setShaking(false), 400);
    }, []);

    const handleStartBattle = () => {
        SoundManager.play('startQuest');
        setPhase('battle');
        setLastMessage(TAUNT_MESSAGES[0]);
    };

    const handleAttack = () => {
        if (attacking) return;
        setAttacking(true);
        SoundManager.play('click');
        triggerShake();

        const newHp = bossHp - 1;
        setBossHp(newHp);
        setLastMessage(ATTACK_MESSAGES[BOSS_MAX_HP - bossHp]);

        setTimeout(() => {
            setAttacking(false);
            if (newHp <= 0) {
                // Victory!
                setPhase('victory');
                SoundManager.play('levelUp');
                unlockAchievement('boss_slayer');

                // Trigger actual download
                setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = portfolioData.resumeUrl;
                    link.download = 'Aaryan_Choubey_Resume.pdf';
                    link.click();
                }, 1500);
            } else {
                setLastMessage(TAUNT_MESSAGES[BOSS_MAX_HP - newHp] || TAUNT_MESSAGES[0]);
            }
        }, 600);
    };

    return (
        <div className="boss-battle__backdrop" onClick={(e) => e.target === e.currentTarget && phase !== 'battle' && onClose()}>
            <div className={`boss-battle ${shaking ? 'boss-battle--shake' : ''}`}>
                {phase === 'intro' && (
                    <div className="boss-battle__intro">
                        <div className="boss-battle__alert">⚠ WARNING ⚠</div>
                        <div className="boss-battle__encounter-text">
                            A WILD RESUME GUARDIAN APPEARS!
                        </div>
                        <pre className="boss-battle__ascii">{BOSS_ART}</pre>
                        <div className="boss-battle__guardian-name">
                            📜 The Resume Guardian 📜
                        </div>
                        <button className="retro-btn retro-btn--glow" onClick={handleStartBattle}>
                            ⚔ Engage in Battle!
                        </button>
                    </div>
                )}

                {phase === 'battle' && (
                    <div className="boss-battle__arena">
                        <div className="boss-battle__boss-info">
                            <span className="boss-battle__boss-name">Resume Guardian</span>
                            <div className="boss-battle__hp-bar">
                                <div
                                    className="boss-battle__hp-fill"
                                    style={{ width: `${(bossHp / BOSS_MAX_HP) * 100}%` }}
                                />
                            </div>
                            <span className="boss-battle__hp-text">HP: {bossHp}/{BOSS_MAX_HP}</span>
                        </div>
                        <pre className="boss-battle__ascii">{BOSS_ART}</pre>
                        <p className="boss-battle__message">{lastMessage}</p>
                        <div className="boss-battle__actions">
                            <button
                                className="retro-btn boss-battle__attack-btn"
                                onClick={handleAttack}
                                disabled={attacking}
                            >
                                ⚔ Attack!
                            </button>
                            <button
                                className="retro-btn retro-btn--secondary"
                                onClick={onClose}
                            >
                                🏃 Flee
                            </button>
                        </div>
                    </div>
                )}

                {phase === 'victory' && (
                    <div className="boss-battle__victory">
                        <div className="boss-battle__victory-title">🎉 VICTORY! 🎉</div>
                        <div className="boss-battle__loot-text">
                            The Resume Guardian has been defeated!
                        </div>
                        <div className="boss-battle__loot-item">
                            📜 You obtained: <strong>Ancient Resume Scroll</strong>
                        </div>
                        <div className="boss-battle__xp-gain">+30 XP</div>
                        <p className="boss-battle__download-note">
                            Downloading your loot...
                        </p>
                        <button className="retro-btn retro-btn--glow" onClick={onClose} style={{ marginTop: 16 }}>
                            ✓ Continue Adventure
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
