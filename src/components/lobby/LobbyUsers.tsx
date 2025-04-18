import React, { useState, useEffect } from 'react';
import './LobbyUsers.css';
import { startLobby } from '../../services/socketService';
import { SocketContextType, useSocket } from '../../context/SocketContext';
import GlassCard from '../../common/GlassCard/GlassCard';
import { useUser } from '../../context/UserContext';
import { BackendResponseFriendRequestEnterLobbyJSON, BackendSendConnectedFriendsJSON, FriendSocketJSON, FrontendSendFriendRequestEnterLobbyJSON } from '../../api/JSON';
import { IMAGES_EXTENSION, IMAGES_PATH } from '../../services/apiShop';
import { useNotification } from '../../context/NotificationContext';

const LobbyUsers = () => {
    const socket: SocketContextType = useSocket();
    const [copied, setCopied] = useState(false);
    const [animateList, setAnimateList] = useState(false);
    const [disbandAnimated, setDisbandAnimated] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [loadingFriends, setLoadingFriends] = useState(false);
    const userContext = useUser();
    const background: string = userContext.user?.userPersonalizeData.background || 'default'; // Default background if not set
    const lobbyId = socket.lobbyState?.lobbyId || "";
    const isHost = !!socket.lobbyCreate;
    const players = socket.lobbyState?.players || [];
    const disband = socket.lobbyState?.disband || false;


    const [friends, setFriends] = useState<FriendSocketJSON[]>([]);
    
    const { showToast } = useNotification(); // Assuming you have a toast context or similar for notifications
    

    useEffect(() => {
        fetchFriends();
    }, []);

    // Fetch friends from the socket context
    const fetchFriends = () => {
        setLoadingFriends(true);
        const msg = {error: false, errorMsg: "", lobbyId: lobbyId};
        socket.socket.emit("get-friends-connected", msg, 
            (response: BackendSendConnectedFriendsJSON) => {
            setLoadingFriends(false);
            if (response.error) {
                console.error("Error fetching friends:", response.errorMsg);
                return;
            }
            setFriends(response.connectedFriends);
        })
    }

    // Function to invite a friend to the lobby
    const inviteFriend = (username: string) => {
        const msg: FrontendSendFriendRequestEnterLobbyJSON = {
            error: false,
            errorMsg: "",
            lobbyId: lobbyId,
            friendUsername: username,
        };

        socket.socket.emit("send-friend-join-lobby-request", msg, 
            (response: BackendResponseFriendRequestEnterLobbyJSON) => {
            if (response.error) {
                console.error("Error inviting friend:", response.errorMsg);
                return;
            }
            const friendElement = document.getElementById(`friend-${username}`);
            if (friendElement) {
                const accept: string = response.accept ? "accepted" : "declined";
                showToast({
                    message: `Player ${response.friendUsername} ${accept} your invitation!`,
                    type: "info",
                    duration: 5000,
                });

                friendElement.classList.add('lu-invite-sent');
                setTimeout(() => {
                    if (friendElement) {
                        friendElement.classList.remove('lu-invite-sent');
                    }
                }, 2000);
            }
        });

    }

    // Sort friends: connected (not in game) first, then in-game, then offline
    const sortedFriends = [...friends].sort((a, b) => {
        // First prioritize connection status
        if (a.connected && !b.connected) return -1;
        if (!a.connected && b.connected) return 1;
        
        // Both are connected, prioritize those not in game
        if (a.connected && b.connected) {
            if (a.isInGame && !b.isInGame) return 1;
            if (!a.isInGame && b.isInGame) return -1;
        }
        
        // Default sort by name
        return a.username.localeCompare(b.username);
    });

    useEffect(() => {
        // Trigger animation when players list changes
        fetchFriends();
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
            <div className="lu-lobby-users-wrapper">
                <GlassCard
                    className={`lu-lobby-users-card lu-disband ${disbandAnimated ? "lu-disband-animated" : ""}`}
                    title="Lobby Disbanded"
                    maxwidth="800px"
                    minwidth="600px"
                    showPaws={true}
                    background={background}
                >
                    <div className="lu-disband-content">
                        <div className="lu-disband-icon">
                            <span></span>
                            <span></span>
                        </div>
                        <h3 className="lu-disband-title">The host has disbanded this lobby</h3>
                        <p className="lu-disband-message">You'll be redirected to the main menu shortly...</p>
                        <div className="lu-loading-indicator">
                            <div className="lu-loading-dot"></div>
                            <div className="lu-loading-dot"></div>
                            <div className="lu-loading-dot"></div>
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
        <div className="lu-lobby-users-wrapper">
            <GlassCard
                className="lu-lobby-users-card"
                title="Lobby"
                maxwidth="700px"
                minwidth="600px"
                showPaws={true}
                background={background}
            >
                <div className="lu-lobby-id-container">
                    <h3 className="lu-lobby-id-label">Lobby Code</h3>
                    <div className="lu-lobby-id-value" onClick={copyLobbyId}>
                        <span>{lobbyId || "Loading..."}</span>
                        <div className={`lu-copy-tooltip ${copied ? "show" : ""}`}>
                            {copied ? "Copied!" : "Click to copy"}
                        </div>
                        <button className="lu-copy-button" aria-label="Copy lobby ID">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                                <path fill="none" d="M0 0h24v24H0z"/>
                                <path d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zm2 0h8v10h2V4H9v2z" 
                                      fill="rgba(255,255,255,0.8)"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="lu-players-section">
                    <h3 className="lu-section-label">Players</h3>
                    <div className={`lu-player-list ${animateList ? "animate" : ""}`}>
                        {players.length > 0 ? (
                            players.map((player, index) => (
                                <div 
                                    key={player.name} 
                                    className={`lu-player-item ${player.isYou ? 'lu-player-self' : ''}`}
                                >
                                    <div className={`lu-player-avatar ${player.isYou ? 'lu-self-avatar' : ''}`}>
                                        {player.name.charAt(0).toUpperCase()}
                                        {player.isYou && <div className="lu-self-indicator"></div>}
                                    </div>
                                    <span className="lu-player-name">
                                        {player.name}
                                        {player.isYou && <span className="lu-self-label">(You)</span>}
                                    </span>
                                    {player.isLeader && <span className="lu-host-badge">Host</span>}
                                </div>
                            ))
                        ) : (
                            <div className="lu-empty-state">
                                <div className="lu-empty-icon"></div>
                                <p>Waiting for players to join...</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="lu-friends-section">
                    <div className="lu-friends-header">
                        <h3 className="lu-section-label">Friends</h3>
                        <button 
                            className={`lu-refresh-button ${loadingFriends ? 'rotating' : ''}`} 
                            onClick={fetchFriends}
                            disabled={loadingFriends}
                            aria-label="Refresh friends list"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                                <path fill="none" d="M0 0h24v24H0z"/>
                                <path d="M18.537 19.567A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10c0 2.136-.67 4.116-1.81 5.74L17 12h3a8 8 0 1 0-2.46 5.772l.997 1.795z" 
                                      fill="rgba(255,255,255,0.8)"/>
                            </svg>
                        </button>
                    </div>
                    <div className="lu-friends-list">
                    {sortedFriends.length > 0 ? (
                        sortedFriends.map((friend) => (
                            <div 
                                key={friend.username} 
                                id={`friend-${friend.username}`}
                                className={`lu-friend-item 
                                    ${!friend.connected ? 'lu-offline' : ''} 
                                    ${friend.isInGame ? 'lu-in-game' : ''} 
                                    ${friend.isAlreadyInThisLobby ? 'lu-already-in-lobby' : ''}`}
                            >
                                <div className="lu-friend-avatar">
                                    {friend.avatar ? (
                                        <img 
                                            src={`${IMAGES_PATH}/avatar/${friend.avatar}${IMAGES_EXTENSION}`} 
                                            alt={`${friend.username}'s avatar`} 
                                            className="lu-friend-avatar-img"
                                        />
                                    ) : (
                                        friend.username.charAt(0).toUpperCase()
                                    )}
                                    <div className={`lu-status-indicator ${friend.connected ? (friend.isInGame ? 'busy' : 'online') : 'offline'}`}></div>
                                </div>
                                <div className="lu-friend-info">
                                    <span className="lu-friend-name">{friend.username}</span>
                                    <span className="lu-friend-status">
                                        {!friend.connected && 'Offline'}
                                        {friend.connected && friend.isInGame && 'In Game'}
                                        {friend.connected && !friend.isInGame && !friend.isAlreadyInThisLobby && 'Online'}
                                        {friend.connected && !friend.isInGame && friend.isAlreadyInThisLobby && 'Already in this lobby'}
                                    </span>
                                </div>
                                {friend.connected && !friend.isInGame && !friend.isAlreadyInThisLobby && (
                                    <button 
                                        className="lu-invite-button"
                                        onClick={() => inviteFriend(friend.username)}
                                        aria-label={`Invite ${friend.username}`}
                                    >
                                        <span className="lu-invite-text">Invite</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                                            <path fill="none" d="M0 0h24v24H0z"/>
                                            <path d="M13 10h5l-6 6-6-6h5V3h2v7zm-9 9h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2v7z" 
                                                fill="currentColor"/>
                                        </svg>
                                    </button>
                                )}
                                {friend.connected && !friend.isInGame && friend.isAlreadyInThisLobby && (
                                    <span className="lu-already-in-lobby-badge">
                                        <svg viewBox="0 0 24 24" width="16" height="16">
                                            <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                                        </svg>
                                        In Lobby
                                    </span>
                                )}
                                <div className="lu-invite-success">
                                    <span>Invited!</span>
                                </div>
                            </div>
                        ))
                        ) : (
                            <div className="lu-empty-state">
                                <div className="lu-empty-icon lu-friends-empty"></div>
                                <p>{loadingFriends ? 'Loading friends...' : 'No friends found'}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="lu-status-message">
                    <p>{getStatusMessage()}</p>
                </div>

                {isHost ? (
                    <div className="lu-button-group">
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