import { useState, useEffect } from 'react';
import portfolioData from '../../data/portfolio';

export default function RetroSkills() {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimated(true), 200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="retro-room">
            <h2 className="retro-title">⚡ Stats & Skills ⚡</h2>
            <p className="retro-subtitle">~ Inventory Screen ~</p>

            <div className="retro-stats">
                <div className="retro-stats__grid">
                    {portfolioData.skills.map((skill) => (
                        <div key={skill.name} className="retro-stat-item">
                            <div className="retro-stat-item__header">
                                <span className="retro-stat-item__name">
                                    <span>{skill.icon}</span>
                                    {skill.name}
                                </span>
                                <span className="retro-stat-item__level">LV.{skill.level}</span>
                            </div>
                            <div className="retro-stat-item__bar">
                                <div
                                    className="retro-stat-item__fill"
                                    style={{ width: animated ? `${skill.level}%` : '0%' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
