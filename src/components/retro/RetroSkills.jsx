import { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import portfolioData from '../../data/portfolio';

export default function RetroSkills({ onNavigate }) {
    const [animated, setAnimated] = useState(false);
    const [expandedSkill, setExpandedSkill] = useState(null);
    const { clickSkill, clickedSkills } = useGame();

    useEffect(() => {
        const timer = setTimeout(() => setAnimated(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const handleSkillClick = (skill) => {
        clickSkill(skill.name);
        setExpandedSkill(expandedSkill === skill.name ? null : skill.name);
    };

    return (
        <div className="retro-room">
            <h2 className="retro-title">⚡ Stats & Skills ⚡</h2>
            <p className="retro-subtitle">~ Click skills to inspect them! ~</p>

            <div className="retro-stats">
                <div className="retro-stats__counter">
                    Skills inspected: {clickedSkills.length}/{portfolioData.skills.length} {clickedSkills.length >= 3 && '⚡'}
                </div>
                <div className="retro-stats__grid">
                    {portfolioData.skills.map((skill, i) => {
                        const isExpanded = expandedSkill === skill.name;
                        const isClicked = clickedSkills.includes(skill.name);
                        return (
                            <div
                                key={skill.name}
                                className={`retro-stat-item ${isExpanded ? 'retro-stat-item--expanded' : ''} ${isClicked ? 'retro-stat-item--inspected' : ''}`}
                                onClick={() => handleSkillClick(skill)}
                                style={{ cursor: 'pointer', animationDelay: `${i * 0.08}s` }}
                            >
                                <div className="retro-stat-item__header">
                                    <span className="retro-stat-item__name">
                                        <span>{skill.icon}</span>
                                        {skill.name}
                                        {isClicked && <span className="retro-stat-item__check">✓</span>}
                                    </span>
                                    <span className="retro-stat-item__level">LV.{skill.level}</span>
                                </div>
                                <div className="retro-stat-item__bar">
                                    <div
                                        className="retro-stat-item__fill"
                                        style={{ width: animated ? `${skill.level}%` : '0%' }}
                                    />
                                </div>
                                {isExpanded && (
                                    <div className="retro-stat-item__details">
                                        <span className="retro-stat-item__category">Category: {skill.category}</span>
                                        <span className="retro-stat-item__power">Power Rating: {'★'.repeat(Math.ceil(skill.level / 20))}{'☆'.repeat(5 - Math.ceil(skill.level / 20))}</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="retro-room__next-hint" style={{ marginTop: 32 }}>
                    <button className="retro-btn retro-btn--glow" onClick={() => onNavigate('experience')}>
                        📜 Continue to Quests →
                    </button>
                </div>
            </div>
        </div>
    );
}
