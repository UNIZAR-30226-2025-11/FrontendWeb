import PropTypes from "prop-types"
import Card from "./Card"

const Deck = ({cards}) => {
    return (
        <div className="cards">
            {cards.map((name,idx) => (
                <Card key={idx} name={name} />
            ))}
        </div>
    )
}

Deck.propTypes = {
    cards: PropTypes.array.isRequired
}

export default Deck