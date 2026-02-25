import { useState, useCallback, useEffect, useRef } from 'react';
import { useGame } from '../../context/GameContext';
import { SoundManager } from '../../utils/SoundManager';

/* ─── Minimax AI (unbeatable) ─── */
const EMPTY = null;
const HUMAN = 'X';
const AI = 'O';
const AI_NAME = "Aaryan";

function getWinner(board) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
        [0, 4, 8], [2, 4, 6],            // diagonals
    ];
    for (const [a, b, c] of lines) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a], line: [a, b, c] };
        }
    }
    return null;
}

function isBoardFull(board) {
    return board.every((cell) => cell !== EMPTY);
}

function minimax(board, isMaximizing, alpha, beta) {
    const result = getWinner(board);
    if (result) return result.winner === AI ? 10 : -10;
    if (isBoardFull(board)) return 0;

    if (isMaximizing) {
        let best = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] !== EMPTY) continue;
            board[i] = AI;
            best = Math.max(best, minimax(board, false, alpha, beta));
            board[i] = EMPTY;
            alpha = Math.max(alpha, best);
            if (beta <= alpha) break;
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] !== EMPTY) continue;
            board[i] = HUMAN;
            best = Math.min(best, minimax(board, true, alpha, beta));
            board[i] = EMPTY;
            beta = Math.min(beta, best);
            if (beta <= alpha) break;
        }
        return best;
    }
}

function getBestMove(board) {
    let bestScore = -Infinity;
    let bestMove = -1;
    for (let i = 0; i < 9; i++) {
        if (board[i] !== EMPTY) continue;
        board[i] = AI;
        const score = minimax(board, false, -Infinity, Infinity);
        board[i] = EMPTY;
        if (score > bestScore) {
            bestScore = score;
            bestMove = i;
        }
    }
    return bestMove;
}

/* ─── Messages ─── */
const INTRO_MESSAGES = [
    "Think you can outsmart me? I've never lost a game. Beat me, and I'll build your dream portfolio! 🎯",
    "No one has ever defeated me. Prove you're worthy and I'll create a portfolio just for you! ⚔️",
    "I challenge you, brave soul! Win against my perfect AI, and your portfolio wish is my command! 🏆",
];

const TAUNT_MESSAGES = [
    "Another one bites the dust! 💀 My circuits remain undefeated.",
    "Nice try, but I've been trained on millions of games! Better luck next time. 😏",
    "Game Over! Did you really think you could beat a perfect AI? 🤖",
    "Defeated! Don't worry — 99.99% of humans can't beat me either. 🎮",
];

const DRAW_MESSAGES = [
    "Impressive! A draw against my perfect AI is the best any human can do! 🤝",
    "You survived! Not many can force a draw against me. Respect. ✊",
    "Stalemate! You're clearly skilled — but can you do the impossible and WIN? 🧠",
];

const WIN_MESSAGE = "🎉 IMPOSSIBLE! You actually beat me?! A deal is a deal — send me proof and I'll build your dream portfolio!";

const AI_FIRST_TAUNTS = [
    "I won the toss! I'll go first — hope you're ready! 😈",
    "Luck is on my side! I choose to strike first! ⚡",
    "My coin, my rules! I'm going first. Prepare yourself! 🎲",
];

function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/* ─── Component ─── */
const PHASES = { intro: 'intro', toss: 'toss', choosing: 'choosing', playing: 'playing', result: 'result' };

export default function RetroTicTacToe({ onClose }) {
    const { unlockAchievement } = useGame();
    const [phase, setPhase] = useState(PHASES.intro);
    const [board, setBoard] = useState(Array(9).fill(EMPTY));
    const [currentTurn, setCurrentTurn] = useState(null); // HUMAN or AI
    const [firstPlayer, setFirstPlayer] = useState(null);
    const [gameResult, setGameResult] = useState(null); // null | { winner, line }
    const [introMsg] = useState(() => randomFrom(INTRO_MESSAGES));
    const [resultMsg, setResultMsg] = useState('');
    const [tossResult, setTossResult] = useState(null); // 'user' or 'ai'
    const [tossAnimating, setTossAnimating] = useState(false);
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [winLine, setWinLine] = useState(null);
    const [moveCount, setMoveCount] = useState(0);
    const achievementTriggered = useRef(false);

    // Unlock achievement on first visit
    useEffect(() => {
        if (!achievementTriggered.current) {
            achievementTriggered.current = true;
            unlockAchievement('game_challenger');
        }
    }, [unlockAchievement]);

    /* ─── Coin Toss ─── */
    const handleToss = useCallback(() => {
        SoundManager.play('click');
        setTossAnimating(true);
        // Animate for 1.5s, then reveal result
        setTimeout(() => {
            const userWins = Math.random() < 0.5;
            setTossResult(userWins ? 'user' : 'ai');
            setTossAnimating(false);
            SoundManager.play(userWins ? 'achievement' : 'navigate');
            if (userWins) {
                setPhase(PHASES.choosing);
            } else {
                // AI wins toss, AI chooses to go first
                setTimeout(() => {
                    startGame(AI);
                }, 1200);
            }
        }, 1500);
        setPhase(PHASES.toss);
    }, []);

    /* ─── Start Game ─── */
    const startGame = useCallback((first) => {
        setBoard(Array(9).fill(EMPTY));
        setGameResult(null);
        setWinLine(null);
        setMoveCount(0);
        setFirstPlayer(first);
        setCurrentTurn(first);
        setPhase(PHASES.playing);
        SoundManager.play('startQuest');
    }, []);

    const handleChooseFirst = useCallback((who) => {
        SoundManager.play('click');
        startGame(who);
    }, [startGame]);

    /* ─── Check game end ─── */
    const checkGameEnd = useCallback((newBoard) => {
        const result = getWinner(newBoard);
        if (result) {
            setWinLine(result.line);
            setGameResult(result.winner);
            if (result.winner === HUMAN) {
                setResultMsg(WIN_MESSAGE);
                SoundManager.play('levelUp');
            } else {
                setResultMsg(randomFrom(TAUNT_MESSAGES));
                SoundManager.play('navigate');
            }
            setPhase(PHASES.result);
            return true;
        }
        if (isBoardFull(newBoard)) {
            setGameResult('draw');
            setResultMsg(randomFrom(DRAW_MESSAGES));
            SoundManager.play('achievement');
            setPhase(PHASES.result);
            return true;
        }
        return false;
    }, []);

    /* ─── AI move ─── */
    const makeAiMove = useCallback((currentBoard) => {
        setTimeout(() => {
            const move = getBestMove([...currentBoard]);
            if (move === -1) return;
            const newBoard = [...currentBoard];
            newBoard[move] = AI;
            setBoard(newBoard);
            setMoveCount((c) => c + 1);
            SoundManager.play('click');
            if (!checkGameEnd(newBoard)) {
                setCurrentTurn(HUMAN);
            }
        }, 400 + Math.random() * 300); // Slight delay for realism
    }, [checkGameEnd]);

    /* ─── Trigger AI move when it's AI's turn ─── */
    useEffect(() => {
        if (phase === PHASES.playing && currentTurn === AI) {
            makeAiMove(board);
        }
    }, [phase, currentTurn]); // eslint-disable-line react-hooks/exhaustive-deps

    /* ─── Human move ─── */
    const handleCellClick = useCallback((index) => {
        if (phase !== PHASES.playing || currentTurn !== HUMAN || board[index] !== EMPTY) return;
        SoundManager.play('click');
        const newBoard = [...board];
        newBoard[index] = HUMAN;
        setBoard(newBoard);
        setMoveCount((c) => c + 1);
        if (!checkGameEnd(newBoard)) {
            setCurrentTurn(AI);
        }
    }, [phase, currentTurn, board, checkGameEnd]);

    /* ─── Play Again ─── */
    const handlePlayAgain = useCallback(() => {
        SoundManager.play('click');
        setPhase(PHASES.intro);
        setBoard(Array(9).fill(EMPTY));
        setGameResult(null);
        setWinLine(null);
        setTossResult(null);
        setShowEmailForm(false);
        setMoveCount(0);
    }, []);

    /* ─── Email claim ─── */
    const handleClaimReward = () => {
        setShowEmailForm(true);
    };

    const handleSendEmail = () => {
        const subject = encodeURIComponent('🏆 I Beat Your Tic-Tac-Toe AI!');
        const body = encodeURIComponent(
            'Hi!\n\nI beat your unbeatable tic-tac-toe AI! 🎉\n\nPlease find the screenshot of my win attached.\n\nI\'d love to claim my reward — a custom portfolio built to my specifications!\n\nLooking forward to hearing from you.'
        );
        window.open(`mailto:imarabdulrahman45@gmail.com?subject=${subject}&body=${body}`, '_blank');
    };

    /* ─── Render ─── */
    return (
        <div className="ttt-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="ttt-modal">
                {/* Close Button */}
                <button className="ttt-close" onClick={onClose} title="Close">✕</button>

                {/* Header */}
                <div className="ttt-header">
                    <h2 className="ttt-title">⚔️ TIC-TAC-TOE CHALLENGE ⚔️</h2>
                    {phase === PHASES.playing && (
                        <div className="ttt-turn-indicator">
                            {currentTurn === HUMAN
                                ? "🎯 Your Turn — Place your X!"
                                : "🤖 AI is thinking..."}
                        </div>
                    )}
                </div>

                {/* ─── INTRO ─── */}
                {phase === PHASES.intro && (
                    <div className="ttt-intro">
                        <div className="ttt-ai-avatar">🤖</div>
                        <p className="ttt-intro-msg">{introMsg}</p>
                        <div className="ttt-challenge-badge">
                            💬 "If you can beat me, I'll create a portfolio for you — exactly as you wish!"
                        </div>
                        <button className="retro-btn retro-btn--glow ttt-start-btn" onClick={handleToss}>
                            🪙 Toss the Coin to Begin!
                        </button>
                    </div>
                )}

                {/* ─── COIN TOSS ─── */}
                {phase === PHASES.toss && (
                    <div className="ttt-toss">
                        <div className={`ttt-coin ${tossAnimating ? 'ttt-coin--flipping' : ''}`}>
                            <div className="ttt-coin__front">👤</div>
                            <div className="ttt-coin__back">🤖</div>
                        </div>
                        {tossAnimating && <p className="ttt-toss-text">Flipping the coin...</p>}
                        {!tossAnimating && tossResult === 'ai' && (
                            <div className="ttt-toss-result">
                                <p className="ttt-toss-text ttt-toss-text--lose">
                                    🤖 AI wins the toss!
                                </p>
                                <p className="ttt-ai-choice">{randomFrom(AI_FIRST_TAUNTS)}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* ─── CHOOSING WHO GOES FIRST ─── */}
                {phase === PHASES.choosing && (
                    <div className="ttt-choosing">
                        <p className="ttt-toss-text ttt-toss-text--win">🎉 You won the toss!</p>
                        <p className="ttt-choose-label">Who should go first?</p>
                        <div className="ttt-choose-btns">
                            <button className="retro-btn retro-btn--glow" onClick={() => handleChooseFirst(HUMAN)}>
                                👤 I'll Go First (X)
                            </button>
                            <button className="retro-btn retro-btn--secondary" onClick={() => handleChooseFirst(AI)}>
                                🤖 Let {AI_NAME} Go First (O)
                            </button>
                        </div>
                    </div>
                )}

                {/* ─── GAME BOARD ─── */}
                {phase === PHASES.playing && (
                    <div className="ttt-board-wrap">
                        <div className="ttt-scoreboard">
                            <span className="ttt-score ttt-score--human">👤 You (X)</span>
                            <span className="ttt-score ttt-score--vs">VS</span>
                            <span className="ttt-score ttt-score--ai">🤖 {AI_NAME} (O)</span>
                        </div>
                        <div className="ttt-board">
                            {board.map((cell, i) => (
                                <button
                                    key={i}
                                    className={`ttt-cell${cell ? ` ttt-cell--${cell.toLowerCase()}` : ''}${winLine?.includes(i) ? ' ttt-cell--win' : ''}${!cell && currentTurn === HUMAN ? ' ttt-cell--clickable' : ''}`}
                                    onClick={() => handleCellClick(i)}
                                    disabled={cell !== EMPTY || currentTurn !== HUMAN}
                                >
                                    {cell && <span className="ttt-mark">{cell}</span>}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ─── RESULT ─── */}
                {phase === PHASES.result && (
                    <div className="ttt-result">
                        {/* Show the final board */}
                        <div className="ttt-board ttt-board--small">
                            {board.map((cell, i) => (
                                <div
                                    key={i}
                                    className={`ttt-cell ttt-cell--small${cell ? ` ttt-cell--${cell.toLowerCase()}` : ''}${winLine?.includes(i) ? ' ttt-cell--win' : ''}`}
                                >
                                    {cell && <span className="ttt-mark">{cell}</span>}
                                </div>
                            ))}
                        </div>

                        <div className={`ttt-result-badge ttt-result-badge--${gameResult === HUMAN ? 'win' : gameResult === 'draw' ? 'draw' : 'lose'}`}>
                            {gameResult === HUMAN ? '🏆 YOU WIN!' : gameResult === 'draw' ? '🤝 DRAW!' : '💀 DEFEATED!'}
                        </div>
                        <p className="ttt-result-msg">{resultMsg}</p>

                        {/* Win scenario — email claim */}
                        {gameResult === HUMAN && !showEmailForm && (
                            <button className="retro-btn retro-btn--glow ttt-claim-btn" onClick={handleClaimReward}>
                                📧 Claim Your Reward!
                            </button>
                        )}

                        {showEmailForm && (
                            <div className="ttt-email-form">
                                <p className="ttt-email-info">
                                    📸 Take a screenshot of your win, then click below to send it to me!
                                </p>
                                <button className="retro-btn retro-btn--glow ttt-send-btn" onClick={handleSendEmail}>
                                    📧 Send Email with Screenshot
                                </button>
                                <p className="ttt-email-hint">
                                    💡 Tip: Use Cmd+Shift+4 (Mac) or Win+Shift+S (Windows) to capture the screenshot, then attach it to the email.
                                </p>
                            </div>
                        )}

                        <div className="ttt-result-actions">
                            <button className="retro-btn" onClick={handlePlayAgain}>
                                🔄 Play Again
                            </button>
                            <button className="retro-btn retro-btn--secondary" onClick={onClose}>
                                🚪 Exit
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
