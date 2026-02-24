import { useState, useEffect, useMemo } from 'react';
import { useGame } from '../../context/GameContext';
import SkillTextReveal from './SkillTextReveal';
import './SkillTextReveal.css';
import portfolioData from '../../data/portfolio';

const COLS = 3; // grid columns

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

    // Group skills into rows and figure out which row has the expanded skill
    const skills = portfolioData.skills;
    const expandedIndex = skills.findIndex((s) => s.name === expandedSkill);
    const expandedRow = expandedIndex >= 0 ? Math.floor(expandedIndex / COLS) : -1;
    const expandedData = expandedIndex >= 0 ? skills[expandedIndex] : null;

    // Chunk skills into rows of COLS
    const rows = useMemo(() => {
        const result = [];
        for (let i = 0; i < skills.length; i += COLS) {
            result.push(skills.slice(i, i + COLS));
        }
        return result;
    }, [skills]);

    return (
        <div className="retro-room">
            <h2 className="retro-title">⚡ Stats & Skills ⚡</h2>
            <p className="retro-subtitle">~ Click skills to inspect them! ~</p>

            <div className="retro-stats">
                <div className="retro-stats__counter">
                    Skills inspected: {clickedSkills.length}/{skills.length} {clickedSkills.length >= 3 && '⚡'}
                </div>

                {rows.map((row, rowIdx) => (
                    <div key={rowIdx}>
                        {/* Grid row */}
                        <div className="retro-stats__grid-row">
                            {row.map((skill) => {
                                const isActive = expandedSkill === skill.name;
                                const isClicked = clickedSkills.includes(skill.name);
                                return (
                                    <div
                                        key={skill.name}
                                        className={`retro-stat-item ${isActive ? 'retro-stat-item--active' : ''} ${isClicked ? 'retro-stat-item--inspected' : ''}`}
                                        onClick={() => handleSkillClick(skill)}
                                        style={{ cursor: 'pointer' }}
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
                                    </div>
                                );
                            })}
                        </div>

                        {/* Full-width panel below this row when a card in it is expanded */}
                        {expandedRow === rowIdx && expandedData && (
                            <div className="retro-skill-panel" key={expandedData.name}>
                                <div className="retro-skill-panel__arrow" />
                                <div className="retro-skill-panel__header">
                                    <span className="retro-skill-panel__icon">{expandedData.icon}</span>
                                    <span className="retro-skill-panel__name">{expandedData.name}</span>
                                    <span className="retro-skill-panel__badge">{expandedData.category}</span>
                                </div>
                                <SkillTextReveal text={expandedData.desc} skillName={expandedData.name} />
                            </div>
                        )}
                    </div>
                ))}

                <div className="retro-room__next-hint" style={{ marginTop: 32 }}>
                    <button className="retro-btn retro-btn--glow" onClick={() => onNavigate('experience')}>
                        📜 Continue to Quests →
                    </button>
                </div>
            </div>
        </div>
    );
}
