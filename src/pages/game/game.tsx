import React, { useState } from "react";

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
import { SelectionType } from "../../utils/types";
import { SocketContextType, useSocket } from "../../context/SocketContext";

import './game.css'

/**
 * Creates a form for the user's logging that
 * takes the information inside it and sends it
 * to the server.
 * 
 * The form asks for username and password.
 * 
 * @returns The form
 */
const Game = () => {

    // Import the state of the game
    const socket:SocketContextType = useSocket();

    /**
     * HTML for render the page in which the user is
     * informed about the winner of the game.
     * 
     * @returns The HTML code for winner information.
     */
    const winnerPage = () => {
        if (socket.winner?.winnerUsername == socket.gameState?.playerUsername)
            return <WinLose win={true}/>
        else
            return <WinLose win={false}/>
    }

    /**
     * HTML for render the page that shows the
     * following cards that are in the Deck after
     * using a See Future card.
     * 
     * @returns The HTML code for See Future card.
     */
    const seeFuture = () => {
        if (socket.cardPlayedResult?.cardsSeeFuture)
            return <FutureCards cards={socket.cardPlayedResult.cardsSeeFuture}
                                setCardPlayedResult={socket.setCardPlayedResult}/>
    }

    /**
     * Defines the HTML for the board, taking into account
     * the number of users in the game.
     * @returns The necessary HTML for the board
     */
    const HTMLGame = () => {
        // Check the game state is not undefined
        if (socket.gameState === undefined)
            return <></>

        // Compute the rest of players who are not the user
        const players = socket.gameState.players.filter(player => player.playerUsername != socket.gameState!.playerUsername)

        const turn: boolean = socket.gameState.turnUsername == socket.gameState.playerUsername

        let selection = undefined;
        if (socket.selectPlayer)
            selection = SelectionType.User;
        else if (socket.selectCardType)
            selection = SelectionType.CardType;
        else
            selection = SelectionType.Card;

        // Print the screen
        return (
            <div className="screen">
                <User   player={players[0]} />

                <div className="div-rest-users">
                    {/* Left user */}
                    { players[1]
                        ? <User player={players[1]}/>
                        : <></>
                    }

                    {/* Cards played */}
                    <PlayedCards />

                    {/* Right user */}
                    { players[2]
                        ? <User player={players[2]}/>
                        : <></>
                    }
                </div>

                {/* Timer */}
                {turn &&
                <Timer duration={socket.gameState.timeOut} onTimeUp={() => {console.log("TIMEEER")}}/>}
                        
                {/* My own cards */}
                <Deck/>
                
                {/* Played cards */}
                <CardDeck/>

                {/* Users selection */}
                { (socket.selectPlayer || socket.selectCardType || socket.selectCard || socket.selectNope) &&
                    <Selection /> }
            </div>
        )

    }

    const HTML = () => {

        if (!socket.gameState)
        {
            if (socket.lobbyState && !socket.lobbyState.error)
                return <LobbyUsers />
            else
            {
                if (socket.lobbyCreate && socket.lobbyCreate.error)
                    alert(socket.lobbyCreate.errorMsg);
                else if (socket.lobbyEnter && socket.lobbyEnter.error)
                    alert(socket.lobbyEnter.errorMsg);
                else if (socket.lobbyState && socket.lobbyState.error)
                    alert(socket.lobbyState.errorMsg);

                return <Lobby />
            }
        }

        // See Future response
        if (socket.cardPlayedResult?.cardsSeeFuture &&
            socket.cardPlayedResult.cardsSeeFuture.length > 0
        )
            return seeFuture();

        // Check if exsits a winner in the game
        if (socket.winner)
            return winnerPage();

        // Default: Show the game state
        return HTMLGame();
    }

    return HTML();
}

export default Game;
