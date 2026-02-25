import { useEffect, useState, useRef, useCallback } from 'react';
import { useGame } from '../../context/GameContext';
import { SoundManager } from '../../utils/SoundManager';

const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA',
];

export default function KonamiOverlay() {
    const [triggered, setTriggered] = useState(false);
    const [particles, setParticles] = useState([]);
    const inputRef = useRef([]);
    const { unlockAchievement, unlockedAchievements } = useGame();

    const createParticles = useCallback(() => {
        const colors = ['#e94560', '#ffd93d', '#16c60c', '#00d4ff', '#ff6b9d', '#6c63ff'];
        return Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            color: colors[i % colors.length],
            size: Math.random() * 8 + 4,
            angle: Math.random() * 360,
            speed: Math.random() * 3 + 1,
            delay: Math.random() * 0.5,
        }));
    }, []);

    useEffect(() => {
        if (unlockedAchievements.includes('konami_master')) return;

        const handleKeyDown = (e) => {
            inputRef.current.push(e.code);
            // Only keep the last 10 keys
            if (inputRef.current.length > 10) {
                inputRef.current = inputRef.current.slice(-10);
            }
            // Check if matches
            if (inputRef.current.length === 10 &&
                inputRef.current.every((key, i) => key === KONAMI_CODE[i])) {
                setTriggered(true);
                setParticles(createParticles());
                SoundManager.play('levelUp');
                setTimeout(() => SoundManager.play('achievement'), 300);
                unlockAchievement('konami_master');
                inputRef.current = [];
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [unlockAchievement, unlockedAchievements, createParticles]);

    useEffect(() => {
        if (triggered) {
            const timeout = setTimeout(() => setTriggered(false), 5000);
            return () => clearTimeout(timeout);
        }
    }, [triggered]);

    if (!triggered) return null;

    return (
        <div className="konami-overlay">
            <div className="konami-overlay__flash" />
            <div className="konami-overlay__particles">
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="konami-overlay__particle"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: p.size,
                            height: p.size,
                            background: p.color,
                            animationDelay: `${p.delay}s`,
                            '--angle': `${p.angle}deg`,
                            '--speed': p.speed,
                        }}
                    />
                ))}
            </div>
            <div className="konami-overlay__content">
                <div className="konami-overlay__title">SECRET UNLOCKED!</div>
                <div className="konami-overlay__code">
                    ↑ ↑ ↓ ↓ ← → ← → B A
                </div>
                <div className="konami-overlay__desc">
                    You found the legendary Konami Code!
                </div>
                <div className="konami-overlay__xp">+40 XP</div>
            </div>
        </div>
    );
}
