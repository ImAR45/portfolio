import { useGame } from '../../context/GameContext';
import './TrophyRoadmap.css';

const HINTS = {
    first_step: 'Click "Start Quest" on the home screen',
    about_me: 'Visit the About room',
    skill_check: 'Visit the Skills room',
    quest_log: 'Visit the Quests room',
    treasure_hunter: 'Visit the Treasure room',
    social_butterfly: 'Visit the Quest Board',
    skill_master: 'Click on 3 different skill cards in the Skills room',
    treasure_opener: 'Open a mystery chest in the Treasure room',
    scroll_found: 'Download the resume scroll from the Home screen',
    full_clear: 'Visit every single room in the game',
    secret_finder: 'Find and click a hidden interactive element...',
};

export default function TrophyRoadmap({ onClose }) {
    const { allAchievements, unlockedAchievements, xp, maxXp, level } = useGame();
    const progress = Math.round((unlockedAchievements.length / allAchievements.length) * 100);

    return (
        <div className="roadmap-overlay" onClick={onClose}>
            <div className="roadmap" onClick={(e) => e.stopPropagation()}>
                <div className="roadmap__header">
                    <h2 className="roadmap__title">🗺️ Trophy Roadmap</h2>
                    <button className="roadmap__close" onClick={onClose}>✕</button>
                </div>

                <div className="roadmap__summary">
                    <div className="roadmap__stat">
                        <span className="roadmap__stat-value">LV.{level}</span>
                        <span className="roadmap__stat-label">Level</span>
                    </div>
                    <div className="roadmap__stat">
                        <span className="roadmap__stat-value">{xp}/{maxXp}</span>
                        <span className="roadmap__stat-label">Total XP</span>
                    </div>
                    <div className="roadmap__stat">
                        <span className="roadmap__stat-value">{progress}%</span>
                        <span className="roadmap__stat-label">Complete</span>
                    </div>
                </div>

                <div className="roadmap__progress-bar">
                    <div className="roadmap__progress-fill" style={{ width: `${progress}%` }} />
                </div>

                <ul className="roadmap__list">
                    {allAchievements.map((ach) => {
                        const unlocked = unlockedAchievements.includes(ach.id);
                        return (
                            <li
                                key={ach.id}
                                className={`roadmap__item ${unlocked ? 'roadmap__item--unlocked' : ''}`}
                            >
                                <span className="roadmap__item-icon">{unlocked ? ach.icon : '🔒'}</span>
                                <div className="roadmap__item-info">
                                    <h4 className="roadmap__item-title">
                                        {unlocked ? ach.title : '???'}
                                        {unlocked && <span className="roadmap__item-xp">+{ach.xp} XP</span>}
                                    </h4>
                                    <p className="roadmap__item-hint">
                                        {unlocked ? ach.desc : (HINTS[ach.id] || 'Keep exploring...')}
                                    </p>
                                </div>
                                <span className="roadmap__item-status">
                                    {unlocked ? '✅' : '⬜'}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
