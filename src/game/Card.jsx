import PropTypes from "prop-types"

/**
 * Define how to display a card
 * @param {*} card The card to show
 * @returns The card.
 */
const Card = ({card, isSelected, onClick}) => {
    let classes = "card shadow-game " + card.name

    if (isSelected)
        classes += " card-selected "
    else
        classes += ""

    return (
        <div className={classes}
            onClick={() => onClick(card.id)}>
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
    onClick: PropTypes.func.isRequired
}

export default Card
