import React from "react";
import { BackendGamePlayedCardsResponseJSON, CardJSON } from "../../api/JSON";
import Card from "./Card";

const FutureCards = (
    {
    cards,
    setCardPlayedResult
    } : {
    cards: CardJSON[],
    setCardPlayedResult:React.Dispatch<React.SetStateAction<BackendGamePlayedCardsResponseJSON | undefined>>
    }
) => {
    return (
        <div className="container-selection-big-user shadow-game">
            <h1>The following cards are:</h1>

            <div className="users">
                {cards.map((card, key) => {
                    return <Card    key={key}
                                    card={card}
                                    isSelected={false}
                                    id={0}
                                    onClick={()=>{}}
                                    setHoveredCard={()=>{}} />
                })}
            </div>
            
            <button onClick={() => {setCardPlayedResult(undefined)}}>
                Close
            </button>
        </div>
    )
}

export default FutureCards;
