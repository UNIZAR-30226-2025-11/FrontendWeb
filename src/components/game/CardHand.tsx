import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "./Card";
import { playCards } from "../../services/socketService";
import { SocketContextType, useSocket } from "../../context/SocketContext";
import "./CardHand.css";

/**
 * Enhanced card hand component with glass styling and improved interaction
 * 
 * @returns The styled card hand component
 */
const CardHand = () => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const socket: SocketContextType = useSocket();

  const turn: boolean = socket.gameState?.playerUsername === socket.gameState?.turnUsername;
  const lobbyID: string = socket.gameState?.lobbyId!;
  const cards = socket.gameState?.playerCards || [];

  // Check scroll position to show/hide scroll buttons and gradients
  const checkScrollPosition = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    // Show left scroll if we're not at the beginning
    setShowLeftScroll(scrollLeft > 10);
    
    // Show right scroll if we're not at the end
    setShowRightScroll(maxScroll - scrollLeft > 10);
    
  };

  // Scroll to center when cards change
  useEffect(() => {
    if (containerRef.current && cards.length > 0) {
      const container = containerRef.current;
      // Center the cards when they load
      setTimeout(() => {
        container.scrollLeft = (container.scrollWidth - container.clientWidth) / 2;
        checkScrollPosition();
      }, 100);
    }
    setSelectedCards([]); // Reset selection when cards change
  }, [cards.length]);

  // Listen for scroll events to update scroll button visibility
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => checkScrollPosition();
    container.addEventListener('scroll', handleScroll);
    
    // Initial check
    checkScrollPosition();
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /**
   * Sends the information of the selected cards to the
   * server for making the movement
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
   * Updates the selected state of a card.
   */
  const toggleCardSelection = (id: number) => {
    setSelectedCards((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((cardId) => cardId !== id)
        : [...prevSelected, id]
    );
  };

  // Handle mouse events for card container dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    // Don't start dragging if clicking on a card
    if ((e.target as HTMLElement).closest('.card-component')) return;
    
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeftPos(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    containerRef.current.scrollLeft = scrollLeftPos - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    
    // Don't start dragging if touching a card
    if ((e.target as HTMLElement).closest('.card-component')) return;
    
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeftPos(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeftPos - walk;
  };
  
  // Scroll left/right buttons handlers
  const scrollLeftHandler = (amount: number) => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: -amount, behavior: 'smooth' });
    setTimeout(checkScrollPosition, 300);
  };
  
  const scrollRightHandler = (amount: number) => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    setTimeout(checkScrollPosition, 300);
  };

  return (
    <div className="card-hand-wrapper">
      {/* Hovered card display */}
      <AnimatePresence>
        {hoveredCard && (
          <motion.div 
            className="hovered-card-container"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <img 
              src={`assets/cards/${hoveredCard}.jpg`}
              className="hovered-card-image" 
              alt={hoveredCard}
            />
            <div className="card-glow"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play button */}
      <motion.button 
        className={`play-button ${(turn && selectedCards.length > 0) ? 'active' : 'inactive'}`}
        onClick={handlePlayClick}
        disabled={!turn || selectedCards.length === 0}
        whileHover={turn && selectedCards.length > 0 ? { scale: 1.05 } : {}}
        whileTap={turn && selectedCards.length > 0 ? { scale: 0.95 } : {}}
        animate={turn && selectedCards.length > 0 ? 
          { boxShadow: ['0 0 10px 0px rgba(255, 154, 68, 0.5)', '0 0 20px 5px rgba(255, 154, 68, 0.5)', '0 0 10px 0px rgba(255, 154, 68, 0.5)'] } : 
          {}
        }
        transition={{ duration: 2, repeat: Infinity }}
      >
        {selectedCards.length === 0 ? 'SELECT CARDS TO PLAY' : `PLAY ${selectedCards.length} SELECTED CARD${selectedCards.length > 1 ? 'S' : ''}`}
      </motion.button>

      {/* Scroll buttons - only show when needed */}
      <AnimatePresence>
        {showLeftScroll && (
          <motion.button 
            className="scroll-button left" 
            onClick={() => scrollLeftHandler(150)}
            aria-label="Scroll left"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <span className="scroll-arrow">◄</span>
          </motion.button>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showRightScroll && (
          <motion.button 
            className="scroll-button right" 
            onClick={() => scrollRightHandler(150)}
            aria-label="Scroll right"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <span className="scroll-arrow">►</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cards container with horizontal scroll */}
      <div 
        className={`cards-container ${isDragging ? 'dragging' : ''}`}
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        onScroll={checkScrollPosition}
      >
        
        <div className="cards-row">
          {cards.map((card, idx) => (
            <motion.div 
              key={idx}
              className={`card-slot ${selectedCards.includes(idx) ? 'selected' : ''}`}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: idx * 0.05,
                type: "spring",
                stiffness: 260, 
                damping: 20
              }}
              whileHover={{ y: -20, zIndex: 10 }}
            >
              <Card
                card={card}
                id={idx}
                isSelected={selectedCards.includes(idx)}
                onClick={toggleCardSelection}
                setHoveredCard={setHoveredCard}
                className="card-component"
                animationDelay={idx * 50}
              />
              {selectedCards.includes(idx) && (
                <div className="selection-indicator">
                  <span className="selection-number">{selectedCards.indexOf(idx) + 1}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>

      {/* Selection info */}
      <AnimatePresence>
        {selectedCards.length > 0 && (
          <motion.div 
            className="selection-info"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <span>{selectedCards.length} card{selectedCards.length > 1 ? 's' : ''} selected</span>
            <button 
              className="clear-selection-btn"
              onClick={() => setSelectedCards([])}
            >
              Clear
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CardHand;