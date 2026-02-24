import { useState } from 'react';
import SkillTextReveal from './SkillTextReveal';
import './SkillTextReveal.css';
import portfolioData from '../../data/portfolio';

const QUEST_RANKS = ['🥉 Apprentice', '🥈 Journeyman', '🥇 Master'];
const QUEST_XP = ['+40 XP', '+60 XP', '+80 XP'];

export default function RetroExperience({ onNavigate }) {
    const [expandedQuest, setExpandedQuest] = useState(null);
    const quests = [...portfolioData.experience].reverse(); // Most recent last = highest rank

    return (
        <div className="retro-room">
            <h2 className="retro-title">📜 Quest Log 📜</h2>
            <p className="retro-subtitle">~ Your journey through the realms of code ~</p>

            <div className="retro-quests">
                {/* Timeline */}
                <div className="retro-quest-timeline">
                    {quests.map((exp, i) => {
                        const isExpanded = expandedQuest === i;
                        const rank = QUEST_RANKS[i] || '🥇 Master';
                        const xpReward = QUEST_XP[i] || '+80 XP';
                        const isLast = i === quests.length - 1;

                        return (
                            <div key={exp.company} className="retro-quest-node">
                                {/* Timeline connector */}
                                <div className="retro-quest-node__line-container">
                                    <div className={`retro-quest-node__dot ${isExpanded ? 'retro-quest-node__dot--active' : ''}`}>
                                        {isExpanded ? '⚔️' : '•'}
                                    </div>
                                    {!isLast && <div className="retro-quest-node__line" />}
                                </div>

                                {/* Quest card */}
                                <div
                                    className={`retro-quest-card ${isExpanded ? 'retro-quest-card--expanded' : ''}`}
                                    onClick={() => setExpandedQuest(isExpanded ? null : i)}
                                >
                                    {/* Header bar */}
                                    <div className="retro-quest-card__top">
                                        <span className="retro-quest-card__status">
                                            ✅ COMPLETED
                                        </span>
                                        <span className="retro-quest-card__rank">{rank}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="retro-quest-card__role">
                                        {isExpanded ? '📖' : '📕'} {exp.role}
                                    </h3>
                                    <div className="retro-quest-card__meta">
                                        <span className="retro-quest-card__company">🏰 {exp.company}</span>
                                        <span className="retro-quest-card__period">⏳ {exp.period}</span>
                                    </div>

                                    {/* Expanded content */}
                                    {isExpanded && (
                                        <div className="retro-quest-card__body">
                                            <div className="retro-quest-card__story">
                                                <span className="retro-quest-card__story-label">📋 Mission Report:</span>
                                                <SkillTextReveal text={exp.description} skillName={exp.company} />
                                            </div>

                                            <div className="retro-quest-card__loot">
                                                <div className="retro-quest-card__loot-header">
                                                    <span>⚔ Skills Gained</span>
                                                    <span className="retro-quest-card__xp">{xpReward}</span>
                                                </div>
                                                <div className="retro-quest-card__tags">
                                                    {exp.tech.map((t) => (
                                                        <span key={t} className="retro-quest-card__tag">+{t}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {!isExpanded && (
                                        <p className="retro-quest-card__peek">
                                            ▸ Click to read mission report...
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="retro-room__next-hint" style={{ marginTop: 32 }}>
                    <button className="retro-btn retro-btn--glow" onClick={() => onNavigate('projects')}>
                        🏆 Continue to Treasure →
                    </button>
                </div>
            </div>
        </div>
    );
}
