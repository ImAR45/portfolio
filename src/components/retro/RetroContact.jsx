import { useGame } from '../../context/GameContext';
import portfolioData from '../../data/portfolio';

const socialIcons = {
    github: '🐙',
    linkedin: '💼',
    twitter: '🐦',
    email: '✉️',
};

export default function RetroContact() {
    const { xp, level, unlockedAchievements, allAchievements } = useGame();

    return (
        <div className="retro-room">
            <h2 className="retro-title">📋 Quest Board 📋</h2>
            <p className="retro-subtitle">~ Adventure Complete! Connect with me ~</p>

            <div className="retro-board">
                {/* Final stats summary */}
                <div className="retro-board__stats retro-pixel-border">
                    <h3 className="retro-board__stats-title">🎮 Adventure Summary</h3>
                    <div className="retro-board__stats-grid">
                        <div className="retro-board__stat">
                            <span className="retro-board__stat-value">{level}</span>
                            <span className="retro-board__stat-label">Level</span>
                        </div>
                        <div className="retro-board__stat">
                            <span className="retro-board__stat-value">{xp}</span>
                            <span className="retro-board__stat-label">Total XP</span>
                        </div>
                        <div className="retro-board__stat">
                            <span className="retro-board__stat-value">{unlockedAchievements.length}</span>
                            <span className="retro-board__stat-label">Trophies</span>
                        </div>
                    </div>

                    {/* Achievement gallery */}
                    <div className="retro-board__achievements">
                        {allAchievements.map((ach) => {
                            const unlocked = unlockedAchievements.includes(ach.id);
                            return (
                                <div
                                    key={ach.id}
                                    className={`retro-board__achievement ${unlocked ? 'retro-board__achievement--unlocked' : ''}`}
                                    title={unlocked ? `${ach.title}: ${ach.desc}` : '???'}
                                >
                                    <span>{unlocked ? ach.icon : '🔒'}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <p className="retro-board__text">
                    Thanks for playing! 🎮 Want to form a party? Send a quest below!
                </p>

                <div className="retro-board__links">
                    {portfolioData.socials.map((social) => (
                        <a
                            key={social.platform}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="retro-board__link"
                        >
                            <span className="retro-board__link-icon">
                                {socialIcons[social.icon] || '🔗'}
                            </span>
                            <span className="retro-board__link-label">{social.platform}</span>
                            <span className="retro-board__link-arrow">→</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
