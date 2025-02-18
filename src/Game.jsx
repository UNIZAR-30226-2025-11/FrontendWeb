import "./styles/LogIn.css"
import User from "./game/User";
import PropTypes from "prop-types";

import "./styles/game.css"
import Deck from "./game/Deck";

/**
 * Creates a form for the user's logging that
 * takes the information inside it and sends it
 * to the server.
 * 
 * The form asks for username and password.
 * 
 * @returns The form
 */
const Game = ({users, cards}) => {
    

    const HTMLUsers = () => {
        if (users.length == 1)
        {
            return (
                <div className="screen">
                    <User name={users[0]} cards={[1,2,3]} />
                    <Deck cards={cards} />
                </div>
            )
        }
        else
        {
            return (
                <div className="screen">
                    <User name={users[0]} cards={[1,2,3,4,5,6]} />
                    <div className="div-rest-users">
                        {users.slice(1).map((user,idx) => (
                            <User key={idx} name={user} cards={[1,2,3]} />
                        ))}  
                    </div>

                    <Deck cards={cards} />
                </div>
            )
        }
    }

    return HTMLUsers();
}

Game.propTypes = {
    users: PropTypes.array.isRequired,
    cards: PropTypes.array.isRequired
}

export default Game;
