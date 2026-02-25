import { useState, useEffect } from 'react';

export default function CinematicFAB() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > window.innerHeight * 0.6);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <a
            href="mailto:aaryanchoubey45@gmail.com?subject=Let's%20Work%20Together!"
            className={`cinematic-fab ${visible ? 'cinematic-fab--visible' : ''}`}
            aria-label="Hire Me"
        >
            <span className="cinematic-fab__icon">📧</span>
            <span className="cinematic-fab__text">Hire Me</span>
        </a>
    );
}
