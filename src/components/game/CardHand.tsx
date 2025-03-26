import React, { use } from "react"
import Card from "./Card"

import { useState } from "react"
import { playCards } from "../../services/socketService"
import { SocketContextType, useSocket } from "../../context/SocketContext"
import * as Objects from "../../api/JSON"

import "./CardHand.css"

/**
 * Defines the HTML for displying a deck of cards.
 * @param cards The array of cards
 * @returns The Deck
 */
const Deck = (
    {} : {}
) => {
    
    const [selectedCards, setSelectedCards] = useState<number[]>([])
    const [hoveredCard, setHoveredCard] = useState<string | null>(null)
    const socket:SocketContextType = useSocket();

    const turn:boolean = socket.gameState?.playerUsername === socket.gameState?.turnUsername
    const lobbyID:string = socket.gameState?.lobbyId!
    const cards = socket.gameState?.playerCards || [];

    // Basic styles for the main buttons
    let classesPlayButton = "game-button shadow-game"

    // Define the state of the button
    if (selectedCards.length == 0 || !turn)
        classesPlayButton += " game-button-inactive"
    else
        classesPlayButton += " game-button-active"


    /**
     * Sends the information of the selected cards to the
     * server for making the movement
     */
    const handlePlayClick = async () => {
        playCards(  socket.socket,
                    selectedCards.map(id => cards[id]),
                    lobbyID,
                    socket.setCardPlayedResult)
        setSelectedCards([])
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
            {hoveredCard && (
                <img    src={"assets/cards/" + hoveredCard + ".jpg"}
                        className={"big-card shadow-game"} />
            )}

            {/* Buttons */}
            <div className="buttons-div">
                {/* Play button */}
                <button className={classesPlayButton}
                    onClick={handlePlayClick}
                    disabled={!turn || selectedCards.length == 0}>
                        PLAY SELECTED CARDS
                </button>
            </div>

            {/* Cards */}
            <div className="cards">
                {cards.map((card, idx) => {
                    return <Card    key={idx}
                                    card={card}
                                    id={idx}
                                    isSelected={selectedCards.includes(idx)}
                                    onClick={toggleCardSelection}
                                    setHoveredCard={setHoveredCard}
                                    />
                })}
            </div>
        </div>
    )
}

export default Deck
