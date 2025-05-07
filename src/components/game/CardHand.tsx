import React, { useState, useRef } from "react";
import Card from "./Card";
import { playCards } from "../../services/socketService";
import { SocketContextType, useSocket } from "../../context/SocketContext";
import "./CardHand.css";

/**
 * Simplified card hand component with styled scrollbar
 */
const CardHand = () => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const socket: SocketContextType = useSocket();

  const turn: boolean = socket.gameState?.playerUsername === socket.gameState?.turnUsername;
  const lobbyID: string = socket.gameState?.lobbyId ?? "";
  const cards = socket.gameState?.playerCards || [];
  
  /**
   * Reset selection when cards change
   */
  React.useEffect(() => {
    setSelectedCards([]);
  }, [cards.length]);

  /**
   * Play selected cards
   */
  const handlePlayClick = async () => {
    if (!turn || selectedCards.length === 0) return;
    
    playCards(
      socket.socket,
      selectedCards.map(id => cards[id]),
      lobbyID,
      socket.setCardPlayedResult
    );
    setSelectedCards([]);
  };

  /**
   * Toggle card selection
   */
  const toggleCardSelection = (id: number) => {
    setSelectedCards((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((cardId) => cardId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <div className="card-hand-wrapper">
      {/* Hovered card display */}
      {hoveredCard && (
        <div className="hovered-card-container">
          <img 
            src={`assets/cards/${hoveredCard}.jpg`}
            className="hovered-card"
            alt={hoveredCard}
          />
        </div>
      )}

      {/* Play button */}
      <button 
        className={`play-button ${turn && selectedCards.length > 0 ? 'active' : 'inactive'}`}
        onClick={handlePlayClick}
        disabled={!turn || selectedCards.length === 0}
      >
        {selectedCards.length === 0 ? 'SELECT CARDS TO PLAY' : `PLAY ${selectedCards.length} SELECTED CARD${selectedCards.length > 1 ? 'S' : ''}`}
      </button>

      {/* Cards container with scrollbar */}
      <div className="cards-container-wrapper">
        <div className="cards-container" ref={containerRef}>
          <div className="cards-row">
            {cards.map((card, idx) => (
              <div 
                key={idx}
                className={`card-slot ${selectedCards.includes(idx) ? 'selected' : ''}`}
              >
                <Card
                  card={card}
                  id={idx}
                  isSelected={selectedCards.includes(idx)}
                  onClick={toggleCardSelection}
                  setHoveredCard={setHoveredCard}
                />
                {selectedCards.includes(idx) && (
                  <div className="selection-indicator">
                    <span>{selectedCards.indexOf(idx) + 1}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selection info */}
      {selectedCards.length > 0 && (
        <div className="selection-info">
          <span>{selectedCards.length} card{selectedCards.length > 1 ? 's' : ''} selected</span>
          <button className="clear-selection" onClick={() => setSelectedCards([])}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default CardHand;