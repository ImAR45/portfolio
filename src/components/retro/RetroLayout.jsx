import { useState } from 'react';
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

export default function RetroLayout() {
    const [currentRoom, setCurrentRoom] = useState('hero');

    const ActiveRoom = rooms.find((r) => r.id === currentRoom)?.component || RetroHero;

    return (
        <div className="retro">
            {/* HUD Navigation */}
            <nav className="retro-hud">
                {rooms.map((room) => (
                    <button
                        key={room.id}
                        className={`retro-hud__btn ${currentRoom === room.id ? 'retro-hud__btn--active' : ''}`}
                        onClick={() => setCurrentRoom(room.id)}
                    >
                        {room.label}
                    </button>
                ))}
            </nav>

            {/* Game Screen */}
            <main className="retro-screen" key={currentRoom}>
                <ActiveRoom onNavigate={setCurrentRoom} />
            </main>

            {/* Footer */}
            <footer className="retro-footer">
                <p>Designed & Built with ❤️ | © {new Date().getFullYear()} | Retro Mode</p>
            </footer>
        </div>
    );
}
