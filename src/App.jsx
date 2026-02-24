import { useMediaQuery } from './hooks/useMediaQuery';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/shared/ThemeToggle';
import CinematicLayout from './components/cinematic/CinematicLayout';
import RetroLayout from './components/retro/RetroLayout';

function App() {
    const isMobile = useMediaQuery('(max-width: 767px)');

    return (
        <ThemeProvider>
            <ThemeToggle />
            {isMobile ? <CinematicLayout /> : <RetroLayout />}
        </ThemeProvider>
    );
}

export default App;
