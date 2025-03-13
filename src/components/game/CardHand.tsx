import React from "react"
import Card from "./Card"

import { useState } from "react"
import { playCard } from "../../services/socketService"
import { useSocket } from "../../context/SocketContext"
import { BackendGamePlayedCardsResponseJSON } from "../../api/JSON"
import * as Objects from "../../utils/types"

import "./CardHand.css"

/**
 * Defines the HTML for displying a deck of cards.
 * @param cards The array of cards
 * @returns The Deck
 */
const Deck = ({ cards = [] } : { cards: string[] }) => {
    const [selectedCards, setSelectedCards] = useState<number[]>([])
    const [hoveredCard, setHoveredCard] = useState<Objects.Card | null>(null)

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

    }

    /**
     * Updates the selected state of a card.
     * If is selected, it will not be.
     * If it is not selected, it will be selected.
     * @param id The id of the card
     */
    const toggleCardSelection = (id:number) => {
        setSelectedCards((prevSelectedCards) =>
          prevSelectedCards.includes(id)
            ? prevSelectedCards.filter((cardId) => cardId !== id) // Si ya está, lo quita
            : [...prevSelectedCards, id] // Si no está, lo añade
        )
    }

    console.log(cards)

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
                {cards.map((card, idx) => {
                    return <Card    key={idx}
                                    card={card}
                                    isSelected={selectedCards.includes(0)}
                                    // onClick={toggleCardSelection}
                                    // setHoveredCard={setHoveredCard}
                                    />
                })}
            </div>
        </div>
    )
}

export default Deck
