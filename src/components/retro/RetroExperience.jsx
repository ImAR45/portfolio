import { useState } from 'react';
import portfolioData from '../../data/portfolio';

export default function RetroExperience({ onNavigate }) {
    const [expandedQuest, setExpandedQuest] = useState(null);

    return (
        <div className="retro-room">
            <h2 className="retro-title">📜 Quest Log 📜</h2>
            <p className="retro-subtitle">~ Click quests to read the full story ~</p>

            <div className="retro-quests">
                {portfolioData.experience.map((exp, i) => {
                    const isExpanded = expandedQuest === i;
                    return (
                        <div
                            key={exp.company}
                            className={`retro-quest-item ${isExpanded ? 'retro-quest-item--expanded' : ''}`}
                            onClick={() => setExpandedQuest(isExpanded ? null : i)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="retro-quest-item__status">
                                ✅ Quest #{String(i + 1).padStart(2, '0')} — COMPLETED
                            </div>
                            <h3 className="retro-quest-item__title">
                                {isExpanded ? '📖' : '📕'} {exp.role}
                            </h3>
                            <p className="retro-quest-item__company">📍 {exp.company} • {exp.period}</p>

                            {isExpanded && (
                                <div className="retro-quest-item__expanded-content">
                                    <p className="retro-quest-item__desc">{exp.description}</p>
                                    <div className="retro-quest-item__rewards">
                                        <span className="retro-quest-item__reward-label">⚔ Skills Gained:</span>
                                        {exp.tech.map((t) => (
                                            <span key={t} className="retro-quest-item__tag">+{t}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {!isExpanded && (
                                <p className="retro-quest-item__peek">
                                    ▸ Click to read quest story...
                                </p>
                            )}
                        </div>
                    );
                })}

                <div className="retro-room__next-hint" style={{ marginTop: 24 }}>
                    <button className="retro-btn retro-btn--glow" onClick={() => onNavigate('projects')}>
                        🏆 Continue to Treasure →
                    </button>
                </div>
            </div>
        </div>
    );
}
