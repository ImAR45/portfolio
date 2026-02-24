import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { SoundManager } from '../../utils/SoundManager';
import portfolioData from '../../data/portfolio';

export default function RetroProjects({ onNavigate }) {
    const [openedChests, setOpenedChests] = useState([]);
    const { examineProject } = useGame();

    const handleOpenChest = (index) => {
        if (!openedChests.includes(index)) {
            SoundManager.play('treasureOpen');
            setOpenedChests((prev) => [...prev, index]);
            examineProject();
        }
    };

    return (
        <div className="retro-room">
            <h2 className="retro-title">🏆 Treasure Room 🏆</h2>
            <p className="retro-subtitle">~ Click chests to reveal artifacts! ~</p>

            <div className="retro-treasures">
                <div className="retro-treasures__counter">
                    Chests opened: {openedChests.length}/{portfolioData.projects.length}
                </div>
                <div className="retro-treasures__grid">
                    {portfolioData.projects.map((project, i) => {
                        const isOpened = openedChests.includes(i);
                        return (
                            <div
                                key={project.title}
                                className={`retro-treasure-item ${isOpened ? 'retro-treasure-item--opened' : 'retro-treasure-item--closed'}`}
                                onClick={() => handleOpenChest(i)}
                                style={{ cursor: 'pointer' }}
                            >
                                {!isOpened ? (
                                    <div className="retro-treasure-item__chest">
                                        <span className="retro-treasure-item__chest-icon">🎁</span>
                                        <p className="retro-treasure-item__chest-label">??? Mystery Artifact ???</p>
                                        <p className="retro-treasure-item__chest-hint">▸ Click to open...</p>
                                    </div>
                                ) : (
                                    <div className="retro-treasure-item__revealed">
                                        <h3 className="retro-treasure-item__name">✨ {project.title}</h3>
                                        <p className="retro-treasure-item__desc">{project.description}</p>
                                        <div className="retro-treasure-item__loot">
                                            <span className="retro-treasure-item__loot-label">Tech Loot:</span>
                                            {project.tech.map((t) => (
                                                <span key={t} className="retro-treasure-item__tag">{t}</span>
                                            ))}
                                        </div>
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="retro-treasure-item__link"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            [EXAMINE ARTIFACT] →
                                        </a>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="retro-room__next-hint" style={{ marginTop: 24 }}>
                    <button className="retro-btn retro-btn--glow" onClick={() => onNavigate('contact')}>
                        📋 Continue to Quest Board →
                    </button>
                </div>
            </div>
        </div>
    );
}
