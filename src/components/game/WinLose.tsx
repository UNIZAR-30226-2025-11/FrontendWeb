import React, { useEffect } from "react"; // Removed useState as animationComplete is unused
import { routes } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import confetti from 'canvas-confetti';

import "./WinLose.css";
import { useSocket } from "../../context/SocketContext";
import GlassCard from "../../common/GlassCard/GlassCard";

export type BackendWinnerJSON = {
  error: boolean;
  errorMsg: string;
  winnerUsername: string;
  coinsEarned: number;
  lobbyId: string;
  isWinner: boolean;
  gameDate: Date;
  timePlayed: number;
  turnsPlayed: number;
}

const WinLose = () => {
    const navigate = useNavigate();
    const socket = useSocket();
    // Removed unused state: const [animationComplete, setAnimationComplete] = useState(false);

    const handleClick = () => {
        socket.setWinner(undefined);
        socket.setGameState(undefined);
        socket.setLobbyStart(undefined);
        socket.setLobbyCreate(undefined);
        socket.setLobbyEnter(undefined);
        socket.setLobbyState(undefined);
        socket.setMessagesChat(undefined);
        navigate(routes.gamemenu);
    };

    // Ensure winnerData is accessed only after checking it exists
    const winnerData: BackendWinnerJSON | undefined = socket.winner;

    // Format time played in minutes and seconds
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    // Trigger confetti if user is the winner
    useEffect(() => {
        // Check if winnerData exists and if the user is the winner
        if (winnerData?.isWinner) {
            const duration = 10000; // 10 seconds
            const animationEnd = Date.now() + duration;
            // Set a higher zIndex to ensure confetti appears above other elements (like GlassCard)
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval = setInterval(() => {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    clearInterval(interval);
                    // Removed unused state update: setAnimationComplete(true);
                    return;
                }

                const particleCount = 50 * (timeLeft / duration);

                // Launch confetti from both sides
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
                });

                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
                });
            }, 250);

            // Cleanup function to clear interval if component unmounts or winnerData changes
            return () => clearInterval(interval);
        }
    }, [winnerData]); // Dependency array ensures effect runs when winnerData changes

    if (!winnerData) {
        return <div className="ws-loading">Loading game results...</div>;
    }

    const background = winnerData.isWinner ? "green" : "default";

    return (
        <div className="ws-container">
            <GlassCard
                title={winnerData.isWinner ? "Victory!" : "Defeat"}
                minwidth={500}
                maxwidth={800}
                showPaws={true}
                background={background}
            >
                <div className="ws-result-container">
                    <div className="ws-trophy-container">
                        <div className={`ws-trophy ${winnerData.isWinner ? 'ws-winner' : 'ws-loser'}`}>
                            {winnerData.isWinner ? '🏆' : '😢'}
                        </div>
                    </div>

                    <div className="ws-message">
                        {winnerData.isWinner ? (
                            <h2>Congratulations! You&apos;ve won the game!</h2>
                        ) : (
                            <h2>Better luck next time!</h2>
                        )}
                    </div>

                    <div className="ws-stats-grid">
                        <div className="ws-stats-card">
                            <div className="ws-stats-icon">👑</div>
                            <h3>Winner</h3>
                            <div className="ws-stats-value">{winnerData.winnerUsername}</div>
                        </div>

                        <div className="ws-stats-card">
                            <div className="ws-stats-icon">💰</div>
                            <h3>Coins Earned</h3>
                            <div className="ws-stats-value">{winnerData.coinsEarned}</div>
                        </div>

                        <div className="ws-stats-card">
                            <div className="ws-stats-icon">⏱️</div>
                            <h3>Time Played</h3>
                            <div className="ws-stats-value">{formatTime(winnerData.timePlayed)}</div>
                        </div>

                        <div className="ws-stats-card">
                            <div className="ws-stats-icon">🎲</div>
                            <h3>Turns Played</h3>
                            <div className="ws-stats-value">{winnerData.turnsPlayed}</div>
                        </div>
                    </div>

                    <div className="ws-lobby-info">
                        <p>Lobby: <span>{winnerData.lobbyId}</span></p>
                        <p>Game Date: <span>{new Date(winnerData.gameDate).toLocaleString()}</span></p>
                    </div>

                    <button onClick={handleClick} className="ws-button">
                        Back to Game Menu
                    </button>
                </div>
            </GlassCard>
        </div>
    );
};

export default WinLose;