import { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import portfolioData from '../../data/portfolio';

export default function RetroAbout({ onNavigate }) {
    const [displayedText, setDisplayedText] = useState('');
    const [showNext, setShowNext] = useState(false);
    const [secretFound, setSecretFound] = useState(false);
    const { discoverSecret } = useGame();
    const fullText = portfolioData.bio;

    useEffect(() => {
        let i = 0;
        setDisplayedText('');
        setShowNext(false);
        const interval = setInterval(() => {
            if (i < fullText.length) {
                setDisplayedText(fullText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => setShowNext(true), 500);
            }
        }, 20);
        return () => clearInterval(interval);
    }, [fullText]);

    const handleSecretClick = () => {
        if (!secretFound) {
            setSecretFound(true);
            discoverSecret('about_secret');
        }
    };

    return (
        <div className="retro-room">
            <h2 className="retro-title">⚔ About Me ⚔</h2>
            <p className="retro-subtitle">~ Character Info ~</p>

            <div className="retro-dialog">
                <div className="retro-dialog__box retro-pixel-border">
                    <div className="retro-dialog__speaker">
                        <span
                            className={`retro-dialog__avatar ${secretFound ? 'retro-dialog__avatar--found' : ''}`}
                            onClick={handleSecretClick}
                            title="Hmm... this character looks clickable..."
                            style={{ cursor: 'pointer' }}
                        >
                            🧙
                        </span>
                        {portfolioData.name}
                        {secretFound && <span className="retro-secret-badge">🥚 Secret Found!</span>}
                    </div>
                    <p className="retro-dialog__text">
                        {displayedText}
                        {displayedText.length < fullText.length && (
                            <span className="retro-dialog__cursor" />
                        )}
                    </p>
                </div>

                {showNext && (
                    <div className="retro-room__next-hint" style={{ animation: 'fade-in 0.5s ease' }}>
                        <button className="retro-btn retro-btn--glow" onClick={() => onNavigate('skills')}>
                            ⚡ Continue to Skills →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
