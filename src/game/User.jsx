import PropTypes from "prop-types"
import "../styles/user.css"

const User = ({name, cards}) => {    
    return (
        <div className="div-user">
            <p className="name-user">
                {name}
            </p>
            <p className="number-cards">
                {cards.length} cards
            </p>
        </div>
    )
}

/**
 * Define the properties that the arguments
 * must have.
 */
User.propTypes = {
    name: PropTypes.string.isRequired,
    cards: PropTypes.array.isRequired
}

export default User