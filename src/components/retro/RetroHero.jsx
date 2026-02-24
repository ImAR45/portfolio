import { useGame } from '../../context/GameContext';
import portfolioData from '../../data/portfolio';

export default function RetroHero({ onNavigate }) {
    const { unlockAchievement, visitRoom } = useGame();

    const handleStartQuest = () => {
        unlockAchievement('first_step');
        visitRoom('hero');
        setTimeout(() => onNavigate('about'), 400);
    };

    const handleDownloadScroll = () => {
        unlockAchievement('scroll_found');
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
                <a
                    href={portfolioData.resumeUrl}
                    download
                    className="retro-btn retro-btn--secondary"
                    style={{ textDecoration: 'none' }}
                    onClick={handleDownloadScroll}
                >
                    📜 Download Scroll
                </a>
            </div>
            <p className="retro-hero__hint">
                💡 Explore rooms to earn XP & unlock achievements!
            </p>
        </div>
    );
}
