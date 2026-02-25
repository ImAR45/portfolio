import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import RetroJourneyMap from './RetroJourneyMap';
import RetroTicTacToe from './RetroTicTacToe';
import BossBattle from './BossBattle';
import { SoundManager } from '../../utils/SoundManager';
import portfolioData from '../../data/portfolio';

export default function RetroHero({ onNavigate }) {
    const { unlockAchievement, visitRoom } = useGame();
    const [showJourney, setShowJourney] = useState(false);
    const [showGame, setShowGame] = useState(false);
    const [showBoss, setShowBoss] = useState(false);

    const handleStartQuest = () => {
        SoundManager.play('startQuest');
        unlockAchievement('first_step');
        visitRoom('hero');
        setTimeout(() => onNavigate('about'), 400);
    };

    const handleBossBattle = () => {
        SoundManager.play('click');
        setShowBoss(true);
    };

    return (
        <div className="retro-room retro-hero">
            <div className="retro-hero__stars">
                {Array.from({ length: 20 }, (_, i) => (
                    <div
                        key={i}
                        className="retro-hero__star"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${1.5 + Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>
            <div className="retro-hero__logo">
                {portfolioData.name}
            </div>
            <div className="retro-hero__role">
                ✦ {portfolioData.title} ✦
            </div>
            <div className="retro-hero__prompt">
                ▶ Begin your adventure ◀
            </div>
            <div className="retro-hero__actions">
                <button className="retro-btn retro-btn--glow" onClick={handleStartQuest}>
                    ⚔ Start Quest
                </button>
                <button
                    className="retro-btn retro-btn--boss"
                    onClick={handleBossBattle}
                >
                    🐉 Boss Fight for Resume
                </button>
            </div>
            <button
                className="retro-btn retro-btn--journey"
                onClick={() => { SoundManager.play('mapOpen'); setShowJourney(true); }}
            >
                🗺️ My Journey Map
            </button>
            <button
                className="retro-btn retro-btn--challenge"
                onClick={() => { SoundManager.play('click'); setShowGame(true); }}
            >
                🎮 Challenge Me — Win & Get a Free Portfolio!
            </button>
            <p className="retro-hero__hint">
                💡 Explore rooms to earn XP & unlock achievements!
            </p>
            <p className="retro-hero__hint retro-hero__hint--konami">
                🕹️ Psst... try a legendary cheat code...
            </p>

            {showJourney && <RetroJourneyMap onClose={() => setShowJourney(false)} />}
            {showGame && <RetroTicTacToe onClose={() => setShowGame(false)} />}
            {showBoss && <BossBattle onClose={() => setShowBoss(false)} />}
        </div>
    );
}
