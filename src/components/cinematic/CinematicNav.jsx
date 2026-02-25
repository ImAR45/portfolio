import { useState, useEffect, useCallback } from 'react';

const NAV_ITEMS = [
    { id: 'hero', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'experience', label: 'Work', icon: '💼' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'contact', label: 'Contact', icon: '✉️' },
];

export default function CinematicNav() {
    const [activeSection, setActiveSection] = useState('hero');
    const [visible, setVisible] = useState(false);
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return document.documentElement.getAttribute('data-theme') || 'dark';
        }
        return 'dark';
    });

    // Scroll spy via IntersectionObserver
    useEffect(() => {
        const observers = [];
        const sections = NAV_ITEMS.map(item => document.getElementById(item.id)).filter(Boolean);

        const handleIntersect = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        sections.forEach(section => {
            const observer = new IntersectionObserver(handleIntersect, {
                rootMargin: '-40% 0px -55% 0px',
                threshold: 0,
            });
            observer.observe(section);
            observers.push(observer);
        });

        return () => observers.forEach(o => o.disconnect());
    }, []);

    // Show/hide based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > window.innerHeight * 0.3);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = useCallback((id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(prev => {
            const next = prev === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            return next;
        });
    }, []);

    return (
        <nav className={`cinematic-nav ${visible ? 'cinematic-nav--visible' : ''}`}>
            <div className="cinematic-nav__items">
                {NAV_ITEMS.map(item => (
                    <button
                        key={item.id}
                        className={`cinematic-nav__item ${activeSection === item.id ? 'cinematic-nav__item--active' : ''}`}
                        onClick={() => scrollTo(item.id)}
                        aria-label={item.label}
                    >
                        <span className="cinematic-nav__icon">{item.icon}</span>
                        <span className="cinematic-nav__label">{item.label}</span>
                    </button>
                ))}
                <button
                    className="cinematic-nav__item cinematic-nav__theme-toggle"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                >
                    <span className="cinematic-nav__icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
                    <span className="cinematic-nav__label">Theme</span>
                </button>
            </div>
        </nav>
    );
}
