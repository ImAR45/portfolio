import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import portfolioData from '../../data/portfolio';

/* Animated counter hook */
function useAnimatedCounter(target, isActive, duration = 1200) {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isActive || hasAnimated.current) return;
        hasAnimated.current = true;

        const startTime = performance.now();
        const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [isActive, target, duration]);

    return count;
}

function SkillCard({ skill, index, isInView }) {
    const count = useAnimatedCounter(skill.level, isInView, 1200 + index * 100);

    return (
        <motion.div
            className="cinematic-skill-card"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
        >
            <div className="cinematic-skill-card__header">
                <div className="cinematic-skill-card__name">
                    <span className="cinematic-skill-card__icon">{skill.icon}</span>
                    {skill.name}
                </div>
                <span className="cinematic-skill-card__level">{count}%</span>
            </div>
            <div className="cinematic-skill-card__bar">
                <motion.div
                    className="cinematic-skill-card__fill"
                    initial={{ width: '0%' }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1.2, delay: 0.3 + index * 0.08, ease: 'easeOut' }}
                />
            </div>
        </motion.div>
    );
}

/* Split array into chunks of n */
function chunk(arr, n) {
    const result = [];
    for (let i = 0; i < arr.length; i += n) {
        result.push(arr.slice(i, i + n));
    }
    return result;
}

export default function CinematicSkills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const skills = portfolioData.skills;
    const skillPages = useMemo(() => chunk(skills, 3), [skills]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleCarouselScroll = useCallback(() => {
        const el = carouselRef.current;
        if (!el) return;
        const pageWidth = el.firstElementChild?.offsetWidth || 300;
        const gap = 16;
        const idx = Math.round(el.scrollLeft / (pageWidth + gap));
        setActiveIndex(idx);
    }, []);

    const scrollToPage = useCallback((idx) => {
        const el = carouselRef.current;
        if (!el || !el.children[idx]) return;
        el.children[idx].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    }, []);

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

                {isMobile ? (
                    <>
                        <div
                            className="cinematic-skills__carousel"
                            ref={carouselRef}
                            onScroll={handleCarouselScroll}
                        >
                            {skillPages.map((page, pageIdx) => (
                                <div key={pageIdx} className="cinematic-skills__page">
                                    {page.map((skill, i) => (
                                        <SkillCard
                                            key={skill.name}
                                            skill={skill}
                                            index={pageIdx * 3 + i}
                                            isInView={isInView}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="cinematic-skills__dots">
                            {skillPages.map((_, i) => (
                                <button
                                    key={i}
                                    className={`cinematic-skills__dot ${i === activeIndex ? 'cinematic-skills__dot--active' : ''}`}
                                    onClick={() => scrollToPage(i)}
                                    aria-label={`Go to page ${i + 1}`}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="cinematic-skills__grid">
                        {skills.map((skill, i) => (
                            <SkillCard key={skill.name} skill={skill} index={i} isInView={isInView} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
