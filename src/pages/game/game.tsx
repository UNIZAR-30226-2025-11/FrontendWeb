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
import { useNavigate } from "react-router-dom";
import WinLose from "../../components/game/WinLose";
import SelectUser from "../../components/game/SelectUser";

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
    const { gameState,
            lobbyCreate, setLobbyCreate,
            lobbyEnter, setLobbyEnter,
            lobbyState,
            lobbyStart, setLobbyStart,
            lobbyStarted,
            cardPlayedResult, setCardPlayedResult,
            winner,
            selectPlayer, setSelectPlayer,
            selectCardType, setSelectCardType } = useSocketHandlers()

    // Define variables for lobbies
    const [lobbyVisible, setLobbyVisible] = useState(true);
    const [lobbyListVisible, setLobbyListVisible] = useState(false);

    /**
     * Defines the HTML for the board, taking into account
     * the number of users in the game.
     * @returns The necessary HTML for the board
     */
    const HTMLUsers = () => {

        // Check if the user has to decide the lobby
        if (!lobbyStart && !lobbyStarted && lobbyVisible)
        {
            return <Lobby   setLobbyVisible={setLobbyVisible}
                            setLobbyListVisible={setLobbyListVisible}
                            setLobbyCreate={setLobbyCreate}
                            setLobbyEnter={setLobbyEnter} />
        }

        // Check if the user is waiting for the start of the game
        if (!lobbyStart && !lobbyStarted && lobbyListVisible)
        {
            console.log("LOBBY ENTER:", lobbyEnter)
            return <LobbyUsers  lobbyCreate={lobbyCreate}
                                lobbyEnter={lobbyEnter}
                                lobbyState={lobbyState}
                                setLobbyStart={setLobbyStart}/>
        }

        // Check the game state is not undefined
        if (!gameState)
            return <></>

        if (winner)
        if (winner.winnerUsername == gameState.playerUsername)
            return <WinLose win={true}/>
        else if (winner.winnerUsername != gameState.playerUsername)
            return <WinLose win={false}/>

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

    return HTMLUsers();
}

export default Game;
