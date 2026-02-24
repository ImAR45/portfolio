import { useGame } from '../../context/GameContext';
import './AchievementPopup.css';

export default function AchievementPopup() {
    const { achievementPopup } = useGame();

    if (!achievementPopup) return null;

    return (
        <div className="achievement-popup" key={achievementPopup.id}>
            <div className="achievement-popup__glow" />
            <div className="achievement-popup__content">
                <div className="achievement-popup__icon">{achievementPopup.icon}</div>
                <div className="achievement-popup__info">
                    <p className="achievement-popup__label">🏅 Achievement Unlocked!</p>
                    <h3 className="achievement-popup__title">{achievementPopup.title}</h3>
                    <p className="achievement-popup__desc">{achievementPopup.desc}</p>
                </div>
                <div className="achievement-popup__xp">+{achievementPopup.xp} XP</div>
            </div>
        </div>
    );
}
