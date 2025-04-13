import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { CardType } from "../../utils/types";
import { selectCard, selectNopeUsage, selectTypeOfCard, selectPlayer } from "../../services/socketService";
import { SocketContextType, useSocket } from "../../context/SocketContext";
import Card from "./Card";
import "./Select.css";
import { CardJSON } from "../../api/JSON";

const Selection = () => {
  // Recover the socket
  const socket: SocketContextType = useSocket();
  
  // States for selection and scrolling
  const [selectedCardType, setSelectedCardType] = useState("");
  const [selectedCard, setSelectedCard] = useState(-1);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  
  // Refs for scrollable containers
  const cardTypesRef = useRef<HTMLDivElement>(null);
  const myCardsRef = useRef<HTMLDivElement>(null);
  
  // Check if the game is undefined
  if (socket.gameState === undefined) return null;
  
  // Define active players (excluding the current player)
  const activePlayers = socket.gameState.players.filter(
    (player) => player.playerUsername !== socket.gameState!.playerUsername && player.active
  );
  
  // Define the card type options
  const cardTypeOptions = Object.keys(CardType).filter(
    (key) => isNaN(Number(key))
  ) as (keyof typeof CardType)[];
  
  const lobbyID = socket.gameState.lobbyId;
  
  // Check scroll position for horizontal scroll containers
  const checkScrollPosition = (container: HTMLDivElement | null) => {
    if (!container) return;
    
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    if (container === cardTypesRef.current) {
      setShowLeftScroll(scrollLeft > 10);
      setShowRightScroll(maxScroll - scrollLeft > 10);
    }
  };
  
  // Set up scroll listeners
  useEffect(() => {
    const typesContainer = cardTypesRef.current;
    const cardsContainer = myCardsRef.current;
    
    const handleScroll = (e: Event) => {
      checkScrollPosition(e.target as HTMLDivElement);
    };
    
    if (typesContainer) {
      typesContainer.addEventListener("scroll", handleScroll);
      checkScrollPosition(typesContainer);
    }
    
    if (cardsContainer) {
      cardsContainer.addEventListener("scroll", handleScroll);
      checkScrollPosition(cardsContainer);
    }
    
    return () => {
      if (typesContainer) {
        typesContainer.removeEventListener("scroll", handleScroll);
      }
      if (cardsContainer) {
        cardsContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [socket.selectCardType, socket.selectCard]);
  
  // Scroll handlers
  const scrollLeft = (container: HTMLDivElement | null) => {
    if (!container) return;
    container.scrollBy({ left: -200, behavior: "smooth" });
    setTimeout(() => checkScrollPosition(container), 300);
  };
  
  const scrollRight = (container: HTMLDivElement | null) => {
    if (!container) return;
    container.scrollBy({ left: 200, behavior: "smooth" });
    setTimeout(() => checkScrollPosition(container), 300);
  };
  
  // Card type selection handler
  const handleCardTypeSelect = (cardType: string) => {
    setSelectedCardType(cardType);
  };
  
  // Card type confirmation
  const handleCardTypeConfirm = () => {
    if (!selectedCardType) return;
    
    selectTypeOfCard(socket.socket, selectedCardType, lobbyID);
    socket.setSelectCardType(undefined);
  };
  
  // Card selection handler
  const handleCardSelection = () => {
    if (selectedCard === -1 || !socket.gameState) return;
    
    const selectedCardObj = socket.gameState.playerCards.find(
      (card) => card.id === selectedCard
    );
    
    if (selectedCardObj) {
      selectCard(socket.socket, selectedCardObj, socket.gameState.lobbyId);
      socket.setSelectCard(undefined);
    }
  };
  
  // Nope card usage handler
  const handleNopeUsage = (useNope: boolean) => {
    selectNopeUsage(socket.socket, useNope, socket.gameState?.lobbyId!);
    socket.setSelectNope(undefined);
  };

  const handlePlayerSelection = (player: string) => {
    selectPlayer(socket.socket, player, lobbyID);
    socket.setSelectPlayer(undefined);
  }

  // Updated player selection component with proper handling for players with 0 cards
  const renderPlayerSelection = () => (
    <div className="selection-overlay">
      <motion.div 
        className="selection-window"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <div className="selection-header">
          <h1>Select a Player</h1>
        </div>
        
        <div className="selection-content">
          <div className="players-grid">
            {activePlayers.map((player) => (
              <div
                key={player.playerUsername}
                className={`player-option ${player.numCards === 0 ? 'no-cards' : ''}`}
                onClick={() => { 
                  if (player.numCards > 0) {
                    handlePlayerSelection(player.playerUsername);
                  }
                }}
              >
                <div className="player-avatar-container">
                  <div className="player-avatar">
                    <img 
                      src="./assets/user.png" 
                      alt={`${player.playerUsername}'s avatar`} 
                      className="player-avatar-image"
                    />
                  </div>
                </div>
                <p className="player-name">{player.playerUsername}</p>
                <p className={`player-cards ${player.numCards === 0 ? 'no-cards' : ''}`}>
                  {player.numCards} cards
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
  
  // Card type selection component
  const renderCardTypeSelection = () => {
    const cardPlayable: string[] = 
    [
      "SeeFuture", // See the next 3 cards
      "Shuffle", // Shuffle the deck
      "Skip", // Skip the next player
      "Attack", // Next player draws 2 cards
      "Nope", // Cancel the last action
      "Favor", // Force a player to give you a card
      "Deactivate", // Deactivate a card
      "RainbowCat", // Wild card
      "TacoCat", // Wild card
      "HairyPotatoCat", // Wild card
      "Cattermelon", // Wild card
      "BeardCat" // Wild card
    ];

    const cardTypeElements: CardJSON[] = cardPlayable.map((type, id) => ({ id: id, type: type }));
    const wrapper = (id: number) => {
      return setSelectedCardType(cardTypeElements[id].type);
    };

    return(
    <div className="selection-overlay">
      <motion.div 
        className="selection-window"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <div className="selection-header">
          <h1>Select a Card Type</h1>
        </div>
        
        <div className="selection-content">
          <div className="my-cards-container" ref={myCardsRef}>            
            <div className="my-cards-row">
              {cardTypeElements.map((card) => (
                <div key={card.type} style={{ transform: selectedCardType === card.type ? 'translateY(-10px)' : 'none' }}>
                  <Card
                    card={card}
                    id={card.id}
                    isSelected={selectedCardType === card.type}
                    onClick={wrapper}
                    setHoveredCard={() => {}}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="selection-footer">
          <button
            className="selection-button"
            disabled={selectedCardType === ""}
            onClick={handleCardTypeConfirm}
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
    )
  };
  
  // My card selection component
  const renderCardSelection = () => (
    <div className="selection-overlay">
      <motion.div 
        className="selection-window"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <div className="selection-header">
          <h1>Select one of your Cards</h1>
        </div>
        
        <div className="selection-content">
          <div className="my-cards-container" ref={myCardsRef}>            
            <div className="my-cards-row">
              {socket.gameState!.playerCards.map((card) => (
                <div key={card.type} style={{ transform: selectedCard === card.id ? 'translateY(-10px)' : 'none' }}>
                  <Card
                    card={card}
                    id={card.id}
                    isSelected={selectedCard === card.id}
                    onClick={setSelectedCard}
                    setHoveredCard={() => {}}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="selection-footer">
          <button
            className="selection-button"
            disabled={selectedCard === -1}
            onClick={handleCardSelection}
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
    
  // Updated Nope card selection component with checking if user has a NOPE card
  const renderNopeSelection = () => {
    // Check if the user has a NOPE card
    const hasNopeCard = socket.gameState?.playerCards.some(card => card.type === "Nope");
    
    return (
      <div className="selection-overlay">
        <motion.div 
          className="selection-window"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="selection-header">
            <h1>Use Your NOPE Card?</h1>
          </div>
          
          <div className="selection-content">
            {hasNopeCard ? (
              <p style={{ textAlign: 'center', fontSize: '16px', color: 'rgba(255, 255, 255, 0.8)' }}>
                You have a NOPE card that can block the current action.
                Do you want to play it?
              </p>
            ) : (
              <p style={{ textAlign: 'center', fontSize: '16px', color: 'rgba(255, 89, 89, 0.9)' }}>
                You don't have any NOPE cards to block this action.
              </p>
            )}
            
            <div className="nope-options">
              <div 
                className={`nope-option yes ${!hasNopeCard ? 'disabled' : ''}`}
                onClick={() => {
                  if (hasNopeCard) {
                    handleNopeUsage(true);
                  }
                }}
              >
                Yes
              </div>
              
              <div 
                className="nope-option no"
                onClick={() => handleNopeUsage(false)}
              >
                No
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };
  
  // Render the appropriate selection based on context
  if (socket.selectPlayer) {
    return renderPlayerSelection();
  } else if (socket.selectCardType) {
    return renderCardTypeSelection();
  } else if (socket.selectCard) {
    return renderCardSelection();
  } else if (socket.selectNope) {
    return renderNopeSelection();
  }
  
  return null;
};

export default Selection;