import React, { useEffect, useRef } from "react";

// ... other imports ...
import User from '../../components/game/User'
// Assuming Deck is the CardHand component
import Deck from '../../components/game/CardHand'
import Timer from '../../components/game/Timer';
import PlayedCards from '../../components/game/CardsPlayed';
import CardDeck from '../../components/game/CardDeck';
import Lobby from "../../components/lobby/Lobby";
import LobbyUsers from "../../components/lobby/LobbyUsers";
import WinLose from "../../components/game/WinLose";
import Selection from "../../components/game/Select";
import FutureCards from "../../components/game/FutureCards";
import { CardDeckHandle } from "../../utils/types";
import { SocketContextType, useSocket } from "../../context/SocketContext";
import './game.css' // Main game styles
import toast, { Toaster } from "react-hot-toast";
import { Chat } from "../../components/game/Chat";
// Ensure component CSS is imported if not globally handled
// import '../../components/game/CardHand.css'; // Example if needed

const Game = () => {
    const socket: SocketContextType = useSocket();
    const cardDeckRef = useRef<CardDeckHandle>(null);

    const isDead = socket.gameState?.players.find(player => player.playerUsername === socket.gameState!.playerUsername)?.active === false; // Check if the current user is dead

    // --- Side Effect Handlers using useEffect ---

    const handleDisconnect = (lobbyId: string): void => {
        // Show a toast notification when the user disconnects
        toast.error("You have been disconnected from the game.");

        socket.leaveGame(lobbyId); // Leave the game

        window.location.reload(); // Reload the page to reset the state
    }

    // Effect for handling Lobby related errors/state changes
    useEffect(() => {
        // Only show errors if not in a game state and not already in a lobby view
        if (!socket.gameState && !(socket.lobbyState && !socket.lobbyState.error)) {
            if (socket.lobbyCreate?.error) {
                toast.error(socket.lobbyCreate.errorMsg);
                socket.setLobbyCreate(undefined);
            } else if (socket.lobbyEnter?.error) {
                toast.error(socket.lobbyEnter.errorMsg);
                socket.setLobbyEnter(undefined);
            } else if (socket.lobbyState?.error) {
                toast.error(socket.lobbyState.errorMsg);
                socket.setLobbyState(undefined);
            }
        }
    }, [socket.gameState, socket.lobbyCreate, socket.lobbyEnter, socket.lobbyState]); // Dependencies: relevant states

    // Effect for handling incoming actions
    useEffect(() => {
        if (socket.actions && !socket.actions.error && socket.gameState) { // Ensure gameState exists
            // Apply effects to the deck
            if (socket.actions.action === "DrawCard") {
                cardDeckRef.current?.stealCard();
            } else if (socket.actions.action === "ShuffleDeck") {
                cardDeckRef.current?.shuffleDeck();
            }

            // Show messages if they are not triggered by the current user
            if (socket.actions.triggerUser !== socket.gameState.playerUsername) {
                const message = (
                    <div className="toast-message"> {/* Use class from game.css */}
                        <b>{socket.actions.triggerUser}</b> has done the action{' '}
                        <span className="action-name">{socket.actions.action}</span> {/* Use class from game.css */}
                        {socket.actions.targetUser ? ` to ${socket.actions.targetUser}` : ''}
                    </div>
                );
                toast(message);
            }

            // Clear the action state after processing
            socket.setActions(undefined);
        }
    }, [socket.actions, socket.setActions, socket.gameState]); // Dependencies: actions, setter, gameState

    // Effect for handling card played results
    useEffect(() => {
        if (socket.cardPlayedResult) {
            if (socket.cardPlayedResult.error) {
                toast.error(socket.cardPlayedResult.errorMsg);
                // Clear the result state after showing error
                socket.setCardPlayedResult(undefined);
            } else {
                // Check if a card was received (and it's not the "See Future" case being handled by the modal)
                if (socket.cardPlayedResult.cardReceived?.id !== -1 && !socket.cardPlayedResult.cardsSeeFuture?.length) {
                    if(socket.cardPlayedResult.cardReceived.type !== "Bomb")
                    {
                        toast(
                            <div className="toast-message"> {/* Use class from game.css */}
                                You have received:{' '}
                                <span className="card-received">{socket.cardPlayedResult.cardReceived.type}</span> {/* Use class from game.css */}
                            </div>
                        );
                    }
                    else
                    {
                        // Create a bomb explosion animation when player receives a bomb
                        const explosionElement = document.createElement('div');
                        explosionElement.className = 'bomb-explosion';
                        document.body.appendChild(explosionElement);
                        
                        // Show a dramatic toast notification
                        toast(
                            <div className="toast-message bomb-message">
                                <span className="bomb-icon">💣</span>
                                <span className="bomb-text">BOOM! You&apos;ve been bombed!</span>
                            </div>,
                            {
                                duration: 3000,
                                style: {
                                    background: 'rgba(220, 38, 38, 0.9)',
                                    color: 'white',
                                    border: '1px solid rgba(255, 255, 255, 0.3)',
                                }
                            }
                        );
                        
                        // Add screen shake effect
                        const gameContainer = document.querySelector('.game-container');
                        if (gameContainer) {
                            gameContainer.classList.add('screen-shake');
                            setTimeout(() => {
                                gameContainer.classList.remove('screen-shake');
                            }, 1000);
                        }
                        
                        // Remove explosion element after animation completes
                        setTimeout(() => {
                            if (document.body.contains(explosionElement)) {
                                document.body.removeChild(explosionElement);
                            }
                        }, 1500);
                        
                        // Clear the card played result state
                        socket.setCardPlayedResult(undefined);
                    }

                    // Clear the result state after showing toast (unless it's See Future)
                    socket.setCardPlayedResult(undefined);
                }
                // Note: The FutureCards component itself handles clearing the state when it closes.
            }
        }
    }, [socket.cardPlayedResult, socket.setCardPlayedResult]); // Dependencies: result, setter

    // --- Render Functions ---

    const HTMLGame = () => {
        // This function renders the main game board structure
        if (socket.gameState === undefined) return <></>; // Should not happen if called correctly

        const players = socket.gameState.players.filter(player => player.playerUsername !== socket.gameState!.playerUsername);
        const turn: boolean = socket.gameState.turnUsername === socket.gameState.playerUsername;
        const lobbyId: string = socket.gameState.lobbyId;
        return (
            <div className={`game-container${isDead ? ' dead-game-container' : ''}`}>
                {/* Dead overlay/message */}
                {isDead && (
                    <div className="dead-game-overlay">
                        <div className="dead-game-message">
                            <span className="dead-game-icon">💀</span>
                            <span>You are dead!</span>
                        </div>
                    </div>
                )}
                {/* ...rest of your game UI... */}                {/* Top right chat dropdown */}
                <div className="top-chat-section">
                    <Chat />
                </div>
                {/* Leave game button positioned in top left corner */}
                <button className="leave-game-button" onClick={() => {handleDisconnect(lobbyId)}}>
                    <span className="leave-icon">⬅️</span>
                    Leave Game
                </button>
                {/* All players in a single row */}
                <div className="players-row-section"> {/* Use class from game.css */}
                    {players.map((player) => (
                        <div
                            key={player.playerUsername}
                            // Apply classes for player slot and active turn highlighting
                            className={`player-slot ${player.playerUsername === socket.gameState?.turnUsername ? 'active-turn' : ''}`}
                        >
                            <User 
                                player={player}
                                isTurn={player.playerUsername === socket.gameState?.turnUsername} 
                                turnsLeft={player.playerUsername === socket.gameState?.turnUsername ? socket.gameState?.turnsLeft : 0}
                            />
                        </div>
                    ))}
                </div>

                {/* Middle section with draw pile and played cards */}
                <div className="middle-cards-section"> {/* Use class from game.css */}
                    <div className="draw-pile"> {/* Use class from game.css */}
                        <CardDeck ref={cardDeckRef} />
                    </div>
                    <div className="played-pile"> {/* Use class from game.css */}
                        <PlayedCards />
                    </div>
                </div>

                {/* Bottom section with timer/turn message and player's hand */}
                <div className="bottom-section"> {/* Use class from game.css */}
                     {/* Slot for Timer and Turn Message */}
                     <div className="game-timer-slot"> {/* Use class from game.css */}
                        {/* Wrapper for Timer and Turn Message (used for layout) */}
                        <div className="timer-wrapper"> {/* Use class from game.css */}
                                {/* Display "Your Turn" message */}
                                {turn && <div className="your-turn-message"> {/* Use class from game.css */}
                                    <span className="turn-icon">🎮</span> {/* Use class from game.css */}
                                    <span>Your Turn!</span>
                                </div>}
                                {/* Display Timer */}
                                <Timer
                                    key={socket.gameState.turnUsername + socket.gameState.turnsLeft} // Add key to force re-render on turn change
                                    duration={socket.gameState.timeOut/1000}
                                    onTimeUp={() => {console.log("TIMER ENDED");}} // Add actual logic if needed
                                />
                        </div>
                    </div>
                    {/* Slot for the Player's Hand */}
                    <div className="game-user-slot"> {/* Use class from game.css */}
                        {/* Deck component is the CardHand */}
                        <Deck />
                    </div>
                </div>

                {/* Modals - Rendered conditionally outside the main layout flow */}
                {(socket.selectPlayer || socket.selectCardType || socket.selectCard || socket.selectNope) && (
                    <Selection />
                )}
                {(socket.cardPlayedResult?.cardsSeeFuture && socket.cardPlayedResult.cardsSeeFuture.length > 0) && (
                    <FutureCards
                        cards={socket.cardPlayedResult.cardsSeeFuture}
                        setCardPlayedResult={socket.setCardPlayedResult} // Pass setter to modal
                    />
                )}

                {/* Toast Container - Positioned via props */}
                <Toaster
                    position="top-left"
                    toastOptions={{
                        className: 'glass-toast', // Use class from game.css
                        duration: 5000,
                        style: {
                            background: 'rgba(26, 24, 30, 0.85)',
                            color: 'white',
                            border: '1px solid rgba(255, 121, 63, 0.3)',
                        },
                    }}
                    containerStyle={{
                        top: 80, // Position below potential header
                        left: 20,
                        bottom: 20,
                        right: 20,
                    }}
                />
            </div>
        );
    };

    // Main render logic - Decides what high-level component to show
    const renderContent = () => {
        if (socket.winner) {
            return <WinLose/>; // Show Win/Lose screen
        }

        if (!socket.gameState) {
            // Lobby state errors are handled by useEffect now
            if (socket.lobbyState && !socket.lobbyState.error) {
                return <LobbyUsers />; // Show Lobby Users screen
            } else {
                return <Lobby />; // Show Lobby Join/Create screen
            }
        }

        // Game state exists, render the main game board
        return HTMLGame();
    }

    // Render the decided content
    return renderContent();
}

export default Game;