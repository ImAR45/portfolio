import { useState, useRef, useEffect } from 'react';
import './RetroJourneyMap.css';

const MILESTONES = [
    {
        id: 'ssc', icon: '🏫', title: '10th Grade (SSC)', year: '2016',
        info: 'Completed schooling with flying colors. First spark of curiosity for technology!',
        x: 8, y: 72,
    },
    {
        id: 'hsc', icon: '🎓', title: '12th Grade (HSC)', year: '2018',
        info: 'Science stream warrior! Discovered the love for problem-solving and logical thinking.',
        x: 18, y: 48,
    },
    {
        id: 'college', icon: '🏛️', title: 'College Begins', year: '2018',
        info: 'Started B.Tech in Computer Science. Algorithms, data structures, and late-night coding!',
        x: 28, y: 60,
    },
    {
        id: 'first_code', icon: '💻', title: 'First Code', year: '2019',
        info: 'Wrote my first "Hello World" in C. Felt like casting a spell for the first time! ✨',
        x: 38, y: 35,
    },
    {
        id: 'first_website', icon: '🌐', title: 'First Website', year: '2020',
        info: 'Built my first HTML/CSS page. It was ugly, but it was MINE. The web dev journey began.',
        x: 48, y: 55,
    },
    {
        id: 'learning', icon: '📚', title: 'Deep Learning Phase', year: '2020',
        info: 'Deep dive into React, Node.js, and modern web dev. Countless tutorials & Stack Overflow.',
        x: 58, y: 30,
    },
    {
        id: 'first_project', icon: '🎯', title: 'First Real Project', year: '2021',
        info: 'TaskFlow Pro — first production-grade project. The difference between tutorials and reality.',
        x: 66, y: 50,
    },
    {
        id: 'first_job', icon: '💼', title: 'First Job', year: '2021',
        info: 'Junior Frontend Dev at WebSphere Solutions. Imposter syndrome hit hard, grew through it!',
        x: 74, y: 38,
    },
    {
        id: 'level_up', icon: '🚀', title: 'Level Up!', year: '2022',
        info: 'Frontend Developer at PixelCraft Studios. Building interactive experiences for real clients.',
        x: 84, y: 25,
    },
    {
        id: 'current', icon: '⭐', title: 'Current Quest', year: '2023–Now',
        info: 'Senior Frontend Dev at TechNova Inc. Leading architecture, mentoring, building at scale.',
        x: 93, y: 18,
    },
];

// Scenery elements scattered across the map
const TREES = [
    { x: 5, y: 40, type: '🌲', s: 1.6 }, { x: 12, y: 82, type: '🌳', s: 1.4 },
    { x: 22, y: 30, type: '🌲', s: 1.3 }, { x: 25, y: 78, type: '🌳', s: 1.5 },
    { x: 33, y: 75, type: '🌲', s: 1.2 }, { x: 35, y: 20, type: '🌲', s: 1.6 },
    { x: 42, y: 80, type: '🌳', s: 1.4 }, { x: 45, y: 25, type: '🌲', s: 1.1 },
    { x: 52, y: 15, type: '🌲', s: 1.5 }, { x: 55, y: 75, type: '🌳', s: 1.3 },
    { x: 62, y: 82, type: '🌲', s: 1.6 }, { x: 65, y: 20, type: '🌳', s: 1.2 },
    { x: 72, y: 75, type: '🌲', s: 1.4 }, { x: 78, y: 60, type: '🌳', s: 1.3 },
    { x: 82, y: 78, type: '🌲', s: 1.5 }, { x: 88, y: 55, type: '🌲', s: 1.1 },
    { x: 92, y: 72, type: '🌳', s: 1.4 }, { x: 96, y: 40, type: '🌲', s: 1.3 },
];

const MOUNTAINS = [
    { x: 3, y: 18, type: '⛰️', s: 2.2 },
    { x: 15, y: 10, type: '🏔️', s: 2.8 },
    { x: 42, y: 8, type: '⛰️', s: 2.5 },
    { x: 70, y: 12, type: '🏔️', s: 2.6 },
    { x: 90, y: 8, type: '⛰️', s: 2.3 },
];

const HOUSES = [
    { x: 10, y: 58, type: '🏠', s: 1.2 },
    { x: 50, y: 70, type: '🏘️', s: 1.4 },
    { x: 80, y: 48, type: '🏰', s: 1.5 },
];

// Build SVG road path through milestones
function buildRoadPath(milestones) {
    const pts = milestones.map((m) => ({ x: m.x, y: m.y }));
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1];
        const curr = pts[i];
        const cpx = (prev.x + curr.x) / 2;
        d += ` C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`;
    }
    return d;
}

export default function RetroJourneyMap({ onClose }) {
    const [hoveredId, setHoveredId] = useState(null);
    const [drawn, setDrawn] = useState(false);
    const mapRef = useRef(null);

    const roadPath = buildRoadPath(MILESTONES);

    useEffect(() => {
        const t = setTimeout(() => setDrawn(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="jmap-overlay" onClick={onClose}>
            <div className="jmap-modal" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="jmap-header">
                    <h2 className="jmap-header__title">🗺️ The Journey So Far</h2>
                    <span className="jmap-header__hint">Hover landmarks to explore → Scroll to navigate</span>
                    <button className="jmap-header__close" onClick={onClose}>✕</button>
                </div>

                {/* Scrollable map viewport */}
                <div className="jmap-viewport" ref={mapRef}>
                    <div className="jmap-world">
                        {/* Grass terrain base */}
                        <div className="jmap-terrain" />

                        {/* River */}
                        <svg className="jmap-river-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path
                                d="M -2 90 C 10 85, 15 92, 25 88 C 35 84, 40 95, 55 90 C 70 85, 75 92, 85 88 C 92 85, 95 90, 102 87"
                                fill="none"
                                stroke="rgba(0, 140, 255, 0.35)"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                            <path
                                d="M -2 90 C 10 85, 15 92, 25 88 C 35 84, 40 95, 55 90 C 70 85, 75 92, 85 88 C 92 85, 95 90, 102 87"
                                fill="none"
                                stroke="rgba(100, 200, 255, 0.2)"
                                strokeWidth="5"
                                strokeLinecap="round"
                            />
                        </svg>

                        {/* Mountains (back layer) */}
                        {MOUNTAINS.map((m, i) => (
                            <div
                                key={`mt-${i}`}
                                className="jmap-scenery jmap-scenery--mountain"
                                style={{ left: `${m.x}%`, top: `${m.y}%`, fontSize: `${m.s}rem` }}
                            >
                                {m.type}
                            </div>
                        ))}

                        {/* Trees */}
                        {TREES.map((t, i) => (
                            <div
                                key={`tr-${i}`}
                                className="jmap-scenery jmap-scenery--tree"
                                style={{ left: `${t.x}%`, top: `${t.y}%`, fontSize: `${t.s}rem` }}
                            >
                                {t.type}
                            </div>
                        ))}

                        {/* Houses */}
                        {HOUSES.map((h, i) => (
                            <div
                                key={`hs-${i}`}
                                className="jmap-scenery jmap-scenery--house"
                                style={{ left: `${h.x}%`, top: `${h.y}%`, fontSize: `${h.s}rem` }}
                            >
                                {h.type}
                            </div>
                        ))}

                        {/* Road (SVG) */}
                        <svg className="jmap-road-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                            {/* Road shadow */}
                            <path d={roadPath} fill="none" stroke="rgba(80, 50, 20, 0.5)" strokeWidth="4.5" strokeLinecap="round" />
                            {/* Dirt road */}
                            <path d={roadPath} fill="none" stroke="#8B6914" strokeWidth="3" strokeLinecap="round"
                                className={`jmap-road-line ${drawn ? 'jmap-road-line--drawn' : ''}`}
                            />
                            {/* Road center dashes */}
                            <path d={roadPath} fill="none" stroke="rgba(255, 217, 61, 0.4)" strokeWidth="0.5"
                                strokeLinecap="round" strokeDasharray="1.5 2.5"
                            />
                        </svg>

                        {/* Milestone nodes */}
                        {MILESTONES.map((m, i) => {
                            const isHovered = hoveredId === m.id;
                            const isLast = i === MILESTONES.length - 1;
                            return (
                                <div
                                    key={m.id}
                                    className={`jmap-node ${isHovered ? 'jmap-node--hover' : ''} ${isLast ? 'jmap-node--current' : ''}`}
                                    style={{ left: `${m.x}%`, top: `${m.y}%` }}
                                    onMouseEnter={() => setHoveredId(m.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    <div className="jmap-node__pin">
                                        <span className="jmap-node__icon">{m.icon}</span>
                                    </div>
                                    <span className="jmap-node__flag">{m.year}</span>

                                    {isLast && (
                                        <div className="jmap-node__here">📍 YOU ARE HERE</div>
                                    )}

                                    {/* Tooltip */}
                                    {isHovered && (
                                        <div className={`jmap-tip ${m.y < 35 ? 'jmap-tip--below' : ''}`}>
                                            <div className="jmap-tip__icon">{m.icon}</div>
                                            <div className="jmap-tip__title">{m.title}</div>
                                            <div className="jmap-tip__year">{m.year}</div>
                                            <p className="jmap-tip__info">{m.info}</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Clouds floating */}
                        <div className="jmap-cloud" style={{ left: '8%', top: '3%' }}>☁️</div>
                        <div className="jmap-cloud jmap-cloud--2" style={{ left: '35%', top: '5%' }}>⛅</div>
                        <div className="jmap-cloud jmap-cloud--3" style={{ left: '60%', top: '2%' }}>☁️</div>
                        <div className="jmap-cloud" style={{ left: '85%', top: '4%' }}>☁️</div>
                    </div>
                </div>

                {/* Legend */}
                <div className="jmap-legend">
                    <span>🟤 The Road So Far</span>
                    <span>🏔️ Mountains of Challenge</span>
                    <span>🌊 River of Learning</span>
                    <span>� Current Position</span>
                </div>
            </div>
        </div>
    );
}
