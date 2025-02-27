import {ips, routes} from "../.constants"
import { useEffect, useState } from "react";

import User from "./User";
import Deck from "./Deck";
import Timer from "./Timer";

import "../styles/game.css"
import CardStack from "./CardStack";

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
        switch (gameState.players.length)
        {
            case 1:
                return (
                    <div className="screen">
                        <User   name={gameState.players[0]?.username}
                                numCards={gameState.players[0]?.numCards} />
                        <Deck cards={gameState.cards} />
                    </div>
                )
            case 2:
            {
                return (
                    <div className="screen app-container">
                        {/* Highest user in the screen */}
                        <User   name={gameState.players[0]?.username}
                                numCards={gameState.players[0]?.numCards} />
    
                        {/* The rest of users */}
                        <div className="div-rest-users">
                            {/* Left user */}
                            <User   name={gameState.players[1]?.username}
                                    numCards={gameState.players[1]?.numCards} />

                            {/* Cards played */}
                            <CardStack />

                            {/* Empty div for centering the stack */}
                            <div></div>
                        </div>

                        {/* My own cards */}
                        <Deck cards={gameState.cards} />
    
                    </div>
                )
            }
            case 3:
            {
                return (
                    <div className="screen app-container">
                        {/* Highest user in the screen */}
                        <User   name={gameState.players[0]?.username}
                                numCards={gameState.players[0]?.numCards} />
    
                        {/* The rest of users */}
                        <div className="div-rest-users">
                            {/* Left user */}
                            <User   name={gameState.players[1]?.username}
                                    numCards={gameState.players[1]?.numCards} />

                            {/* Cards played */}
                            <CardStack />

                            {/* Right user */}
                            <User   name={gameState.players[2]?.username}
                                    numCards={gameState.players[2]?.numCards} />
                        </div>

                        <Timer />

                        {/* My own cards */}
                        <Deck cards={gameState.cards} />
    
                    </div>
                )
            }
        }
    }

    return HTMLUsers();
}

export default Game;
