import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import portfolioData from '../../data/portfolio';

export default function CinematicSkills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="cinematic-section cinematic-skills" id="skills" ref={ref}>
            <div style={{ maxWidth: 900, margin: '0 auto', width: '100%' }}>
                <motion.p
                    className="cinematic-section__label"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center' }}
                >
                    My Skills
                </motion.p>
                <motion.h2
                    className="cinematic-section__title"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    style={{ textAlign: 'center' }}
                >
                    What I Do Best
                </motion.h2>

                <div className="cinematic-skills__grid">
                    {portfolioData.skills.map((skill, i) => (
                        <motion.div
                            key={skill.name}
                            className="cinematic-skill-card"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                        >
                            <div className="cinematic-skill-card__header">
                                <div className="cinematic-skill-card__name">
                                    <span className="cinematic-skill-card__icon">{skill.icon}</span>
                                    {skill.name}
                                </div>
                                <span className="cinematic-skill-card__level">{skill.level}%</span>
                            </div>
                            <div className="cinematic-skill-card__bar">
                                <motion.div
                                    className="cinematic-skill-card__fill"
                                    initial={{ width: '0%' }}
                                    animate={isInView ? { width: `${skill.level}%` } : {}}
                                    transition={{ duration: 1.2, delay: 0.3 + i * 0.08, ease: 'easeOut' }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
