import "./styles/LogIn.css"
import User from "./game/User";

import "./styles/game.css"
import Deck from "./game/Deck";
import {ips, routes} from "./.constants"
import { useEffect, useState } from "react";

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
    const [state, setState] = useState({
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
          .then((data) => setState(data))
          .catch((error) => console.error("Error:", error));
      }, []);   
    
    
      /**
       * Defines the HTML for the board, taking into account
       * the number of users in the game.
       * @returns The necessary HTML for the board
       */
    const HTMLUsers = () => {
        // Check the number of players
        if (state.players.length == 1)
        { // Two players in the game
            return (
                <div className="screen">
                    <User   name={state.players[0]?.username}
                            numCards={state.players[0]?.numCards} />
                    <Deck cards={state.cards} />
                </div>
            )
        }
        else // 3 or 4 players in the game
        {
            return (
                <div className="screen">
                    {/* Highest user in the screen */}
                    <User   name={state.players[0]?.username}
                            numCards={state.players[0]?.numCards} />

                    {/* The rest of users */}
                    <div className="div-rest-users">
                        {state.players.slice(1).map((user,idx) => (
                            <User   key={idx}
                                    name={state.players[idx+1]?.username}
                                    numCards={state.players[idx+1]?.numCards} />
                        ))}  
                    </div>

                    {/* My own cards */}
                    <Deck cards={state.cards} />
                </div>
            )
        }
    }

    return HTMLUsers();
}

export default Game;
