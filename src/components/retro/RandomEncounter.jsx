import { useState, useEffect, useRef, useCallback } from 'react';
import { useGame } from '../../context/GameContext';
import { SoundManager } from '../../utils/SoundManager';

const BUG_EMOJIS = ['🐛', '🪲', '🐜', '🦗'];
const CATCH_TIMEOUT = 5000;

export default function RandomEncounter({ onDismiss }) {
    const [phase, setPhase] = useState('appear'); // appear | caught | escaped
    const [bugEmoji] = useState(() => BUG_EMOJIS[Math.floor(Math.random() * BUG_EMOJIS.length)]);
    const [bugPos, setBugPos] = useState({ x: 50, y: 50 });
    const timerRef = useRef(null);
    const moveRef = useRef(null);
    const { unlockAchievement } = useGame();

    // Move the bug around randomly
    useEffect(() => {
        if (phase !== 'appear') return;

        const moveBug = () => {
            setBugPos({
                x: 15 + Math.random() * 70,
                y: 15 + Math.random() * 60,
            });
        };

        moveBug();
        moveRef.current = setInterval(moveBug, 800);

        // Escape timeout
        timerRef.current = setTimeout(() => {
            setPhase('escaped');
            SoundManager.play('click');
            setTimeout(onDismiss, 2000);
        }, CATCH_TIMEOUT);

        return () => {
            clearInterval(moveRef.current);
            clearTimeout(timerRef.current);
        };
    }, [phase, onDismiss]);

    const handleCatchBug = useCallback(() => {
        if (phase !== 'appear') return;
        clearInterval(moveRef.current);
        clearTimeout(timerRef.current);
        setPhase('caught');
        SoundManager.play('achievement');
        unlockAchievement('bug_squasher');
        setTimeout(onDismiss, 2500);
    }, [phase, unlockAchievement, onDismiss]);

    return (
        <div className="encounter-overlay" onClick={(e) => e.target === e.currentTarget && phase !== 'appear'}>
            <div className="encounter-box retro-pixel-border">
                {phase === 'appear' && (
                    <>
                        <div className="encounter-title">
                            A WILD BUG APPEARED!
                        </div>
                        <div className="encounter-arena">
                            <button
                                className="encounter-bug"
                                onClick={handleCatchBug}
                                style={{
                                    left: `${bugPos.x}%`,
                                    top: `${bugPos.y}%`,
                                }}
                                aria-label="Catch the bug!"
                            >
                                {bugEmoji}
                            </button>
                        </div>
                        <div className="encounter-hint">
                            Click the bug to squash it! Quick!
                        </div>
                        <div className="encounter-timer">
                            <div className="encounter-timer__bar" />
                        </div>
                    </>
                )}
                {phase === 'caught' && (
                    <div className="encounter-result encounter-result--success">
                        <div className="encounter-result__emoji">💥</div>
                        <div className="encounter-result__title">BUG SQUASHED!</div>
                        <div className="encounter-result__xp">+20 XP</div>
                    </div>
                )}
                {phase === 'escaped' && (
                    <div className="encounter-result encounter-result--fail">
                        <div className="encounter-result__emoji">💨</div>
                        <div className="encounter-result__title">The bug got away...</div>
                        <div className="encounter-result__subtitle">Better luck next time!</div>
                    </div>
                )}
            </div>
        </div>
    );
}
