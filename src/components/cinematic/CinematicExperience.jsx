import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import portfolioData from '../../data/portfolio';

export default function CinematicExperience() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

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
                    {portfolioData.experience.map((exp, i) => (
                        <motion.div
                            key={exp.company}
                            className="cinematic-timeline__item"
                            initial={{ opacity: 0, x: -40 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                        >
                            <div className="cinematic-timeline__dot" />
                            <div className="cinematic-timeline__card">
                                <p className="cinematic-timeline__period">{exp.period}</p>
                                <h3 className="cinematic-timeline__role">{exp.role}</h3>
                                <p className="cinematic-timeline__company">{exp.company}</p>
                                <p className="cinematic-timeline__desc">{exp.description}</p>
                                <div className="cinematic-timeline__tech">
                                    {exp.tech.map((t) => (
                                        <span key={t} className="cinematic-timeline__tag">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
