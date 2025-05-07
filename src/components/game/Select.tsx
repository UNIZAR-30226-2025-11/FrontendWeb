import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { selectCard, selectNopeUsage, selectTypeOfCard, selectPlayer } from "../../services/socketService";
import { SocketContextType, useSocket } from "../../context/SocketContext";
import Card from "./Card";
import "./Select.css";
import { CardJSON } from "../../api/JSON";
import { IMAGES_EXTENSION, IMAGES_PATH } from "../../services/apiShop";

const Selection = () => {
  // Recover the socket
  const socket: SocketContextType = useSocket();
  
  // Refs for scrollable containers
  const myCardsRef = useRef<HTMLDivElement>(null);
  
  // Check if the game is undefined
  if (socket.gameState === undefined) return null;
  
  // Define active players (excluding the current player)
  const activePlayers = socket.gameState.players.filter(
    (player) => player.playerUsername !== socket.gameState!.playerUsername && player.active
  );
  
  const lobbyID = socket.gameState.lobbyId;
  
  // Card type selection handler with auto-confirm
  const handleCardTypeSelect = (cardType: string) => {
    selectTypeOfCard(socket.socket, cardType, lobbyID);
    socket.setSelectCardType(undefined);
  };
  
  // Card selection handler with auto-confirm
  const handleCardSelection = (cardId: number) => {
    if (!socket.gameState) return;
    
    const selectedCardObj = socket.gameState.playerCards.find(
      (card) => card.id === cardId
    );
    
    if (selectedCardObj) {
      selectCard(socket.socket, selectedCardObj, socket.gameState.lobbyId);
      socket.setSelectCard(undefined);
    }
  };
  
  // Nope card usage handler
  const handleNopeUsage = (useNope: boolean) => {
    selectNopeUsage(socket.socket, useNope, socket.gameState?.lobbyId ?? "");
    socket.setSelectNope(undefined);
  };

  const handlePlayerSelection = (player: string) => {
    selectPlayer(socket.socket, player, lobbyID);
    socket.setSelectPlayer(undefined);
  }

  // Auto-close timer effect for each selection type
  useEffect(() => {
    // Create a timer for each selection type that's active
    let timer: ReturnType<typeof setTimeout> | null = null;
    
    if (socket.selectPlayer && socket.selectPlayer.timeOut) {
      timer = setTimeout(() => {
        socket.setSelectPlayer(undefined);
      }, socket.selectPlayer.timeOut);
    } else if (socket.selectCardType && socket.selectCardType.timeOut) {
      timer = setTimeout(() => {
        socket.setSelectCardType(undefined);
      }, socket.selectCardType.timeOut);
    } else if (socket.selectCard && socket.selectCard.timeOut) {
      timer = setTimeout(() => {
        socket.setSelectCard(undefined);
      }, socket.selectCard.timeOut);
    } else if (socket.selectNope && socket.selectNope.timeOut) {
      timer = setTimeout(() => {
        socket.setSelectNope(undefined);
      }, socket.selectNope.timeOut);
    }
    
    // Clean up timer on unmount or when selection changes
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [socket.selectPlayer, socket.selectCardType, socket.selectCard, socket.selectNope]);

  // Updated player selection component with proper handling for players with 0 cards
  const renderPlayerSelection = () => {
    const timeoutMs = socket.selectPlayer?.timeOut || 30000; // Default to 30 seconds if not specified
    
    return (
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
                        src={`${IMAGES_PATH}/avatar/${player.playerAvatar}${IMAGES_EXTENSION}`} 
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
          
          <div className="selection-footer">
            <div className="selection-timer">
              <div className="selection-timer-bar" style={{ animationDuration: `${timeoutMs/1000}s` }}></div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };
  
  // Card type selection component - modified to auto-confirm when a card is clicked
  const renderCardTypeSelection = () => {
    const timeoutMs = socket.selectCardType?.timeOut || 30000; // Default to 30 seconds if not specified
    
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
      handleCardTypeSelect(cardTypeElements[id].type);
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
                <div key={card.type}>
                  <Card
                    card={card}
                    id={card.id}
                    isSelected={false}
                    onClick={wrapper}
                    setHoveredCard={() => {}}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="selection-footer">
          <div className="selection-timer">
            <div className="timer-bar" style={{ animationDuration: `${timeoutMs/1000}s` }}></div>
          </div>
        </div>
      </motion.div>
    </div>
    )
  };
  
  // My card selection component - modified to auto-confirm when a card is clicked
  const renderCardSelection = () => {
    const timeoutMs = socket.selectCard?.timeOut || 30000; // Default to 30 seconds if not specified
    
    return (
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
                  <div key={card.type}>
                    <Card
                      card={card}
                      id={card.id}
                      isSelected={false}
                      onClick={handleCardSelection}
                      setHoveredCard={() => {}}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="selection-footer">
            <div className="selection-timer">
              <div className="timer-bar" style={{ animationDuration: `${timeoutMs/1000}s` }}></div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };
    
  // Updated Nope card selection component with checking if user has a NOPE card
  const renderNopeSelection = () => {
    // Check if the user has a NOPE card
    const hasNopeCard = socket.gameState?.playerCards.some(card => card.type === "Nope");
    const timeoutMs = socket.selectNope?.timeOut || 15000; // Default to 15 seconds if not specified
    
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
                You don&apos;t have any NOPE cards to block this action.
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
          
          <div className="selection-footer">
            <div className="selection-timer">
              <div className="timer-bar" style={{ animationDuration: `${timeoutMs/1000}s` }}></div>
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