import portfolioData from '../../data/portfolio';

export default function RetroProjects() {
    return (
        <div className="retro-room">
            <h2 className="retro-title">🏆 Treasure Room 🏆</h2>
            <p className="retro-subtitle">~ Collected Artifacts ~</p>

            <div className="retro-treasures">
                <div className="retro-treasures__grid">
                    {portfolioData.projects.map((project) => (
                        <div key={project.title} className="retro-treasure-item">
                            <h3 className="retro-treasure-item__name">⚔ {project.title}</h3>
                            <p className="retro-treasure-item__desc">{project.description}</p>
                            <div className="retro-treasure-item__loot">
                                {project.tech.map((t) => (
                                    <span key={t} className="retro-treasure-item__tag">{t}</span>
                                ))}
                            </div>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="retro-treasure-item__link"
                            >
                                [EXAMINE ARTIFACT] →
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
