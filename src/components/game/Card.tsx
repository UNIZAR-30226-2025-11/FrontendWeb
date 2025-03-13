import React from "react"
import * as Objects from "../../utils/types"

import "../../utils/types"

/**
 * Definition of the parameters that the Card
 * component has
 */
type CardProps = {
    card: Objects.Card;
    isSelected: boolean;
    onClick: (id: number) => void;
    setHoveredCard: (card: Objects.Card | null) => void;
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
const Card = (
    {
    card,
    isSelected,
    // onClick,
    // setHoveredCard
    } : {
    card:string,
    isSelected:boolean,
    // onClick:React.Dispatch<React.SetStateAction<Number | null>>,
    // setHoveredCard:React.Dispatch<React.SetStateAction<Objects.Card | null>>
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
                // onClick(0)
                // setHoveredCard(null)
            }}

            onMouseEnter={() => {
                // setHoveredCard()
            }}
            
            onMouseLeave={() => {
                // setHoveredCard(null)
            }}>
        </img>
    )
}

export default Card
