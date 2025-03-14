import React from "react"
import * as Objects from "../../utils/types"

import "../../utils/types"

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
const Card = (
    {
    card,
    isSelected,
    id,
    onClick,
    setHoveredCard
    } : {
    card:string,
    isSelected:boolean,
    id:Number
    onClick:(id: Number) => void,
    setHoveredCard:React.Dispatch<React.SetStateAction<string | null>>
    }) =>
{
    // Classes that define a card
    let classes = "card shadow-game "

    // Check if selected
    if (isSelected)
        classes += " card-selected "
    else
        classes += ""

    return (
        // The card
        <img src={"assets/cards/" + card + ".jpg"}
            alt={card}
            className={classes}
            onClick={() => {
                onClick(id)
                setHoveredCard(null)
            }}

            onMouseEnter={() => {
                setHoveredCard(card)
            }}
            
            onMouseLeave={() => {
                setHoveredCard(null)
            }}>
        </img>
    )
}

export default Card
