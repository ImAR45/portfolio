import portfolioData from '../../data/portfolio';

const socialIcons = {
    github: '🐙',
    linkedin: '💼',
    twitter: '🐦',
    email: '✉️',
};

export default function RetroContact() {
    return (
        <div className="retro-room">
            <h2 className="retro-title">📋 Quest Board 📋</h2>
            <p className="retro-subtitle">~ Available Connections ~</p>

            <div className="retro-board">
                <p className="retro-board__text">
                    Looking for a party member? Send a message via the quest board below!
                    I&apos;m always open to new adventures and collaborations.
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
