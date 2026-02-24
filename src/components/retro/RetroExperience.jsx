import portfolioData from '../../data/portfolio';

export default function RetroExperience() {
    return (
        <div className="retro-room">
            <h2 className="retro-title">📜 Quest Log 📜</h2>
            <p className="retro-subtitle">~ Completed Quests ~</p>

            <div className="retro-quests">
                {portfolioData.experience.map((exp, i) => (
                    <div key={exp.company} className="retro-quest-item">
                        <div className="retro-quest-item__status">
                            ✅ Quest #{String(i + 1).padStart(2, '0')} — COMPLETED
                        </div>
                        <h3 className="retro-quest-item__title">{exp.role}</h3>
                        <p className="retro-quest-item__company">📍 {exp.company} • {exp.period}</p>
                        <p className="retro-quest-item__desc">{exp.description}</p>
                        <div className="retro-quest-item__rewards">
                            {exp.tech.map((t) => (
                                <span key={t} className="retro-quest-item__tag">+{t}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
