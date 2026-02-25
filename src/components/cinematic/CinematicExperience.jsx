import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import portfolioData from '../../data/portfolio';

export default function CinematicExperience() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleExpand = (i) => {
        setExpandedIndex(prev => (prev === i ? null : i));
    };

    return (
        <section className="cinematic-section cinematic-experience" id="experience" ref={ref}>
            <div style={{ maxWidth: 700, margin: '0 auto', width: '100%' }}>
                <motion.p
                    className="cinematic-section__label"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    Experience
                </motion.p>
                <motion.h2
                    className="cinematic-section__title"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Where I&apos;ve Worked
                </motion.h2>

                <div className="cinematic-timeline">
                    {portfolioData.experience.map((exp, i) => {
                        const isExpanded = expandedIndex === i;
                        return (
                            <motion.div
                                key={exp.company}
                                className={`cinematic-timeline__item ${isExpanded ? 'cinematic-timeline__item--expanded' : ''}`}
                                initial={{ opacity: 0, x: -40 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                            >
                                <div className="cinematic-timeline__dot" />
                                <div
                                    className={`cinematic-timeline__card ${isExpanded ? 'cinematic-timeline__card--expanded' : ''}`}
                                    onClick={() => toggleExpand(i)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === 'Enter' && toggleExpand(i)}
                                >
                                    <p className="cinematic-timeline__period">{exp.period}</p>
                                    <h3 className="cinematic-timeline__role">{exp.role}</h3>
                                    <p className="cinematic-timeline__company">
                                        {exp.company}
                                        {exp.location && <span className="cinematic-timeline__location"> · {exp.location}</span>}
                                    </p>

                                    <AnimatePresence initial={false}>
                                        {isExpanded && (
                                            <motion.div
                                                key="content"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.35, ease: 'easeInOut' }}
                                                style={{ overflow: 'hidden' }}
                                            >
                                                <p className="cinematic-timeline__desc">{exp.description}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className="cinematic-timeline__tech">
                                        {exp.tech.map((t) => (
                                            <span key={t} className="cinematic-timeline__tag">{t}</span>
                                        ))}
                                    </div>

                                    <div className="cinematic-timeline__expand-hint">
                                        {isExpanded ? 'Tap to collapse ↑' : 'Tap to read more ↓'}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
