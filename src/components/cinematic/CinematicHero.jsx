import { useMemo } from 'react';
import { motion } from 'framer-motion';
import portfolioData from '../../data/portfolio';

export default function CinematicHero() {
    const { name, title, resumeUrl } = portfolioData;

    const particles = useMemo(() => {
        return Array.from({ length: 30 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 8 + 6,
            delay: Math.random() * 5,
            color: i % 3 === 0 ? 'var(--accent-1)' : i % 3 === 1 ? 'var(--accent-2)' : 'var(--accent-3)',
        }));
    }, []);

    return (
        <section className="cinematic-section cinematic-hero" id="hero">
            <div className="cinematic-hero__particles">
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className="cinematic-hero__particle"
                        style={{
                            left: p.left,
                            width: p.size,
                            height: p.size,
                            background: p.color,
                            animationDuration: `${p.duration}s`,
                            animationDelay: `${p.delay}s`,
                        }}
                    />
                ))}
            </div>

            <motion.p
                className="cinematic-hero__greeting"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                Hello, I&apos;m
            </motion.p>

            <motion.h1
                className="cinematic-hero__name"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                {name}
            </motion.h1>

            <motion.p
                className="cinematic-hero__title"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
            >
                {title}
            </motion.p>

            <motion.div
                className="cinematic-hero__actions"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                <a href="#projects" className="cinematic-hero__btn cinematic-hero__btn--primary">
                    View My Work ↓
                </a>
                <a
                    href={resumeUrl}
                    download
                    className="cinematic-hero__btn cinematic-hero__btn--secondary"
                >
                    📄 Download Resume
                </a>
            </motion.div>

            <motion.div
                className="cinematic-hero__scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
            >
                <span>Scroll Down</span>
                <div className="cinematic-hero__scroll-arrow" />
            </motion.div>
        </section>
    );
}
