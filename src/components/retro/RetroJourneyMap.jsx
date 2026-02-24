import { useState, useRef, useEffect, useCallback } from 'react';
import './RetroJourneyMap.css';

/* ─── milestone data ─── */
const MILESTONES = [
    { id: 'ssc', label: '10th (SSC)', year: '2016', info: 'Completed schooling with flying colors. First spark of curiosity for technology!', pct: 0.06 },
    { id: 'hsc', label: '12th (HSC)', year: '2018', info: 'Science stream warrior! Discovered the love for problem-solving.', pct: 0.16 },
    { id: 'college', label: 'College', year: '2018', info: 'Started B.Tech in CS. Algorithms, data structures & late-night coding!', pct: 0.26 },
    { id: 'first_code', label: 'First Code', year: '2019', info: 'Wrote my first "Hello World" in C. Felt like casting a spell! ✨', pct: 0.36 },
    { id: 'first_site', label: 'First Website', year: '2020', info: 'Built my first HTML page. Ugly but MINE. Web dev journey began.', pct: 0.46 },
    { id: 'learning', label: 'Learning', year: '2020', info: 'Deep dive into React, Node.js & modern web. Countless tutorials.', pct: 0.55 },
    { id: 'first_proj', label: 'First Project', year: '2021', info: 'TaskFlow Pro — first production project. Tutorials vs reality.', pct: 0.64 },
    { id: 'first_job', label: 'First Job', year: '2021', info: 'Junior Frontend Dev at WebSphere Solutions. Grew through it!', pct: 0.73 },
    { id: 'level_up', label: 'Level Up!', year: '2022', info: 'Frontend Dev at PixelCraft Studios. Real clients, real impact.', pct: 0.84 },
    { id: 'current', label: 'Current', year: '2023–Now', info: 'Senior Frontend Dev at TechNova Inc. Leading & building at scale.', pct: 0.94 },
];

/* ─── pixel-art drawing helpers ─── */

function drawPixelTree(ctx, x, y, scale = 1) {
    const s = scale;
    ctx.save();
    // Trunk
    ctx.fillStyle = '#5a3a1a';
    ctx.fillRect(x - 2 * s, y, 4 * s, 8 * s);
    // Leaves (3 layers)
    ctx.fillStyle = '#1a6b1a';
    ctx.fillRect(x - 8 * s, y - 4 * s, 16 * s, 5 * s);
    ctx.fillStyle = '#228b22';
    ctx.fillRect(x - 6 * s, y - 9 * s, 12 * s, 6 * s);
    ctx.fillStyle = '#2ea82e';
    ctx.fillRect(x - 4 * s, y - 13 * s, 8 * s, 5 * s);
    ctx.restore();
}

function drawPixelPineTree(ctx, x, y, scale = 1) {
    const s = scale;
    ctx.save();
    ctx.fillStyle = '#4a2a0a';
    ctx.fillRect(x - 1.5 * s, y, 3 * s, 7 * s);
    // Triangle layers
    const layers = [
        { w: 14, h: 5, off: -3, col: '#145214' },
        { w: 10, h: 5, off: -7, col: '#1a6b1a' },
        { w: 6, h: 4, off: -10, col: '#228b22' },
    ];
    layers.forEach(l => {
        ctx.fillStyle = l.col;
        ctx.fillRect(x - (l.w / 2) * s, y + l.off * s, l.w * s, l.h * s);
    });
    ctx.restore();
}

function drawPixelMountain(ctx, x, y, w, h, hasSnow) {
    ctx.save();
    // Mountain body
    ctx.fillStyle = '#4a4a5a';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + w / 2, y - h);
    ctx.lineTo(x + w, y);
    ctx.closePath();
    ctx.fill();
    // Darker side
    ctx.fillStyle = '#3a3a4a';
    ctx.beginPath();
    ctx.moveTo(x + w / 2, y - h);
    ctx.lineTo(x + w, y);
    ctx.lineTo(x + w * 0.55, y - h * 0.3);
    ctx.closePath();
    ctx.fill();
    // Snow cap
    if (hasSnow) {
        ctx.fillStyle = '#e8e8f0';
        ctx.beginPath();
        ctx.moveTo(x + w * 0.35, y - h * 0.7);
        ctx.lineTo(x + w / 2, y - h);
        ctx.lineTo(x + w * 0.65, y - h * 0.7);
        ctx.closePath();
        ctx.fill();
    }
    ctx.restore();
}

function drawPixelHouse(ctx, x, y, scale = 1) {
    const s = scale;
    ctx.save();
    // Walls
    ctx.fillStyle = '#b8845a';
    ctx.fillRect(x - 6 * s, y - 6 * s, 12 * s, 8 * s);
    // Roof
    ctx.fillStyle = '#8b2020';
    ctx.beginPath();
    ctx.moveTo(x - 8 * s, y - 6 * s);
    ctx.lineTo(x, y - 14 * s);
    ctx.lineTo(x + 8 * s, y - 6 * s);
    ctx.closePath();
    ctx.fill();
    // Door
    ctx.fillStyle = '#5a3010';
    ctx.fillRect(x - 2 * s, y - 4 * s, 4 * s, 6 * s);
    // Window
    ctx.fillStyle = '#ffe066';
    ctx.fillRect(x + 3 * s, y - 5 * s, 3 * s, 3 * s);
    ctx.restore();
}

function drawPixelCastle(ctx, x, y, scale = 1) {
    const s = scale;
    ctx.save();
    // Main body
    ctx.fillStyle = '#7a7a8a';
    ctx.fillRect(x - 10 * s, y - 12 * s, 20 * s, 14 * s);
    // Towers
    ctx.fillStyle = '#6a6a7a';
    ctx.fillRect(x - 12 * s, y - 18 * s, 6 * s, 20 * s);
    ctx.fillRect(x + 6 * s, y - 18 * s, 6 * s, 20 * s);
    // Tower tops
    ctx.fillStyle = '#3a3aaa';
    ctx.beginPath();
    ctx.moveTo(x - 13 * s, y - 18 * s);
    ctx.lineTo(x - 9 * s, y - 24 * s);
    ctx.lineTo(x - 5 * s, y - 18 * s);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x + 5 * s, y - 18 * s);
    ctx.lineTo(x + 9 * s, y - 24 * s);
    ctx.lineTo(x + 13 * s, y - 18 * s);
    ctx.closePath();
    ctx.fill();
    // Gate
    ctx.fillStyle = '#3a2010';
    ctx.fillRect(x - 3 * s, y - 6 * s, 6 * s, 8 * s);
    // Windows
    ctx.fillStyle = '#ffe066';
    [[-7, -10], [5, -10], [-7, -5], [5, -5]].forEach(([wx, wy]) => {
        ctx.fillRect(x + wx * s, y + wy * s, 3 * s, 3 * s);
    });
    ctx.restore();
}

/* ─── road path (sinuous) through milestones ─── */
function getRoadPoints(w, h, milestones) {
    const padX = w * 0.04;
    const roadW = w - padX * 2;
    return milestones.map((m) => {
        const x = padX + m.pct * roadW;
        // Create elevation variation (ups and downs)
        const wave = Math.sin(m.pct * Math.PI * 3.2) * (h * 0.14);
        const base = h * 0.42 + (1 - m.pct) * h * 0.18;
        const y = base + wave;
        return { x, y, ...m };
    });
}

function drawRoad(ctx, points, w) {
    if (points.length < 2) return;
    // Road shadow
    ctx.save();
    ctx.strokeStyle = 'rgba(40, 25, 10, 0.6)';
    ctx.lineWidth = Math.max(16, w * 0.014);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y + 3);
    for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const cpx = (prev.x + curr.x) / 2;
        ctx.bezierCurveTo(cpx, prev.y + 3, cpx, curr.y + 3, curr.x, curr.y + 3);
    }
    ctx.stroke();
    // Dirt road body
    ctx.strokeStyle = '#8a6a2a';
    ctx.lineWidth = Math.max(12, w * 0.011);
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const cpx = (prev.x + curr.x) / 2;
        ctx.bezierCurveTo(cpx, prev.y, cpx, curr.y, curr.x, curr.y);
    }
    ctx.stroke();
    // Center dashes
    ctx.strokeStyle = 'rgba(255, 220, 100, 0.35)';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 10]);
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const cpx = (prev.x + curr.x) / 2;
        ctx.bezierCurveTo(cpx, prev.y, cpx, curr.y, curr.x, curr.y);
    }
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
}

function drawRiver(ctx, w, h) {
    ctx.save();
    const ry = h * 0.82;
    // Water body
    ctx.strokeStyle = 'rgba(30, 100, 200, 0.45)';
    ctx.lineWidth = Math.max(18, w * 0.016);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-10, ry);
    for (let x = 0; x <= w + 20; x += 60) {
        ctx.quadraticCurveTo(x + 15, ry - 12, x + 30, ry);
        ctx.quadraticCurveTo(x + 45, ry + 12, x + 60, ry);
    }
    ctx.stroke();
    // Highlight
    ctx.strokeStyle = 'rgba(100, 180, 255, 0.25)';
    ctx.lineWidth = Math.max(26, w * 0.022);
    ctx.beginPath();
    ctx.moveTo(-10, ry);
    for (let x = 0; x <= w + 20; x += 60) {
        ctx.quadraticCurveTo(x + 15, ry - 12, x + 30, ry);
        ctx.quadraticCurveTo(x + 45, ry + 12, x + 60, ry);
    }
    ctx.stroke();
    // Sparkles
    ctx.fillStyle = 'rgba(200, 230, 255, 0.3)';
    for (let x = 40; x < w; x += 90) {
        ctx.fillRect(x, ry - 3, 4, 2);
    }
    ctx.restore();
}

function drawMilestonePin(ctx, x, y, isCurrent) {
    ctx.save();
    // Pin stick
    ctx.strokeStyle = '#5a4510';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 24);
    ctx.stroke();
    // Pin circle
    ctx.fillStyle = isCurrent ? '#16c60c' : '#8B6914';
    ctx.beginPath();
    ctx.arc(x, y - 30, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = isCurrent ? '#aaffaa' : '#ffd93d';
    ctx.lineWidth = 2;
    ctx.stroke();
    // Inner dot
    ctx.fillStyle = isCurrent ? '#aaffaa' : '#ffd93d';
    ctx.beginPath();
    ctx.arc(x, y - 30, 3, 0, Math.PI * 2);
    ctx.fill();
    // Glow for current
    if (isCurrent) {
        ctx.shadowColor = '#16c60c';
        ctx.shadowBlur = 15;
        ctx.fillStyle = 'rgba(22, 198, 12, 0.3)';
        ctx.beginPath();
        ctx.arc(x, y - 30, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
    ctx.restore();
}

/* ─── main canvas renderer ─── */
function renderMap(ctx, w, h, points) {
    ctx.clearRect(0, 0, w, h);

    // Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.3);
    skyGrad.addColorStop(0, '#0a0a2a');
    skyGrad.addColorStop(1, '#1a2a1a');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.3);

    // Grass gradient
    const grassGrad = ctx.createLinearGradient(0, h * 0.2, 0, h);
    grassGrad.addColorStop(0, '#1a4a18');
    grassGrad.addColorStop(0.5, '#225a20');
    grassGrad.addColorStop(1, '#2a6a28');
    ctx.fillStyle = grassGrad;
    ctx.fillRect(0, h * 0.2, w, h * 0.8);

    // Tile grid
    ctx.strokeStyle = 'rgba(100, 160, 60, 0.06)';
    ctx.lineWidth = 1;
    const tileSize = 32;
    for (let gx = 0; gx < w; gx += tileSize) {
        ctx.beginPath(); ctx.moveTo(gx, h * 0.2); ctx.lineTo(gx, h); ctx.stroke();
    }
    for (let gy = h * 0.2; gy < h; gy += tileSize) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(w, gy); ctx.stroke();
    }

    // Mountains (back)
    drawPixelMountain(ctx, w * 0.02, h * 0.28, w * 0.12, h * 0.2, true);
    drawPixelMountain(ctx, w * 0.18, h * 0.25, w * 0.15, h * 0.25, true);
    drawPixelMountain(ctx, w * 0.42, h * 0.27, w * 0.1, h * 0.17, false);
    drawPixelMountain(ctx, w * 0.65, h * 0.24, w * 0.14, h * 0.24, true);
    drawPixelMountain(ctx, w * 0.85, h * 0.26, w * 0.12, h * 0.2, false);

    // River
    drawRiver(ctx, w, h);

    // Trees (scattered)
    const treePositions = [
        [0.04, 0.45], [0.09, 0.7], [0.14, 0.35], [0.19, 0.82],
        [0.24, 0.28], [0.30, 0.75], [0.35, 0.9], [0.40, 0.32],
        [0.45, 0.72], [0.50, 0.9], [0.55, 0.28], [0.60, 0.78],
        [0.65, 0.88], [0.70, 0.30], [0.75, 0.72], [0.80, 0.88],
        [0.85, 0.40], [0.90, 0.75], [0.95, 0.65], [0.12, 0.55],
        [0.38, 0.52], [0.58, 0.50], [0.78, 0.55], [0.92, 0.50],
    ];
    treePositions.forEach(([tx, ty], i) => {
        const fn = i % 3 === 0 ? drawPixelPineTree : drawPixelTree;
        fn(ctx, tx * w, ty * h, 1.2 + (i % 3) * 0.3);
    });

    // Houses
    drawPixelHouse(ctx, w * 0.11, h * 0.60, 1.3);
    drawPixelHouse(ctx, w * 0.47, h * 0.64, 1.1);
    drawPixelCastle(ctx, w * 0.82, h * 0.62, 1.2);

    // Road
    drawRoad(ctx, points, w);

    // Milestone pins
    points.forEach((p, i) => {
        drawMilestonePin(ctx, p.x, p.y, i === points.length - 1);
    });

    // "YOU ARE HERE" text for last milestone
    const last = points[points.length - 1];
    ctx.save();
    ctx.font = '9px "Press Start 2P", monospace';
    ctx.fillStyle = '#16c60c';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#16c60c';
    ctx.shadowBlur = 8;
    ctx.fillText('📍 YOU ARE HERE', last.x, last.y - 48);
    ctx.shadowBlur = 0;
    ctx.restore();

    // Year labels under each pin
    ctx.save();
    ctx.font = '8px "Press Start 2P", monospace';
    ctx.textAlign = 'center';
    points.forEach((p) => {
        ctx.fillStyle = 'rgba(255, 217, 61, 0.8)';
        ctx.fillText(p.year, p.x, p.y + 18);
    });
    ctx.restore();

    // Stars in sky
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 200, 0.5)';
    for (let i = 0; i < 30; i++) {
        const sx = (i * 137.5) % w;
        const sy = (i * 73.3) % (h * 0.25);
        ctx.fillRect(sx, sy, 2, 2);
    }
    ctx.restore();
}

/* ─── component ─── */
export default function RetroJourneyMap({ onClose }) {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [hoveredIdx, setHoveredIdx] = useState(-1);
    const [points, setPoints] = useState([]);
    const [dims, setDims] = useState({ w: 0, h: 0 });

    // Render canvas and compute milestone positions
    const render = useCallback(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const w = container.clientWidth;
        const h = container.clientHeight;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;

        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        ctx.imageSmoothingEnabled = false; // pixel-crisp

        const pts = getRoadPoints(w, h, MILESTONES);
        setPoints(pts);
        setDims({ w, h });
        renderMap(ctx, w, h, pts);
    }, []);

    useEffect(() => {
        render();
        const handleResize = () => render();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [render]);

    // Find hovered milestone via mouse position
    const handleMouseMove = (e) => {
        if (points.length === 0) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        let found = -1;
        for (let i = 0; i < points.length; i++) {
            const dx = mx - points[i].x;
            const dy = my - (points[i].y - 30);
            if (dx * dx + dy * dy < 20 * 20) { found = i; break; }
        }
        setHoveredIdx(found);
    };

    const hovered = hoveredIdx >= 0 ? points[hoveredIdx] : null;

    return (
        <div className="jmap-overlay" onClick={onClose}>
            <div className="jmap-modal" onClick={(e) => e.stopPropagation()}>
                <div className="jmap-header">
                    <h2 className="jmap-header__title">🗺️ The Journey So Far</h2>
                    <button className="jmap-header__close" onClick={onClose}>✕</button>
                </div>

                <div className="jmap-canvas-wrap" ref={containerRef}>
                    <canvas
                        ref={canvasRef}
                        className="jmap-canvas"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => setHoveredIdx(-1)}
                    />

                    {/* React tooltip overlay */}
                    {hovered && (
                        <div
                            className={`jmap-tip ${hovered.y < dims.h * 0.4 ? 'jmap-tip--below' : ''}`}
                            style={{
                                left: Math.min(Math.max(hovered.x, 140), dims.w - 140),
                                top: hovered.y < dims.h * 0.4
                                    ? hovered.y + 10
                                    : hovered.y - 70,
                            }}
                        >
                            <div className="jmap-tip__title">{hovered.label}</div>
                            <div className="jmap-tip__year">{hovered.year}</div>
                            <p className="jmap-tip__info">{hovered.info}</p>
                        </div>
                    )}
                </div>

                <div className="jmap-legend">
                    <span>🟤 The Road of Progress</span>
                    <span>🏔️ Mountains of Challenge</span>
                    <span>🌊 River of Learning</span>
                    <span>📍 Current Position</span>
                </div>
            </div>
        </div>
    );
}
