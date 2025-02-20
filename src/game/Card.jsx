import PropTypes from "prop-types"
import "../styles/Card.css"

/**
 * Define how to display a card
 * @param {*} name The name of the card
 * @returns The card.
 */
const Card = ({name}) => {
    return (
        <div className="card">
            <p>{name}</p>
        </div>
    )
}

/**
 * Define the propertyes for the parameters
 * of the cards
 */
Card.propTypes = {
    name: PropTypes.string
}

export default Card
