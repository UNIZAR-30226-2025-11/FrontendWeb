import React from "react";
import {ips, routes} from "../../utils/constants"
import { useEffect, useState } from "react";

import User from '../../components/game/User'
import Deck from '../../components/game/CardHand'
import Timer from '../../components/game/Timer';
import PlayedCards from '../../components/game/CardsPlayed';
import CardDeck from '../../components/game/CardDeck';

import './game.css'
import { useSocketHandlers } from "../../hooks/useSocket";

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
    /**
     * State of the game: Users in the game and the
     * cards of the main user.
     */
    const { gameState } = useSocketHandlers()

    /**
     * Defines the HTML for the board, taking into account
     * the number of users in the game.
     * @returns The necessary HTML for the board
     */
    const HTMLUsers = () => {
        // Check the game state is not undefined
        if (!gameState)
            return <></>
        
        // Check the number of players
        switch (gameState.players.length)
        {
            case 1:
                return (
                    <div className="screen">
                        <User   name={String(gameState.players[0]?.id)}
                                numCards={gameState.players[0]?.numCards} />
                        <Deck cards={JSON.parse(gameState.playerCards)} />
                    </div>
                )
            case 2:
            {
                return (
                    <div className="screen app-container">
                        {/* Highest user in the screen */}
                        <User   name={String(gameState.players[0]?.id)}
                                numCards={gameState.players[0]?.numCards} />
    
                        {/* The rest of users */}
                        <div className="div-rest-users">
                            {/* Left user */}
                            <User   name={String(gameState.players[1]?.id)}
                                    numCards={gameState.players[1]?.numCards} />

                            {/* Cards played */}
                            <CardDeck />
                            <PlayedCards />

                            {/* Empty div for centering the stack */}
                            <div></div>
                        </div>

                        {/* My own cards */}
                        <Deck cards={JSON.parse(gameState.playerCards)} />
    
                    </div>
                )
            }
            case 3:
            {
                return (
                    <div className="screen app-container">
                        {/* Highest user in the screen */}
                        <User   name={String(gameState.players[0]?.id)}
                                numCards={gameState.players[0]?.numCards} />
    
                        {/* The rest of users */}
                        <div className="div-rest-users">
                            {/* Left user */}
                            <User   name={String(gameState.players[1]?.id)}
                                    numCards={gameState.players[1]?.numCards} />

                            {/* Cards for stealing */}

                            {/* Cards played */}
                            <PlayedCards />

                            {/* Right user */}
                            <User   name={String(gameState.players[2]?.id)}
                                    numCards={gameState.players[2]?.numCards} />
                        </div>

                        <Timer duration={30} onTimeUp={() => {console.log("TIMEEER")}}/>

                        {/* My own cards */}
                        <Deck cards={JSON.parse(gameState.playerCards)} />

                        <CardDeck />

                    </div>
                )
            }
        }
    }

    return HTMLUsers();
}

export default Game;
