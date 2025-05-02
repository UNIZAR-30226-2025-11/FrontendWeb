import React from "react";
import { motion } from "framer-motion";
import { PlayerJSON } from "../../api/JSON";
import './User.css';
import { IMAGES_EXTENSION, IMAGES_PATH } from "../../services/apiShop";

/**
 * Displays a user with avatar, username and card count
 * using a simplified glass styling theme
 * 
 * @param player The player data object
 * @returns The styled user component
 */
const User = ({ player }: { player: PlayerJSON }) => {
  const userImg = (player.active ? player.playerAvatar : "user-dead" ) + IMAGES_EXTENSION
  return (
    <motion.div 
      className="user-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <div className="user-inner-container">
        <div className="user-content">
          {/* Avatar */}
          <div className="user-avatar-wrapper">
            <img 
              className="user-avatar" 
              src={`${IMAGES_PATH}/avatar/${userImg}`} 
              alt={`${player.playerUsername}'s avatar`} 
            />
            
            {/* Card count indicator */}
            <div className="user-card-count">
              <span className="card-number">{player.numCards}</span>
            </div>
          </div>
          
          {/* Username */}
          <div className="user-name-container">
            <p className="user-name">{player.playerUsername}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default User;