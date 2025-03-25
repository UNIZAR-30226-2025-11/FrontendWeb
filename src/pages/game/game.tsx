import React, { useState } from "react";

import User from '../../components/game/User'
import Deck from '../../components/game/CardHand'
import Timer from '../../components/game/Timer';
import PlayedCards from '../../components/game/CardsPlayed';
import CardDeck from '../../components/game/CardDeck';

import './game.css'
import { useSocketHandlers } from "../../hooks/useSocket";
import Lobby from "../../components/lobby/Lobby";
import LobbyUsers from "../../components/lobby/LobbyUsers";
import WinLose from "../../components/game/WinLose";
import SelectUser from "../../components/game/SelectUser";
import FutureCards from "../../components/game/FutureCards";

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
    const { 
        lobbyCreate, setLobbyCreate,
        lobbyEnter, setLobbyEnter,
        lobbyStart, setLobbyStart,
        lobbyState,
        lobbyStarted,
        gameState,
        cardPlayedResult, setCardPlayedResult,
        selectPlayer, setSelectPlayer,
        selectCardType, setSelectCardType,
        selectCard, setSelectCard,
        selectNope, setSelectNope,
        winner,
        disconnect,
        messagesChat,
        actions
    } = useSocketHandlers();

    // Define variables for lobbies
    const [lobbyVisible, setLobbyVisible] = useState(true);
    const [lobbyListVisible, setLobbyListVisible] = useState(false);

    /**
     * HTML for render the lobby page in which the
     * user is asked for Joining a lobby or Creating
     * a new one.
     * 
     * @returns The HTML code for lobby selection.
     */
    const lobbyType = () => {
        return <Lobby   setLobbyVisible={setLobbyVisible}
                        setLobbyListVisible={setLobbyListVisible}
                        setLobbyCreate={setLobbyCreate}
                        setLobbyEnter={setLobbyEnter} />
    }

    /**
     * HTML for render the lobby information with
     * the users that are already in one lobby.
     * 
     * @returns The HTML code for lobby information.
     */
    const lobbyUsers = () => {
        return <LobbyUsers  lobbyCreate={lobbyCreate}
                            lobbyEnter={lobbyEnter}
                            lobbyState={lobbyState}
                            setLobbyStart={setLobbyStart}/>
    }

    /**
     * HTML for render the page in which the user is
     * informed about the winner of the game.
     * 
     * @returns The HTML code for winner information.
     */
    const winnerPage = () => {
        if (winner?.winnerUsername == gameState?.playerUsername)
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
        if (cardPlayedResult?.cardsSeeFuture)
            return <FutureCards cards={cardPlayedResult.cardsSeeFuture}
                                setCardPlayedResult={setCardPlayedResult}/>
    }

    /**
     * Defines the HTML for the board, taking into account
     * the number of users in the game.
     * @returns The necessary HTML for the board
     */
    const HTMLGame = () => {
        // Check the game state is not undefined
        if (!gameState)
            return <></>

        // Compute the rest of players who are not the user
        const players = gameState.players.filter(player => player.playerUsername != gameState.playerUsername)
    
        const lobbyId = lobbyCreate?.lobbyId || 
                        lobbyEnter?.lobbyId ||
                        ""

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
                { gameState.turnUsername == gameState.playerUsername &&
                <Timer duration={gameState.timeOut} onTimeUp={() => {console.log("TIMEEER")}}/>}
                        
                {/* My own cards */}
                <Deck   cards={gameState.playerCards}
                        lobbyID={lobbyId}
                        setCardPlayedResult={setCardPlayedResult}
                        turn={gameState.playerUsername == gameState.turnUsername} />
                
                {/* Played cards */}
                <CardDeck   lobbyID={lobbyId}
                            setCardPlayedResult={setCardPlayedResult}
                            active={gameState.turnUsername == gameState.playerUsername}/>

                {/* Users selection */}
                { (selectPlayer || selectCardType) &&
                    <SelectUser gameState={gameState}
                                lobbyID={lobbyId}
                                setSelectPlayer={setSelectPlayer}
                                setSelectCardType={setSelectCardType}
                                isPlayers={selectPlayer != undefined}/> }
            </div>
        )

    }

    const HTML = () => {
        // Check if the user has to decide the lobby
        if (!lobbyStart && !lobbyStarted && lobbyVisible)
            return lobbyType();

        // Check if the user is waiting for the start of the game
        if (!lobbyStart && !lobbyStarted && lobbyListVisible)
            return lobbyUsers();

        // See Future response
        if (cardPlayedResult?.cardsSeeFuture != undefined &&
            cardPlayedResult.cardsSeeFuture.length > 0
        )
            return seeFuture();

        // Check if exsits a winner in the game
        if (winner)
            return winnerPage();

        // Default: Show the game state
        return HTMLGame();
    }

    return HTML();
}

export default Game;
