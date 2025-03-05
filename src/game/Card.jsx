import PropTypes from "prop-types"

/**
 * Define how to display a card
 * @param {*} card The card to show
 * @returns The card.
 */
const Card = ({card, isSelected, onClick, setHoveredCard}) => {
    // Classes that define a card
    let classes = "card shadow-game " + card.name

    // Check if selected
    if (isSelected)
        classes += " card-selected "
    else
        classes += ""

    return (
        // The card
        <div className={classes}
            onClick={() => {
                onClick(card.id)
                setHoveredCard(null)
            }}

            onMouseEnter={() => {
                setHoveredCard(card)
            }}
            
            onMouseLeave={() => {setHoveredCard(null)}}>
        </div>
    )
}

/**
 * Define the propertyes for the parameters
 * of the cards
 */
Card.propTypes = {
    card: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired
    }),
    isSelected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    setHoveredCard: PropTypes.func.isRequired
}

export default Card
