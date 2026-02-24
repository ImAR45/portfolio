import { useState, useEffect } from 'react';
import portfolioData from '../../data/portfolio';

export default function RetroAbout() {
    const [displayedText, setDisplayedText] = useState('');
    const fullText = portfolioData.bio;

    useEffect(() => {
        let i = 0;
        setDisplayedText('');
        const interval = setInterval(() => {
            if (i < fullText.length) {
                setDisplayedText(fullText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 25);
        return () => clearInterval(interval);
    }, [fullText]);

    return (
        <div className="retro-room">
            <h2 className="retro-title">⚔ About Me ⚔</h2>
            <p className="retro-subtitle">~ Character Info ~</p>

            <div className="retro-dialog">
                <div className="retro-dialog__box retro-pixel-border">
                    <div className="retro-dialog__speaker">
                        <span className="retro-dialog__avatar">🧙</span>
                        {portfolioData.name}
                    </div>
                    <p className="retro-dialog__text">
                        {displayedText}
                        {displayedText.length < fullText.length && (
                            <span className="retro-dialog__cursor" />
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}
