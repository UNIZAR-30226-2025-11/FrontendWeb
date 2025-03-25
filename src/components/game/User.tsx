import React from "react"
import './User.css'
import { PlayerJSON } from "../../api/JSON";

/**
 * Defines a User with a name and a specific
 * number of cards.
 * 
 * @param name The name of the user
 * @param numCards The number of cards that the
 *      user has
 * 
 * @returns The user
 */
const User = (
    {  
    player
    } : {
    player:PlayerJSON
    }) =>
{    
    return (
        <div className="div-user shadow-game">
            <img    className="img-user"
                    src="./assets/user.png">
            </img>
            <span className="card-count">
                {player.numCards}
            </span>
            <p className="name-user">
                {player.playerUsername}
            </p>
        </div>
    )
}

export default User
