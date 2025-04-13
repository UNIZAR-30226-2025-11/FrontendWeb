import React, { useState, useEffect } from 'react';
import './LobbyUsers.css';
import { startLobby } from '../../services/socketService';
import { SocketContextType, useSocket } from '../../context/SocketContext';
import GlassCard from '../../common/GlassCard/GlassCard';

const LobbyUsers = () => {
    const socket: SocketContextType = useSocket();
    const [copied, setCopied] = useState(false);
    const [animateList, setAnimateList] = useState(false);
    const [disbandAnimated, setDisbandAnimated] = useState(false);
    const [countdown, setCountdown] = useState(5);

    const lobbyId = socket.lobbyCreate?.lobbyId || socket.lobbyEnter?.lobbyId || "";
    const isHost = !!socket.lobbyCreate;
    const players = socket.lobbyState?.players || [];
    const disband = socket.lobbyState?.disband || false;

    useEffect(() => {
        // Trigger animation when players list changes
        setAnimateList(true);
        const timer = setTimeout(() => setAnimateList(false), 500);
        return () => clearTimeout(timer);
    }, [players.length]);

    // Handle disband animation
    useEffect(() => {
        if (disband) {
            setDisbandAnimated(true);
            
            // Start countdown for redirection
            const countdownInterval = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(countdownInterval);
                        // Redirect after countdown reaches zero
                        window.location.reload();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            
            return () => clearInterval(countdownInterval);
        }
    }, [disband]);

    const handleClick = () => {
        startLobby(socket.socket, lobbyId, socket.setLobbyStart);
    };

    const handleLeave = () => {
        window.location.reload();
    };

    const copyLobbyId = () => {
        if (lobbyId) {
            navigator.clipboard.writeText(lobbyId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // Calculate status message based on player count and disband status
    const getStatusMessage = () => {
        if (disband) {
            return "The host has disbanded the lobby. You'll be redirected soon...";
        }
        if (players.length === 0) {
            return "Waiting for players to join...";
        }
        if (isHost) {
            return players.length > 1 
                ? "Ready to start when you are!" 
                : "Need at least one more player to start";
        }
        return "Waiting for the host to start the game...";
    };

    // Return disband overlay if the lobby is disbanded
    if (disband) {
        return (
            <div className="lobby-users-wrapper">
                <GlassCard
                    className={`lobby-users-card disband ${disbandAnimated ? "disband-animated" : ""}`}
                    title="Lobby Disbanded"
                    maxwidth="800px"
                    minwidth="600px"
                    showPaws={true}
                >
                    <div className="disband-content">
                        <div className="disband-icon">
                            <span></span>
                            <span></span>
                        </div>
                        <h3 className="disband-title">The host has disbanded this lobby</h3>
                        <p className="disband-message">You'll be redirected to the main menu shortly...</p>
                        <div className="loading-indicator">
                            <div className="loading-dot"></div>
                            <div className="loading-dot"></div>
                            <div className="loading-dot"></div>
                        </div>
                        <button className="GC-button GC-blue-btn" onClick={handleLeave}>
                            <span className="GC-button-text">Return to Menu Now</span>
                        </button>
                    </div>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="lobby-users-wrapper">
            <GlassCard
                className="lobby-users-card"
                title="Lobby"
                maxwidth="700px"
                minwidth="600px"
                showPaws={true}
            >
                <div className="lobby-id-container">
                    <h3 className="lobby-id-label">Lobby Code</h3>
                    <div className="lobby-id-value" onClick={copyLobbyId}>
                        <span>{lobbyId || "Loading..."}</span>
                        <div className={`copy-tooltip ${copied ? "show" : ""}`}>
                            {copied ? "Copied!" : "Click to copy"}
                        </div>
                        <button className="copy-button" aria-label="Copy lobby ID">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                                <path fill="none" d="M0 0h24v24H0z"/>
                                <path d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zm2 0h8v10h2V4H9v2z" 
                                      fill="rgba(255,255,255,0.8)"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="players-section">
                    <h3 className="section-label">Players</h3>
                    <div className={`player-list ${animateList ? "animate" : ""}`}>
                        {players.length > 0 ? (
                            players.map((player, index) => (
                                <div 
                                    key={player.name} 
                                    className={`player-item ${player.isYou ? 'player-self' : ''}`}
                                >
                                    <div className={`player-avatar ${player.isYou ? 'self-avatar' : ''}`}>
                                        {player.name.charAt(0).toUpperCase()}
                                        {player.isYou && <div className="self-indicator"></div>}
                                    </div>
                                    <span className="player-name">
                                        {player.name}
                                        {player.isYou && <span className="self-label">(You)</span>}
                                    </span>
                                    {player.isLeader && <span className="host-badge">Host</span>}
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <div className="empty-icon"></div>
                                <p>Waiting for players to join...</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="status-message">
                    <p>{getStatusMessage()}</p>
                </div>

                {isHost ? (
                    <div className="button-group">
                        <button 
                            className={`GC-button GC-red-btn ${players.length < 2 ? "disabled" : ""}`} 
                            onClick={handleClick}
                            disabled={players.length < 2}
                        >
                            <span className="GC-button-text">Start Game</span>
                        </button>
                        <button className="GC-button GC-gray-btn" onClick={handleLeave}>
                            <span className="GC-button-text">Disband Lobby</span>
                        </button>
                    </div>
                ) : (
                    <button className="GC-button GC-blue-btn" onClick={handleLeave}>
                        <span className="GC-button-text">Leave Lobby</span>
                    </button>
                )}
            </GlassCard>
        </div>
    );
};

export default LobbyUsers;