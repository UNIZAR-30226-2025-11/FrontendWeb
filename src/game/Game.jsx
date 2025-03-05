import React from "react";
import {ips, routes} from "../.constants"
import { useEffect, useState } from "react";

import User from "./User";
import Deck from "./Deck";

import "../styles/game.css"

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
    const [gameState, setGameState] = useState({
        players: [],
        cards: []
    })

    /**
     * Load the board when the game is started
     */
    useEffect(() => {
        fetch(ips.server + routes.game)
          .then((response) => {
            if (!response.ok) {
                throw new Error('HTTP Error: Status ${respone.status}')
            }

            return response.json()
          })
          .then((data) => setGameState(data))
          .catch((error) => console.error("Error:", error));
      }, []);

    /**
     * Defines the HTML for the board, taking into account
     * the number of users in the game.
     * @returns The necessary HTML for the board
     */
    const HTMLUsers = () => {
        // Check the number of players
        if (gameState.players.length == 1)
        { // Two players in the game
            return (
                <div className="screen">
                    <User   name={gameState.players[0]?.username}
                            numCards={gameState.players[0]?.numCards} />
                    <Deck cards={gameState.cards} />
                </div>
            )
        }
        else // 3 or 4 players in the game
        {
            return (
                <div className="screen app-container">
                    {/* Highest user in the screen */}
                    <User   name={gameState.players[0]?.username}
                            numCards={gameState.players[0]?.numCards} />

                    {/* The rest of users */}
                    <div className="div-rest-users">
                        {gameState.players.slice(1).map((user,idx) => (
                            <User   key={idx}
                                    name={gameState.players[idx+1]?.username}
                                    numCards={gameState.players[idx+1]?.numCards} />
                        ))}
                    </div>

                    {/* My own cards */}
                    <Deck cards={gameState.cards} />

                </div>
            )
        }
    }

    return HTMLUsers();
}

export default Game;
