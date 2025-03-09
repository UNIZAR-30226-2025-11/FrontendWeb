import React from "react"
import PropTypes from "prop-types"
import Card from "./Card"

import "../styles/card.css"
import { useState } from "react"
import { ips, routes } from "../utils/constants"

/**
 * Defines the HTML for displying a deck of cards.
 * @param {*} cards The array of cards
 * @returns The Deck
 */
const Deck = ({ cards = [] } : { cards: Card[] }) => {
    const [selectedCards, setSelectedCards] = useState<number[]>([])
    const [hoveredCard, setHoveredCard] = useState<Card | null>(null)

    // Basic styles for the main buttons
    let classesPlayButton = "game-button shadow-game"

    // Define the state of the button
    if (selectedCards.length == 0)
        classesPlayButton += " game-button-inactive"
    else
        classesPlayButton += " game-button-active"

    /**
     * Sends the information of the selected cards to the
     * server for making the movement
     */
    const handlePlayClick = async () => {
        // Send the movement
        const response = await fetch(ips.server + routes.play, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id:selectedCards})
        })

        // Check response
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
            {/* Hovered card bigger in the center of the screen */}
            {hoveredCard && hoveredCard.id != -1 && (
                <div className={"big-card shadow-game " + hoveredCard.name} />
            )}

            {/* Buttons */}
            <div className="buttons-div">
                {/* Play button */}
                <button className={classesPlayButton}
                    onClick={handlePlayClick}
                    disabled={selectedCards.length == 0}>
                        PLAY SELECTED CARDS
                </button>
            </div>

            {/* Cards */}
            <div className="cards">
                {cards.map((card:Card, idx) => {
                    return <Card    key={idx}
                                    card={card}
                                    isSelected={selectedCards.includes(card.id)}
                                    onClick={toggleCardSelection}
                                    setHoveredCard={setHoveredCard} />
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
