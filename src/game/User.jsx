import PropTypes from "prop-types"
import "../styles/user.css"

const User = ({name="User", numCards=0}) => {    
    return (
        <div className="div-user">
            <p className="name-user">
                {name}
            </p>
            <p className="number-cards">
                {numCards} cards
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