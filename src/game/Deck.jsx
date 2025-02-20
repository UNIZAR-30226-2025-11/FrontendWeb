import PropTypes from "prop-types"
import Card from "./Card"

/**
 * Defines the HTML for displying a deck of cards.
 * @param {*} cards The array of cards
 * @returns The Deck
 */
const Deck = ({cards = []}) => {
    return (
        // Loop in the cards
        <div className="cards">
            {cards.map((card,idx) => {
                return <Card key={idx} name={card.name} />
            })}
        </div>
    )
}

/**
 * Define the propierties that the parameters
 * of the component must have.
 */
Deck.propTypes = {
    cards: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            id: PropTypes.number.isRequired
        })
    ).isRequired
}

export default Deck
