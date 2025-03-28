import React, { useState } from 'react';
import './Lobby.css';
import { createLobby, joinLobby } from '../../services/socketService';
import { useSocket } from '../../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/constants';

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

    const buttonClass = (num: number) =>
        `players-button ${num === selectedPlayers ? 'selected' : ''}`;

    return (
        <div className="lobby-container shadow-game">
            <button className="close-button" onClick={handleClose}>
                ×
            </button>

            <div className="lobby-section left">
                <h1>Join</h1>
                <div className="section-content">
                    <input
                        type="text"
                        placeholder="Lobby ID"
                        value={lobbyID}
                        onChange={handleChange}
                        className="input-field"
                    />
                    <button className="action-button" onClick={handleJoin}>
                        Join
                    </button>
                </div>
            </div>

            <div className="lobby-section right">
                <h1>Create</h1>
                <div className="section-content">
                    <div className="players-buttons">
                        {[2, 3, 4].map((num) => (
                            <button
                                key={num}
                                className={buttonClass(num)}
                                onClick={() => setSelectedPlayers(num)}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                    <button className="action-button" onClick={handleCreate}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Lobby;
