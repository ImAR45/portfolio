import CinematicHero from './CinematicHero';
import CinematicAbout from './CinematicAbout';
import CinematicSkills from './CinematicSkills';
import CinematicExperience from './CinematicExperience';
import CinematicProjects from './CinematicProjects';
import CinematicContact from './CinematicContact';
import '../../styles/cinematic.css';

export default function CinematicLayout() {
    return (
        <div className="cinematic">
            <CinematicHero />
            <CinematicAbout />
            <CinematicSkills />
            <CinematicExperience />
            <CinematicProjects />
            <CinematicContact />
            <footer className="cinematic-footer">
                <p>Designed & Built with ❤️ | © {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}
