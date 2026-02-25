import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { SoundManager } from '../utils/SoundManager';

const GameContext = createContext();

const ACHIEVEMENTS = [
    { id: 'first_step', title: 'First Steps', desc: 'Started your adventure', xp: 10, icon: '🚶' },
    { id: 'about_me', title: 'Who Am I?', desc: 'Discovered the character backstory', xp: 20, icon: '🧙' },
    { id: 'skill_check', title: 'Skill Scouter', desc: 'Inspected the stats screen', xp: 20, icon: '📊' },
    { id: 'quest_log', title: 'Quest Historian', desc: 'Read through the quest log', xp: 25, icon: '📜' },
    { id: 'treasure_hunter', title: 'Treasure Hunter', desc: 'Found the treasure room', xp: 25, icon: '🏆' },
    { id: 'social_butterfly', title: 'Social Butterfly', desc: 'Discovered the quest board', xp: 20, icon: '📋' },

    { id: 'skill_master', title: 'Skill Inspector', desc: 'Clicked on 3 different skills', xp: 15, icon: '⚡' },
    { id: 'treasure_opener', title: 'Loot Goblin', desc: 'Examined a project artifact', xp: 15, icon: '💎' },
    { id: 'scroll_found', title: 'Ancient Scroll', desc: 'Downloaded the resume scroll', xp: 20, icon: '📄' },
    { id: 'full_clear', title: '100% Explorer', desc: 'Visited every room!', xp: 50, icon: '🌟' },
    { id: 'secret_finder', title: 'Easter Egg Hunter', desc: 'Found a hidden secret', xp: 30, icon: '🥚' },
    { id: 'game_challenger', title: 'Game Challenger', desc: 'Challenged the AI to a battle of wits', xp: 15, icon: '🎮' },

    // New gamification achievements
    { id: 'konami_master', title: 'Konami Master', desc: '\u2191\u2191\u2193\u2193\u2190\u2192\u2190\u2192BA — You know the code!', xp: 40, icon: '🕹️' },
    { id: 'speed_runner', title: 'Speed Runner', desc: 'Visited 3 rooms in under 10 seconds!', xp: 35, icon: '💨' },
    { id: 'boss_slayer', title: 'Boss Slayer', desc: 'Defeated the Resume Guardian!', xp: 30, icon: '🐉' },
    { id: 'bug_squasher', title: 'Bug Squasher', desc: 'Squashed a wild bug!', xp: 20, icon: '🐛' },
];

const ROOM_ACHIEVEMENT_MAP = {
    about: 'about_me',
    skills: 'skill_check',
    experience: 'quest_log',
    projects: 'treasure_hunter',
    contact: 'social_butterfly',
};

const ALL_ROOMS = ['about', 'skills', 'experience', 'projects', 'contact'];

export function GameProvider({ children }) {
    const [xp, setXp] = useState(0);
    const [maxXp] = useState(390); // Total XP from all 16 achievements
    const [level, setLevel] = useState(1);
    const [unlockedAchievements, setUnlockedAchievements] = useState([]);
    const [achievementPopup, setAchievementPopup] = useState(null);
    const [visitedRooms, setVisitedRooms] = useState(['hero']);
    const [discoveredSecrets, setDiscoveredSecrets] = useState([]);
    const [clickedSkills, setClickedSkills] = useState([]);
    const [hasExaminedProject, setHasExaminedProject] = useState(false);
    const popupTimeoutRef = useRef(null);

    // Combo / speed-runner tracking
    const comboTimestamps = useRef([]);

    const showAchievement = useCallback((achievement) => {
        if (popupTimeoutRef.current) {
            clearTimeout(popupTimeoutRef.current);
        }
        setAchievementPopup(achievement);
        popupTimeoutRef.current = setTimeout(() => {
            setAchievementPopup(null);
        }, 3500);
    }, []);

    const unlockAchievement = useCallback((achievementId) => {
        setUnlockedAchievements((prev) => {
            if (prev.includes(achievementId)) return prev;
            const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
            if (!achievement) return prev;

            setXp((prevXp) => {
                const newXp = prevXp + achievement.xp;
                const newLevel = Math.floor(newXp / 50) + 1;
                setLevel((prevLevel) => {
                    if (newLevel > prevLevel) {
                        setTimeout(() => SoundManager.play('levelUp'), 600);
                    }
                    return newLevel;
                });
                return newXp;
            });

            SoundManager.play('achievement');
            showAchievement(achievement);
            return [...prev, achievementId];
        });
    }, [showAchievement]);

    const visitRoom = useCallback((roomId) => {
        setVisitedRooms((prev) => {
            if (prev.includes(roomId)) return prev;
            const newVisited = [...prev, roomId];

            // Unlock room-specific achievement
            const achId = ROOM_ACHIEVEMENT_MAP[roomId];
            if (achId) {
                setTimeout(() => unlockAchievement(achId), 600);
            }

            // Check if all rooms visited
            if (ALL_ROOMS.every((r) => newVisited.includes(r))) {
                setTimeout(() => unlockAchievement('full_clear'), 1500);
            }

            return newVisited;
        });
    }, [unlockAchievement]);

    // Track room visit timestamps for speed-runner combo
    const trackCombo = useCallback((roomId) => {
        const now = Date.now();
        comboTimestamps.current.push({ roomId, time: now });
        // Keep only last 10 seconds of entries
        comboTimestamps.current = comboTimestamps.current.filter(e => now - e.time < 10000);
        // Count unique rooms visited in the window
        const uniqueRooms = new Set(comboTimestamps.current.map(e => e.roomId));
        if (uniqueRooms.size >= 3) {
            setTimeout(() => unlockAchievement('speed_runner'), 300);
            comboTimestamps.current = []; // reset
        }
    }, [unlockAchievement]);

    const clickSkill = useCallback((skillName) => {
        setClickedSkills((prev) => {
            if (prev.includes(skillName)) return prev;
            const newClicked = [...prev, skillName];
            if (newClicked.length === 3) {
                setTimeout(() => unlockAchievement('skill_master'), 400);
            }
            return newClicked;
        });
    }, [unlockAchievement]);

    const examineProject = useCallback(() => {
        if (!hasExaminedProject) {
            setHasExaminedProject(true);
            setTimeout(() => unlockAchievement('treasure_opener'), 400);
        }
    }, [hasExaminedProject, unlockAchievement]);

    const discoverSecret = useCallback((secretId) => {
        setDiscoveredSecrets((prev) => {
            if (prev.includes(secretId)) return prev;
            setTimeout(() => unlockAchievement('secret_finder'), 400);
            return [...prev, secretId];
        });
    }, [unlockAchievement]);

    const isRoomUnlocked = useCallback((roomId) => {
        if (roomId === 'hero') return true;
        if (roomId === 'about') return visitedRooms.includes('hero') || unlockedAchievements.includes('first_step');
        if (roomId === 'skills') return visitedRooms.includes('about');
        if (roomId === 'experience') return visitedRooms.includes('skills');
        if (roomId === 'projects') return visitedRooms.includes('experience');
        if (roomId === 'contact') return visitedRooms.includes('projects');
        return false;
    }, [visitedRooms, unlockedAchievements]);

    return (
        <GameContext.Provider
            value={{
                xp,
                maxXp,
                level,
                unlockedAchievements,
                achievementPopup,
                visitedRooms,
                discoveredSecrets,
                clickedSkills,
                visitRoom,
                unlockAchievement,
                clickSkill,
                examineProject,
                discoverSecret,
                isRoomUnlocked,
                trackCombo,
                allAchievements: ACHIEVEMENTS,
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}
