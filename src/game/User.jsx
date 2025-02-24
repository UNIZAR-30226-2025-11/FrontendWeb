import PropTypes from "prop-types"
import "../styles/user.css"

const User = ({name="User", numCards=0}) => {    
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

/**
 * Define the properties that the arguments
 * must have.
 */
User.propTypes = {
    name: PropTypes.string,
    numCards: PropTypes.number
}

export default User