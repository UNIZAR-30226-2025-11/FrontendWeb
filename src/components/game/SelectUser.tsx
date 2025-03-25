import React, { useState } from "react";
import * as Objects from "../../api/JSON"

import "./Select.css"
import BigUser from "./BigUser";
import { CardType, SelectionType } from "../../utils/types";
import { selectCard, selectTypeOfCard } from "../../services/socketService";
import { useSocket } from "../../context/SocketContext";
import Card from "./Card";

const Selection = (
    {
    gameState,
    lobbyID,
    setSelectPlayer,
    setSelectCardType,
    setSelectCard,
    typeOfSelection
    } : {
    gameState:Objects.BackendStateUpdateJSON,
    lobbyID:string,
    setSelectPlayer:React.Dispatch<React.SetStateAction<Objects.BackendGameSelectPlayerJSON | undefined>>,
    setSelectCardType:React.Dispatch<React.SetStateAction<Objects.BackendGameSelectCardTypeJSON | undefined>>,
    setSelectCard:React.Dispatch<React.SetStateAction<Objects.BackendGameSelectCardJSON | undefined>>,
    typeOfSelection:SelectionType
    }
) => {
    // Check if the game is undefined
    if (!gameState)
        return <></>

    // Recover the socket
    const socket = useSocket()

    // Define posible players to apply actions
    const players = gameState.players.filter((player) => player.playerUsername != gameState.playerUsername && player.active)

    // Define variables for storing the selected information
    const [selectedCardType, setSelectedCardType] = useState("")
    const [selectedCard, setSelectedCard] = useState(-1)

    // Define the posible options for card type
    const cardTypeOptions = Object.keys(CardType).filter((key) => isNaN(Number(key))) as (keyof typeof CardType)[];

    const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCardType(e.target.value as keyof typeof CardType)
    }

    const handleClick = () => {
        selectTypeOfCard(   socket,
                            selectedCardType,
                            lobbyID
        )

        setSelectCardType(undefined)

    }

    const selectPlayer = () => {
        return (
            <div className="container-selection-big-user shadow-game">
                <h1>Select a user for apply the action of the card:</h1>
                <div className="users">
                    {   players.map((player, idx) => {
                            return <BigUser key={idx}
                                            player={player}
                                            lobbyID={lobbyID}
                                            setSelectPlayer={setSelectPlayer}/>
                        })
                    }
                </div>

                <div></div>
            </div>
        )
    }

    const selectCardType = () => {
        return (
            <div className="container-selection-big-user shadow-game">
                <label htmlFor="cardSelect">Choose a card:</label>
                <div>
                    <select
                            id="cardSelect"
                            value={selectedCardType}
                            onChange={handleChange}
                            >

                        <option value="">Select a card</option>
                        
                        {cardTypeOptions.map((card) => (
                            <option key={card} value={card}>
                            {card}
                            </option>
                        ))}
                    </select>
                    <button disabled={selectedCardType == ""}
                            onClick={handleClick}>
                        Confirm
                    </button>
                </div>

                <div></div>
            </div>
        )
    }

    const handleCardSelection = () => {
        if (selectedCard == -1)
            return

        selectCard( socket,
                    gameState.playerCards.filter(card => card.id == selectedCard)[0],
                    gameState.lobbyId)
        setSelectCard(undefined);
    }

    const cardSelection = () => {

        return (
            <div className="container-selection-big-user shadow-game">
                <h1>Select the card for doing the favor:</h1>

                <div className="users">
                    {gameState.playerCards.map((card) => {
                        return <Card    key={card.id}
                                        card={card}
                                        isSelected={selectedCard==card.id}
                                        id={card.id}
                                        onClick={setSelectedCard}
                                        setHoveredCard={()=>{}} />
                    })}
                </div>
                
                <button onClick={handleCardSelection}>
                    Confirm
                </button>
            </div>
        )
    }

    const selection = () =>  {
        switch (typeOfSelection) {
            case SelectionType.User:
                return selectPlayer();
            case SelectionType.CardType:
                return selectCardType();
            case SelectionType.Card:
                return cardSelection();
            default:
                return <></>
        }
    }

    return selection();
}

export default Selection;
