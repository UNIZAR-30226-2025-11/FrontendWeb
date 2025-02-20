import PropTypes from "prop-types"
import Card from "./Card"

import "../styles/card.css"
import { useState } from "react"
import { ips, routes } from "../.constants"

/**
 * Defines the HTML for displying a deck of cards.
 * @param {*} cards The array of cards
 * @returns The Deck
 */
const Deck = ({cards = []}) => {
    const [selectedCards, setSelectedCards] = useState([])

    const handlePlayClick = async () => {
        const response = await fetch(ips.server + routes.play, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id:selectedCards})
        })

        if (response.ok)
            console.log("OK play")
        else
            console.log("ERROR play")
    }

    /**
     * Updates the selected state of a card.
     * If is selected, it will not be.
     * If it is not selected, it will be selected.
     * @param {*} id The id of the card
     */
    const toggleCardSelection = (id) => {
        setSelectedCards((prevSelectedCards) =>
          prevSelectedCards.includes(id)
            ? prevSelectedCards.filter((cardId) => cardId !== id) // Si ya está, lo quita
            : [...prevSelectedCards, id] // Si no está, lo añade
        )
    }

    return (
        <div className="deck-div">
            <button className="play-button button"
                onClick={handlePlayClick}
                disabled={selectedCards.length == 0}>
                    Play selected cards
            </button>
            {/* Loop in the cards */}
            <div className="cards">
                {cards.map((card,idx) => {
                    return <Card key={idx} card={card} isSelected={selectedCards.includes(card.id)} onClick={toggleCardSelection} />
                })}
            </div>
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
