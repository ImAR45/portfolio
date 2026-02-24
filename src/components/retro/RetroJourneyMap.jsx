import { useState, useRef, useEffect } from 'react';
import './RetroJourneyMap.css';

const MILESTONES = [
    {
        id: 'ssc',
        icon: '🏫',
        title: '10th Grade (SSC)',
        year: '2016',
        info: 'Completed schooling with flying colors. First spark of curiosity for technology was lit here!',
        y: 70,  // vertical position (% from top, higher = lower on map)
    },
    {
        id: 'hsc',
        icon: '🎓',
        title: '12th Grade (HSC)',
        year: '2018',
        info: 'Science stream warrior! Discovered the love for problem-solving and logical thinking.',
        y: 40,
    },
    {
        id: 'college',
        icon: '🏛️',
        title: 'College Begins',
        year: '2018',
        info: 'Started B.Tech in Computer Science. The real adventure begins — algorithms, data structures, and late-night coding sessions.',
        y: 55,
    },
    {
        id: 'first_code',
        icon: '💻',
        title: 'First Code',
        year: '2019',
        info: 'Wrote my first "Hello World" program in C. Felt like casting a spell for the first time! ✨',
        y: 30,
    },
    {
        id: 'first_website',
        icon: '🌐',
        title: 'First Website',
        year: '2020',
        info: 'Built my first HTML/CSS page. It was ugly, but it was MINE. The web dev journey officially started.',
        y: 60,
    },
    {
        id: 'learning',
        icon: '📚',
        title: 'Deep Learning Phase',
        year: '2020',
        info: 'Dove deep into React, Node.js, and modern web development. Countless tutorials, projects, and Stack Overflow visits.',
        y: 25,
    },
    {
        id: 'first_project',
        icon: '🎯',
        title: 'First Real Project',
        year: '2021',
        info: 'TaskFlow Pro — my first production-grade project. Learned the difference between tutorials and real-world code.',
        y: 50,
    },
    {
        id: 'first_job',
        icon: '💼',
        title: 'First Job',
        year: '2021',
        info: 'Junior Frontend Developer at WebSphere Solutions. Imposter syndrome hit hard, but grew through it!',
        y: 35,
    },
    {
        id: 'level_up',
        icon: '🚀',
        title: 'Level Up!',
        year: '2022',
        info: 'Promoted to Frontend Developer at PixelCraft Studios. Building interactive experiences for real clients.',
        y: 20,
    },
    {
        id: 'current',
        icon: '⭐',
        title: 'Current Quest',
        year: '2023–Now',
        info: 'Senior Frontend Developer at TechNova Inc. Leading architecture, mentoring juniors, and building at scale.',
        y: 15,
    },
];

// Generate SVG path through milestones
function buildPath(milestones, mapWidth, mapHeight) {
    const padding = 80;
    const usableWidth = mapWidth - padding * 2;
    const spacing = usableWidth / (milestones.length - 1);

    const points = milestones.map((m, i) => ({
        x: padding + i * spacing,
        y: (m.y / 100) * (mapHeight - 120) + 40,
    }));

    // Build smooth bezier path
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const cpx = (prev.x + curr.x) / 2;
        d += ` C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`;
    }

    return { d, points };
}

export default function RetroJourneyMap({ onClose }) {
    const [hoveredId, setHoveredId] = useState(null);
    const [pathDrawn, setPathDrawn] = useState(false);
    const scrollRef = useRef(null);

    const mapWidth = Math.max(1400, MILESTONES.length * 160);
    const mapHeight = 420;
    const { d, points } = buildPath(MILESTONES, mapWidth, mapHeight);

    useEffect(() => {
        // Trigger path drawing animation
        const timer = setTimeout(() => setPathDrawn(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Scroll to "YOU ARE HERE"
    useEffect(() => {
        if (scrollRef.current) {
            const lastPoint = points[points.length - 1];
            scrollRef.current.scrollLeft = lastPoint.x - scrollRef.current.clientWidth / 2;
        }
    }, []);

    return (
        <div className="journey-overlay" onClick={onClose}>
            <div className="journey-modal" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="journey-modal__header">
                    <h2 className="journey-modal__title">🗺️ My Journey Map</h2>
                    <span className="journey-modal__subtitle">Scroll to explore the adventure →</span>
                    <button className="journey-modal__close" onClick={onClose}>✕</button>
                </div>

                {/* Scrollable map area */}
                <div className="journey-map-scroll" ref={scrollRef}>
                    <div className="journey-map" style={{ width: mapWidth, height: mapHeight }}>
                        {/* Background decorations */}
                        <div className="journey-map__ground" />
                        <div className="journey-map__cloud journey-map__cloud--1">☁️</div>
                        <div className="journey-map__cloud journey-map__cloud--2">☁️</div>
                        <div className="journey-map__cloud journey-map__cloud--3">⛅</div>

                        {/* SVG Path */}
                        <svg
                            className="journey-map__svg"
                            width={mapWidth}
                            height={mapHeight}
                            viewBox={`0 0 ${mapWidth} ${mapHeight}`}
                        >
                            {/* Path glow */}
                            <path
                                d={d}
                                fill="none"
                                stroke="rgba(22, 198, 12, 0.15)"
                                strokeWidth="12"
                                strokeLinecap="round"
                            />
                            {/* Main path */}
                            <path
                                d={d}
                                fill="none"
                                stroke="var(--accent-2, #16c60c)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray={pathDrawn ? 'none' : '2000'}
                                strokeDashoffset={pathDrawn ? '0' : '2000'}
                                className="journey-map__path-line"
                            />
                            {/* Dashed trail */}
                            <path
                                d={d}
                                fill="none"
                                stroke="rgba(22, 198, 12, 0.3)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeDasharray="6 8"
                            />
                        </svg>

                        {/* Milestone nodes */}
                        {MILESTONES.map((m, i) => {
                            const pt = points[i];
                            const isHovered = hoveredId === m.id;
                            const isLast = i === MILESTONES.length - 1;

                            return (
                                <div
                                    key={m.id}
                                    className={`journey-node ${isHovered ? 'journey-node--hovered' : ''} ${isLast ? 'journey-node--current' : ''}`}
                                    style={{ left: pt.x, top: pt.y }}
                                    onMouseEnter={() => setHoveredId(m.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    {/* Node marker */}
                                    <div className="journey-node__marker">
                                        <span className="journey-node__icon">{m.icon}</span>
                                    </div>

                                    {/* Year label */}
                                    <span className="journey-node__year">{m.year}</span>

                                    {/* "YOU ARE HERE" for last node */}
                                    {isLast && (
                                        <div className="journey-node__here">
                                            📍 YOU ARE HERE
                                        </div>
                                    )}

                                    {/* Hover tooltip */}
                                    {isHovered && (
                                        <div className={`journey-tooltip ${pt.y < 150 ? 'journey-tooltip--below' : ''}`}>
                                            <div className="journey-tooltip__title">{m.icon} {m.title}</div>
                                            <div className="journey-tooltip__year">{m.year}</div>
                                            <p className="journey-tooltip__info">{m.info}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Retro scenery elements */}
                        <div className="journey-map__tree" style={{ left: 60, bottom: 30 }}>🌲</div>
                        <div className="journey-map__tree" style={{ left: 280, bottom: 30 }}>🌳</div>
                        <div className="journey-map__tree" style={{ left: 520, bottom: 30 }}>🌲</div>
                        <div className="journey-map__tree" style={{ left: 750, bottom: 30 }}>🌳</div>
                        <div className="journey-map__tree" style={{ left: 1000, bottom: 30 }}>🌲</div>
                        <div className="journey-map__tree" style={{ left: 1200, bottom: 30 }}>🌳</div>

                        {/* Mountains */}
                        <div className="journey-map__mountain" style={{ left: 150 }}>⛰️</div>
                        <div className="journey-map__mountain" style={{ left: 600 }}>🏔️</div>
                        <div className="journey-map__mountain" style={{ left: 1050 }}>⛰️</div>
                    </div>
                </div>

                {/* Legend */}
                <div className="journey-modal__legend">
                    <span>🟢 Completed</span>
                    <span>⭐ Current</span>
                    <span>💡 Hover nodes for details</span>
                </div>
            </div>
        </div>
    );
}
