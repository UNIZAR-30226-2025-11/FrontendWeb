import React from "react"

import "../utils/types"

/**
 * Definition of the parameters that the Card
 * component has
 */
type CardProps = {
    card: Card;
    isSelected: boolean;
    onClick: (id: number) => void;
    setHoveredCard: (card: Card | null) => void;
};

/**
 * Define how to display a card
 * 
 * @param card The card to show
 * @param isSelected True if the card is selected
 * @param onClick Function to do if the card is clicked
 * @param setHoveredCard Function to put which is the
 *      hovered card
 * 
 * @returns The card
 */
const Card:React.FC<CardProps> =
({  card,
    isSelected,
    onClick,
    setHoveredCard}) =>
{
    // Classes that define a card
    let classes = "card shadow-game " + card.name

    // Check if selected
    if (isSelected)
        classes += " card-selected "
    else
        classes += ""

    return (
        // The card
        <div className={classes}
            onClick={() => {
                onClick(card.id)
                setHoveredCard(null)
            }}

            onMouseEnter={() => {
                setHoveredCard(card)
            }}
            
            onMouseLeave={() => {
                setHoveredCard(null)
            }}>
        </div>
    )
}

export default Card
