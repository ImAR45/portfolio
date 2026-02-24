import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
            <span className="theme-toggle__icon">
                {theme === 'dark' ? '☀️' : '🌙'}
            </span>
            <span className="theme-toggle__label">
                {theme === 'dark' ? 'Light' : 'Dark'}
            </span>
        </button>
    );
}
