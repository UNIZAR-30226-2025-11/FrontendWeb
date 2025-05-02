import React, {
	useState,
	useImperativeHandle,
	forwardRef,
	useEffect,
  } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import "./CardDeck.css";
  import { playCards } from "../../services/socketService";
  import { SocketContextType, useSocket } from "../../context/SocketContext";
  
  // Define the handle type for the imperative methods
  export type CardDeckHandle = {
	shuffleDeck: () => void;
	stealCard: () => void;
  };
  
  /**
   * An elegant, compact card deck component with visual effects
   */
  const CardDeck = forwardRef<CardDeckHandle>((_, ref) => {
	// Socket for extract the necessary information
	const socket: SocketContextType = useSocket();
  
	// Get deck size from game state
	const deckSize = socket.gameState?.cardsLeftInDeck || 0;
  
	// True if is the turn of the user. False otherwise
	const active = socket.gameState?.turnUsername === socket.gameState?.playerUsername;
  
	// Variables for storing the information for visual effects
	const [isShuffling, setIsShuffling] = useState(false);
	const [isDrawing, setIsDrawing] = useState(false);
	const [cardRotation, setCardRotation] = useState(0);
  
	// Randomize initial rotation slightly
	useEffect(() => {
	  setCardRotation(Math.random() * 6 - 3);
	}, []);
  
	/**
	 * If the Deck is active, sends to the Backend the request of a new card
	 */
	const drawCard = () => {
	  // Check if active and there are cards for drawing
	  if (!active || deckSize === 0) return;
  
	  // Visual effect for drawing
	  setIsDrawing(true);
	  setTimeout(() => setIsDrawing(false), 500);
  
	  // Send to the Backend the action
	  playCards(
		socket.socket, 
		[],
		socket.gameState?.lobbyId!,
		socket.setCardPlayedResult
	  );
	};
  
	/**
	 * Visual effects for shuffle the deck.
	 */
	const shuffleDeck = () => {
	  // Only animate if there are cards
	  if (deckSize === 0) return;
	  
	  // Init the shuffle
	  setIsShuffling(true);
	  
	  // Generate new random rotation
	  setCardRotation(Math.random() * 6 - 3);
  
	  // End the shuffle in 1 second
	  setTimeout(() => setIsShuffling(false), 1000);
	};
  
	/**
	 * Visual effects for stealing a card
	 */
	const stealCard = () => {
	  if (deckSize === 0) return;
  
	  setIsDrawing(true);
	  setTimeout(() => setIsDrawing(false), 500);
	};
  
	// Expose functions to parent using ref
	useImperativeHandle(ref, () => ({
	  shuffleDeck,
	  stealCard,
	}));
  
	// Calculate deck visualization based on number of cards
	const getDeckVisualization = () => {
	  // No cards? Show empty slot
	  if (deckSize === 0) {
		return (
		  <div className="empty-deck">
			<div className="empty-deck-text">Empty</div>
		  </div>
		);
	  }
  
	  return (
		<div className="deck-visualization">
		  {/* Base card */}
		  <motion.div 
			className="card-base"
			animate={{
			  rotate: cardRotation,
			  scale: isShuffling ? [1, 1.05, 1] : 1
			}}
			transition={{ 
			  duration: isShuffling ? 1 : 0.3,
			  type: "easeInOut", 
			  stiffness: 300
			}}
		  >
			{/* Card stacks */}
			<div 
			  className="card-count-indicator" 
			  data-count={deckSize > 99 ? "99+" : deckSize}
			/>
  
			{/* Card top layers (visual only) */}
			{[...Array(Math.min(3, deckSize - 1))].map((_, i) => (
			  <motion.div 
				key={`layer-${i}`}
				className="card-layer"
				style={{ 
				  zIndex: 5 - i,
				  top: `${-3 + i * 1}px`,
				  left: `${-2 + i * 1}px`
				}}
				animate={{
				  x: isShuffling ? [0, i % 2 === 0 ? -2 : 2, 0] : 0,
				  y: isShuffling ? [0, -1, 0] : 0,
				}}
				transition={{ 
				  duration: isShuffling ? 0.8 : 0.3,
				  type: "easeInOut"
				}}
			  />
			))}
  
			{/* Drawn card animation */}
			<AnimatePresence>
			  {isDrawing && (
				<motion.div 
				  className="drawn-card"
				  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
				  animate={{ x: 120, y: -50, opacity: 0, scale: 0.8, rotate: 25 }}
				  exit={{ opacity: 0 }}
				  transition={{ duration: 0.5 }}
				/>
			  )}
			</AnimatePresence>
		  </motion.div>
		</div>
	  );
	};
  
	// Calculate CSS class based on active state
	const deckClass = `deck-container ${active ? 'deck-active' : 'deck-inactive'}`;
  
	return (
	  <div className="card-deck-wrapper">
		<motion.div 
		  className={deckClass}
		  whileHover={active && deckSize > 0 ? { scale: 1.05 } : {}}
		  whileTap={active && deckSize > 0 ? { scale: 0.95 } : {}}
		  onClick={drawCard}
		>
		  {getDeckVisualization()}
		</motion.div>
		<div className="deck-info">
		  <span className="cards-remaining">{deckSize}</span>
		  <span className="cards-label">cards</span>
		</div>
	  </div>
	);
  });
  
  CardDeck.displayName = "CardDeck";

  export default CardDeck;