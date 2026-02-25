import { useState, useEffect } from 'react';

export default function CinematicScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight > 0) {
                setProgress((scrollTop / docHeight) * 100);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="cinematic-progress" aria-hidden="true">
            <div
                className="cinematic-progress__bar"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
