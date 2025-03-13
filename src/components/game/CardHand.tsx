import React from "react"
import Card from "./Card"

import { useState } from "react"
import { playCard } from "../../services/socketService"
import { useSocket } from "../../context/SocketContext"
import { BackendGamePlayedCardsResponseJSON } from "../../api/JSON"
import { useSocketHandlers } from "../../hooks/useSocket"
import * as Objects from "../../utils/types"

import "./CardHand.css"

/**
 * Defines the HTML for displying a deck of cards.
 * @param cards The array of cards
 * @returns The Deck
 */
const Deck = ({ cards = [] } : { cards: Objects.Card[] }) => {
    const [selectedCards, setSelectedCards] = useState<number[]>([])
    const [hoveredCard, setHoveredCard] = useState<Objects.Card | null>(null)

    const { lobbyStartId } = useSocketHandlers()

    // Basic styles for the main buttons
    let classesPlayButton = "game-button shadow-game"

    // Define the state of the button
    if (selectedCards.length == 0)
        classesPlayButton += " game-button-inactive"
    else
        classesPlayButton += " game-button-active"


    /**
     * Check if there is an error in the sever answer and
     * display it on the console
     * 
     * @param data The answer of the server
     */
    const checkResponse = (data:BackendGamePlayedCardsResponseJSON) => {
        if (data.error)
        {
            console.log("There is an error with the played cards")
            console.log(data.errorMsg)
        }
    }

    /**
     * Sends the information of the selected cards to the
     * server for making the movement
     */
    const handlePlayClick = async () => {
        const socket = useSocket()
        if (lobbyStartId?.playerId) 
        {
            playCard(socket, JSON.stringify(selectedCards), lobbyStartId.lobbyId, checkResponse)
        }
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
                {cards.map((card:Objects.Card, idx) => {
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

export default Deck
