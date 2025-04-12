import React, { useState } from 'react';
import './Lobby.css';
import { createLobby, joinLobby } from '../../services/socketService';
import { useSocket } from '../../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/constants';
import GlassCard from '../../common/GlassCard/GlassCard';

/**
 * Lobby screen to join or create a lobby.
 */
const Lobby = () => {
    const [lobbyID, setLobbyID] = useState('');
    const [selectedPlayers, setSelectedPlayers] = useState(2);

    const socket = useSocket();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLobbyID(e.target.value);
    };

    const handleClose = () => {
        navigate(routes.gamemenu);
    };

    const handleJoin = () => {
        if (!lobbyID.trim()) {
            alert('Lobby ID cannot be empty');
            setLobbyID('');
            return;
        }
        joinLobby(socket.socket, lobbyID, socket.setLobbyEnter);
    };

    const handleCreate = () => {
        createLobby(socket.socket, selectedPlayers, socket.setLobbyCreate);
    };

    return (
        <div className="lobby-wrapper">
            <GlassCard 
                className="lobby-card" 
                title="Game Lobby" 
                maxwidth="700px"
                minwidth="320px"
                showPaws={false}
            >
                <button className="close-button" onClick={handleClose}>
                    <div className="close-icon">
                        <span></span>
                        <span></span>
                    </div>
                </button>

                <div className="lobby-sections-container">
                    <div className="lobby-section">
                        <h2 className="section-title gradient-text">Join</h2>
                        <div className="section-content">
                            <div className="GC-input-group">
                                <input
                                    type="text"
                                    placeholder="Lobby ID"
                                    value={lobbyID}
                                    onChange={handleChange}
                                    className="lobby-input"
                                />
                            </div>
                            <button className="GC-button GC-blue-btn" onClick={handleJoin}>
                                <span className="GC-button-text">Join Lobby</span>
                            </button>
                        </div>
                    </div>

                    <div className="section-divider">
                        <div className="divider-dot"></div>
                        <div className="divider-line"></div>
                        <div className="divider-dot"></div>
                    </div>

                    <div className="lobby-section">
                        <h2 className="section-title gradient-text">Create</h2>
                        <div className="section-content">
                            <div className="player-selector">
                                <h3>Number of Players</h3>
                                <div className="player-options">
                                    {[2, 3, 4].map((num) => (
                                        <div 
                                            key={num} 
                                            className={`player-option ${num === selectedPlayers ? 'selected' : ''}`}
                                            onClick={() => setSelectedPlayers(num)}
                                        >
                                            <div className="player-icon-container">
                                                {Array(num).fill(0).map((_, i) => (
                                                    <div key={i} className="player-icon"></div>
                                                ))}
                                            </div>
                                            <span className="player-count">{num}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button className="GC-button GC-red-btn" onClick={handleCreate}>
                                <span className="GC-button-text">Create Lobby</span>
                            </button>
                        </div>
                    </div>
                </div>
            </GlassCard>
        </div>
    );
};

export default Lobby;