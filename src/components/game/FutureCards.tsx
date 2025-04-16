import React, { useEffect } from "react";
import { BackendGamePlayedCardsResponseJSON, CardJSON } from "../../api/JSON";
import Card from "./Card";
import "./FutureCards.css";

const FutureCards = (
    {
    cards,
    setCardPlayedResult
    } : {
    cards: CardJSON[],
    setCardPlayedResult:React.Dispatch<React.SetStateAction<BackendGamePlayedCardsResponseJSON | undefined>>
    }
) => {
    // Auto-close modal after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setCardPlayedResult(undefined);
        }, 5000);

        return () => clearTimeout(timer);
    }, [setCardPlayedResult]);

    return (
        <div className="future-cards-overlay" onClick={() => setCardPlayedResult(undefined)}>
            <div className="future-cards-modal" onClick={(e) => e.stopPropagation()}>
                <div className="future-cards-header">
                    <h1>The Next 3 Cards</h1>
                </div>
                
                <div className="future-cards-content">
                    <div className="future-cards-sequence">
                        {cards.map((card, index) => (
                            <div className="future-card-container" key={index}>
                                <div className="future-card-order">#{index + 1}</div>
                                <Card 
                                    key={index}
                                    card={card}
                                    isSelected={false}
                                    id={0}
                                    onClick={()=>{}}
                                    setHoveredCard={()=>{}} 
                                />
                            </div>
                        ))}
                    </div>
                    <div className="future-cards-info">
                        <p>Cards shown from top to bottom of the deck</p>
                        <p className="future-cards-tip">Click anywhere to close</p>
                    </div>
                </div>
                
                <div className="future-cards-timer">
                    <div className="timer-bar"></div>
                </div>
            </div>
        </div>
    );
};

export default FutureCards;