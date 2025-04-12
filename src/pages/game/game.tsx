import React, { useRef } from "react";

import User from '../../components/game/User'
import Deck from '../../components/game/CardHand'
import Timer from '../../components/game/Timer';
import PlayedCards from '../../components/game/CardsPlayed';
import CardDeck from '../../components/game/CardDeck';

import Lobby from "../../components/lobby/Lobby";
import LobbyUsers from "../../components/lobby/LobbyUsers";
import WinLose from "../../components/game/WinLose";
import Selection from "../../components/game/SelectUser";
import FutureCards from "../../components/game/FutureCards";
import { CardDeckHandle, SelectionType } from "../../utils/types";
import { SocketContextType, useSocket } from "../../context/SocketContext";

import './game.css'
import toast, { Toaster } from "react-hot-toast";
import { Chat } from "../../components/game/Chat";

/**
 * Game component that renders the main game interface
 * 
 * @returns The Game component
 */
const Game = () => {
    // Import the state of the game
    const socket:SocketContextType = useSocket();

    // For effects in the deck
    const cardDeckRef = useRef<CardDeckHandle>(null);

    /**
     * HTML for render the page in which the user is
     * informed about the winner of the game.
     * 
     * @returns The HTML code for winner information.
     */
    const winnerPage = () => {
        if (socket.winner?.winnerUsername === socket.gameState?.playerUsername)
            return <WinLose win={true}/>
        else
            return <WinLose win={false}/>
    }

    /**
     * Defines the HTML for the board, taking into account
     * the number of users in the game.
     * @returns The necessary HTML for the board
     */
    const HTMLGame = () => {
        // Check the game state is not undefined
        if (socket.gameState === undefined)
            return <></>;

        // Compute the rest of players who are not the user and the turn
        const players = socket.gameState.players.filter(player => player.playerUsername !== socket.gameState!.playerUsername);
        const turn: boolean = socket.gameState.turnUsername === socket.gameState.playerUsername;

        // Check if we have to do a selection
        let selection = undefined;
        if (socket.selectPlayer)
            selection = SelectionType.User;
        else if (socket.selectCardType)
            selection = SelectionType.CardType;
        else
            selection = SelectionType.Card;

        // Print the screen
        return (
            <div className="game-container">
                {/* Top right chat dropdown */}
                <div className="top-chat-section">
                    <Chat />
                </div>

                {/* All players in a single row */}
                <div className="players-row-section">
                    {players.map((player, index) => (
                        <div key={player.playerUsername} className="player-slot">
                            <User player={player} />
                        </div>
                    ))}
                </div>

                {/* Middle section with draw pile and played cards */}
                <div className="middle-cards-section">
                    {/* Draw pile on the left */}
                    <div className="draw-pile">
                        <CardDeck ref={cardDeckRef} />
                    </div>

                    {/* Played card on the right */}
                    <div className="played-pile">
                        <PlayedCards />
                    </div>
                </div>

                {/* Bottom section with player's hand */}
                <div className="bottom-section">
                    {/* Timer - only displayed during player's turn */}
                    
                    <div className="game-timer-slot"> 
                                     
                        {turn && (
                            <Timer 
                                duration={socket.gameState.timeOut/1000} 
                                onTimeUp={() => {console.log("TIMEEER");}} 
                            />
                        )}
                    </div>
                    
                    <div className="game-user-slot">
                        {/* Player's hand */}
                        <Deck />
                    </div>

                </div>
                
                {/* Users selection modal */}
                {(socket.selectPlayer || socket.selectCardType || socket.selectCard || socket.selectNope) && (
                    <Selection />
                )}

                {/* See Future modal */}
                {(socket.cardPlayedResult?.cardsSeeFuture && 
                socket.cardPlayedResult.cardsSeeFuture.length > 0) && (
                    <FutureCards
                        cards={socket.cardPlayedResult.cardsSeeFuture}
                        setCardPlayedResult={socket.setCardPlayedResult}
                    />
                )}
                                        
                {/* For notifications */}
                <Toaster 
                    position="top-right"
                    toastOptions={{
                        className: 'glass-toast',
                        duration: 5000,
                        style: {
                            background: 'rgba(26, 24, 30, 0.85)',
                            color: 'white',
                            border: '1px solid rgba(255, 121, 63, 0.3)',
                        },
                    }}
                />
            </div>
        );
    };

    const HTML = () => {
        // Check if exists a winner in the game
        if (socket.winner)
            return winnerPage();

        // If there is not a gameState, we should display the lobbies
        if (!socket.gameState)
        {
            if (socket.lobbyState && !socket.lobbyState.error)
                return <LobbyUsers />
            else
            {
                if (socket.lobbyCreate && socket.lobbyCreate.error)
                    toast.error(socket.lobbyCreate.errorMsg);
                else if (socket.lobbyEnter && socket.lobbyEnter.error)
                    toast.error(socket.lobbyEnter.errorMsg);
                else if (socket.lobbyState && socket.lobbyState.error)
                    toast.error(socket.lobbyState.errorMsg);

                return <Lobby />
            }
        }

        // Notify actions of other players
        if (socket.actions &&
            !socket.actions.error)
        {
            // Apply effects to the deck
            if (socket.actions.action === "DrawCard")
                cardDeckRef.current?.stealCard();
            else if (socket.actions.action === "ShuffleDeck")
                cardDeckRef.current?.shuffleDeck();

            // Show messages if they are not known by the user
            if (socket.actions.triggerUser !==
                socket.gameState.playerUsername)
            {
                if (socket.actions.targetUser)
                    toast(
                        <div className="toast-message">
                            <strong>{socket.actions.triggerUser}</strong> has done the action{' '}
                            <span className="action-name">{socket.actions.action}</span> to{' '}
                            <strong>{socket.actions.targetUser}</strong>
                        </div>
                    );
                else
                    toast(
                        <div className="toast-message">
                            <strong>{socket.actions.triggerUser}</strong> has done the action{' '}
                            <span className="action-name">{socket.actions.action}</span>
                        </div>
                    );
            }

            socket.setActions(undefined);
        }

        // See Future response
        if (socket.cardPlayedResult)
        {
            // Check if there is an error
            if (socket.cardPlayedResult.error)
            {
                toast.error(socket.cardPlayedResult.errorMsg);
                socket.setCardPlayedResult(undefined);
            }
            else
            {
                // Check if you have received a card
                if (socket.cardPlayedResult.cardReceived.id !== -1)
                {
                    toast(
                        <div className="toast-message">
                            You have received:{' '}
                            <span className="card-received">{socket.cardPlayedResult.cardReceived.type}</span>
                        </div>
                    );
                    socket.setCardPlayedResult(undefined);
                }
            }
        }

        // Default: Show the game state
        return HTMLGame();
    }

    return HTML();
}

export default Game;