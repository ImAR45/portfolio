import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import portfolioData from '../../data/portfolio';

export default function CinematicProjects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="cinematic-section cinematic-projects" id="projects" ref={ref}>
            <div style={{ maxWidth: 900, margin: '0 auto', width: '100%' }}>
                <motion.p
                    className="cinematic-section__label"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center' }}
                >
                    Projects
                </motion.p>
                <motion.h2
                    className="cinematic-section__title"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    style={{ textAlign: 'center' }}
                >
                    Things I&apos;ve Built
                </motion.h2>

                <div className="cinematic-projects__grid">
                    {portfolioData.projects.map((project, i) => (
                        <motion.a
                            key={project.title}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cinematic-project-card"
                            style={{ '--project-color': project.color }}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                        >
                            <h3 className="cinematic-project-card__title">{project.title}</h3>
                            <p className="cinematic-project-card__desc">{project.description}</p>
                            <div className="cinematic-project-card__tech">
                                {project.tech.map((t) => (
                                    <span key={t} className="cinematic-project-card__tag">{t}</span>
                                ))}
                            </div>
                            <span className="cinematic-project-card__link">
                                View Project →
                            </span>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
