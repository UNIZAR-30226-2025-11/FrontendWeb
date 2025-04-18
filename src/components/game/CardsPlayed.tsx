import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSocket } from "../../context/SocketContext";
import './CardsPlayed.css';

export default function CardsPlayed() {
  const socket = useSocket();
  const [isVisible, setIsVisible] = useState(false);
  
  // Get the last played card from socket
  const lastPlayedCard = socket.gameState?.lastCardPlayed || null;
  
  // Animate in after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [lastPlayedCard]); // Re-trigger animation when the card changes
  
  // If no card was played, don't render anything
  if (!lastPlayedCard) {
    return null;
  }
  
  return (
    <div className="played-card-container">
      <AnimatePresence mode="wait">
      <motion.div>
          <motion.div 
             className="played-card-label"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
           >
             Last Played
           </motion.div>
           
           <motion.div
             key={lastPlayedCard.type}
             className={`last-played-card ${isVisible ? 'visible' : ''}`}
             initial={{ y: 30, opacity: 0, rotateZ: 0, scale: 0.9 }}
             animate={{ 
               y: 0, 
               opacity: 1, 
               rotateZ: Math.random() > 0.5 ? 5 : -5,
               scale: 1
             }}
             exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
             transition={{ 
               duration: 0.5,
               type: "spring",
               stiffness: 200,
               damping: 15
             }}
           >
             <div className="played-card-inner">
               <img 
                 src={`assets/cards/${lastPlayedCard.type}.jpg`}
                 alt={lastPlayedCard.type}
                 className="played-card-image"
               />
               <div className="played-card-glow"></div>
               <div className="paw-decoration paw-played-corner"></div>
             </div>
           </motion.div>
         </motion.div>
      </AnimatePresence>
    </div>
  );
}