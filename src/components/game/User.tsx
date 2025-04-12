import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayerJSON } from "../../api/JSON";
import './User.css';

/**
 * Displays a user with avatar, username and card count
 * using an enhanced glass card styling theme
 * 
 * @param player The player data object
 * @returns The styled user component
 */
const User = ({ player }: { player: PlayerJSON }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate if this is a long username that needs special handling
  const isLongUsername = player.playerUsername.length > 10;
  
  return (
    <motion.div 
      className="user-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Decorative paw prints */}
      <div className="user-decoration paw-top"></div>
      <div className="user-decoration paw-bottom"></div>
      
      <div className="user-inner-container">
        <div className="user-avatar-wrapper">
          <div className="user-avatar-glow"></div>
          <motion.div 
            className="user-avatar-frame"
            animate={{ rotate: isHovered ? [0, -5, 5, -3, 0] : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <img 
              className="user-avatar" 
              src="./assets/user.png" 
              alt={`${player.playerUsername}'s avatar`} 
            />
            
            {/* Overlay effect */}
            <div className="user-avatar-overlay"></div>
          </motion.div>
          
          <motion.div 
            className="user-card-count"
            whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
            animate={isHovered ? { y: [0, -5, 0], scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
          >
            <span className="card-icon">🃏</span>
            <span className="card-number">{player.numCards}</span>
          </motion.div>
        </div>
        
        <motion.div 
          className="user-name-container"
          animate={isHovered ? { y: [0, -2, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="user-name-plate">
            <p className="user-name">{player.playerUsername}</p>
            
            {/* Indication for active player */}
            <AnimatePresence>
              {isHovered && (
                <motion.div 
                  className="user-active-indicator"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="user-active-dot"></span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        
        {/* Cards visual indicator */}
        <div className="user-cards-indicator">
          {Array.from({ length: Math.min(player.numCards, 3) }).map((_, index) => (
            <div 
              key={index} 
              className="indicator-card"
              style={{ 
                transform: `rotate(${(index - 1) * 15}deg)`,
                zIndex: 10 - index
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default User;