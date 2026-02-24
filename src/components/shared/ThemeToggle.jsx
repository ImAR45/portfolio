import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'glass' ? 'retro' : 'glass'} theme`}
            title={`Switch to ${theme === 'glass' ? 'Retro' : 'Glass'} theme`}
        >
            <span className="theme-toggle__icon">
                {theme === 'glass' ? '🎮' : '✨'}
            </span>
            <span className="theme-toggle__label">
                {theme === 'glass' ? 'Retro' : 'Glass'}
            </span>
        </button>
    );
}
