import portfolioData from '../../data/portfolio';

export default function RetroHero({ onNavigate }) {
    return (
        <div className="retro-room retro-hero">
            <div className="retro-hero__logo">
                {portfolioData.name}
            </div>
            <div className="retro-hero__role">
                ✦ {portfolioData.title} ✦
            </div>
            <div className="retro-hero__prompt">
                ▶ Press a room to explore ◀
            </div>
            <div className="retro-hero__actions">
                <button className="retro-btn" onClick={() => onNavigate('about')}>
                    Start Quest
                </button>
                <a
                    href={portfolioData.resumeUrl}
                    download
                    className="retro-btn retro-btn--secondary"
                    style={{ textDecoration: 'none' }}
                >
                    📜 Download Scroll
                </a>
            </div>
        </div>
    );
}
