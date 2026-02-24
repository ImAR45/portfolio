import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import portfolioData from '../../data/portfolio';

const socialIcons = {
    github: '🐙',
    linkedin: '💼',
    twitter: '🐦',
    email: '✉️',
};

export default function CinematicContact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="cinematic-section cinematic-contact" id="contact" ref={ref}>
            <div className="cinematic-contact__content">
                <motion.p
                    className="cinematic-section__label"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    Get In Touch
                </motion.p>
                <motion.h2
                    className="cinematic-section__title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Let&apos;s Work Together
                </motion.h2>
                <motion.p
                    className="cinematic-contact__text"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    I&apos;m always open to discussing new projects, creative ideas, or
                    opportunities to be part of your vision. Feel free to reach out!
                </motion.p>

                <div className="cinematic-contact__socials">
                    {portfolioData.socials.map((social, i) => (
                        <motion.a
                            key={social.platform}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cinematic-social-link"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                        >
                            <span className="cinematic-social-link__icon">
                                {socialIcons[social.icon] || '🔗'}
                            </span>
                            {social.platform}
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
