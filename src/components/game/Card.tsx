import React, { useState, useEffect } from "react";
import * as Objects from "../../api/JSON";
import "../../utils/types";
import "./Card.css";

/**
 * Define how to display a card with glass-effect styling
 * 
 * @param card The card to show
 * @param isSelected True if the card is selected
 * @param onClick Function to do if the card is clicked
 * @param setHoveredCard Function to put which is the hovered card
 * @param className Additional CSS classes for the card
 * @param animationDelay Delay before card appears, for staggered animations
 * 
 * @returns The card component
 */
const Card = ({
  card,
  isSelected,
  id,
  onClick,
  setHoveredCard,
  className = '',
  animationDelay = 0
}: {
  card: Objects.CardJSON;
  isSelected: boolean;
  id: number;
  onClick: (id: number) => void;
  setHoveredCard: React.Dispatch<React.SetStateAction<string | null>>;
  className?: string;
  animationDelay?: number;
}) => {
  // Handle animation visibility
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay);
    
    return () => clearTimeout(timer);
  }, [animationDelay]);

  // Classes that define a card
  let classes = `glass-card-game ${isVisible ? 'visible' : ''} ${className} `;

  // Check if selected
  if (isSelected)
    classes += " card-selected ";

  return (
    <div className={classes} style={{ animationDelay: `${animationDelay}ms` }}>
      <img 
        src={`assets/cards/${card.type}.jpg`}
        alt={card.type}
        className="card-image"
        onClick={() => {
          onClick(id);
          setHoveredCard(null);
        }}
        onMouseEnter={() => {
          setHoveredCard(card.type);
        }}
        onMouseLeave={() => {
          setHoveredCard(null);
        }}
      />
      <div className="card-glow"></div>
      <div className="paw-decoration paw-card-corner"></div>
    </div>
  );
};

export default Card;