import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import portfolioData from '../../data/portfolio';

export default function CinematicAbout() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section className="cinematic-section cinematic-about" id="about" ref={ref}>
            <div className="cinematic-about__content">
                <motion.p
                    className="cinematic-section__label"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    About Me
                </motion.p>
                <motion.h2
                    className="cinematic-section__title"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Who I Am
                </motion.h2>
                <motion.div
                    className="cinematic-about__card"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <p className="cinematic-about__text">{portfolioData.bio}</p>
                </motion.div>
            </div>
        </section>
    );
}
