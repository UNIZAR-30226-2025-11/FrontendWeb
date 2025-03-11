import React from "react"
import "../styles/user.css"

type UserProps = {
    name: string;
    numCards: number;
}

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
const User:React.FC<UserProps> =
({  name="User",
    numCards=0}) =>
{    
    return (
        <div className="div-user shadow-game">
            <img    className="img-user"
                    src="./assets/user.png">
            </img>
            <span className="card-count">
                {numCards}
            </span>
            <p className="name-user">
                {name}
            </p>
        </div>
    )
}

export default User
