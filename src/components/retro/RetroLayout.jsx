import { useState, useCallback } from 'react';
import { GameProvider, useGame } from '../../context/GameContext';
import { SoundManager } from '../../utils/SoundManager';
import AchievementPopup from './AchievementPopup';
import TrophyRoadmap from './TrophyRoadmap';
import RetroHero from './RetroHero';
import RetroAbout from './RetroAbout';
import RetroSkills from './RetroSkills';
import RetroExperience from './RetroExperience';
import RetroProjects from './RetroProjects';
import RetroContact from './RetroContact';
import '../../styles/retro.css';

const rooms = [
    { id: 'hero', label: 'Home', component: RetroHero },
    { id: 'about', label: 'About', component: RetroAbout },
    { id: 'skills', label: 'Skills', component: RetroSkills },
    { id: 'experience', label: 'Quests', component: RetroExperience },
    { id: 'projects', label: 'Treasure', component: RetroProjects },
    { id: 'contact', label: 'Board', component: RetroContact },
];

function RetroGame() {
    const [currentRoom, setCurrentRoom] = useState('hero');
    const [showRoadmap, setShowRoadmap] = useState(false);
    const { xp, maxXp, level, visitRoom, isRoomUnlocked, unlockedAchievements, visitedRooms } = useGame();

    const [soundMuted, setSoundMuted] = useState(false);

    const navigateToRoom = useCallback((roomId) => {
        if (!isRoomUnlocked(roomId)) return;
        SoundManager.play('navigate');
        setCurrentRoom(roomId);
        visitRoom(roomId);
    }, [isRoomUnlocked, visitRoom]);

    const toggleMute = () => {
        const muted = SoundManager.toggleMute();
        setSoundMuted(muted);
    };

    const ActiveRoom = rooms.find((r) => r.id === currentRoom)?.component || RetroHero;
    const xpPercent = Math.min((xp / maxXp) * 100, 100);

    return (
        <div className="retro">
            <AchievementPopup />
            {showRoadmap && <TrophyRoadmap onClose={() => setShowRoadmap(false)} />}

            {/* HUD Navigation */}
            <nav className="retro-hud">
                <div className="retro-hud__left">
                    <span className="retro-hud__level">LV.{level}</span>
                    <div className="retro-hud__xp-bar">
                        <div className="retro-hud__xp-fill" style={{ width: `${xpPercent}%` }} />
                    </div>
                    <span className="retro-hud__xp-text">{xp} XP</span>
                </div>

                <div className="retro-hud__rooms">
                    {rooms.map((room) => {
                        const unlocked = isRoomUnlocked(room.id);
                        const visited = visitedRooms.includes(room.id);
                        return (
                            <button
                                key={room.id}
                                className={`retro-hud__btn ${currentRoom === room.id ? 'retro-hud__btn--active' : ''} ${!unlocked ? 'retro-hud__btn--locked' : ''} ${visited ? 'retro-hud__btn--visited' : ''}`}
                                onClick={() => navigateToRoom(room.id)}
                                disabled={!unlocked}
                                title={!unlocked ? '🔒 Explore previous rooms to unlock' : room.label}
                            >
                                {unlocked ? (visited ? '✓ ' : '▸ ') : '🔒 '}{room.label}
                            </button>
                        );
                    })}
                </div>

                <div className="retro-hud__right">
                    <button
                        className="retro-hud__sound-toggle"
                        onClick={toggleMute}
                        title={soundMuted ? 'Unmute' : 'Mute'}
                    >
                        {soundMuted ? '🔇' : '🔊'}
                    </button>
                    <button
                        className="retro-hud__trophies"
                        onClick={() => { SoundManager.play('click'); setShowRoadmap(true); }}
                        title="View Trophy Roadmap"
                    >
                        🏆 {unlockedAchievements.length}/{11}
                    </button>
                </div>
            </nav>

            {/* Game Screen */}
            <main className="retro-screen" key={currentRoom}>
                <ActiveRoom onNavigate={navigateToRoom} />
            </main>

            {/* Footer */}
            <footer className="retro-footer">
                <p>Designed & Built with ❤️ | © {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}

export default function RetroLayout() {
    return (
        <GameProvider>
            <RetroGame />
        </GameProvider>
    );
}
