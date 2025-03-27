import React, { useState } from "react";
import * as Objects from "../../api/JSON"

import "./Select.css"
import BigUser from "./BigUser";
import { CardType } from "../../utils/types";
import { playCards, selectCard, selectNopeUsage, selectTypeOfCard } from "../../services/socketService";
import { SocketContextType, useSocket } from "../../context/SocketContext";
import Card from "./Card";

const Selection = (
    {} : {}
) => {
    // Recover the socket
    const socket:SocketContextType = useSocket()

    // Check if the game is undefined
    if (socket.gameState === undefined)
        return <></>

    // Define posible players to apply actions
    const players = socket.gameState.players.filter((player) => player.playerUsername != socket.gameState!.playerUsername && player.active)

    // Define variables for storing the selected information
    const [selectedCardType, setSelectedCardType] = useState("")
    const [selectedCard, setSelectedCard] = useState(-1)

    // Define the posible options for card type
    const cardTypeOptions = Object.keys(CardType).filter((key) => isNaN(Number(key))) as (keyof typeof CardType)[];

    const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCardType(e.target.value as keyof typeof CardType)
    }

    const isPlayers:boolean = socket.selectPlayer !== undefined;
    const lobbyID:string = socket.gameState.lobbyId;

    const handleClick = () => {
        selectTypeOfCard(   socket.socket,
                            selectedCardType,
                            lobbyID,
        )

        socket.setSelectCardType(undefined)
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
                                            />
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
        if (selectedCard == -1 || !socket.gameState)
            return

        selectCard( socket.socket,
                    socket.gameState.playerCards.filter(card => card.id == selectedCard)[0],
                    socket.gameState.lobbyId)
                    
        socket.setSelectCard(undefined);
    }

    const cardSelection = () => {

        return (
            <div className="container-selection-big-user shadow-game">
                <h1>Select the card for doing the favor:</h1>

                <div className="users">
                    {   socket.gameState?.playerCards.map((card) => {
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

    const handlePlayNOPE = (e:React.MouseEvent<HTMLDivElement>) => {
        selectNopeUsage(socket.socket,
                        e.currentTarget.id=="NOPE-YES",
                        socket.gameState?.lobbyId!
        )
        socket.setSelectNope(undefined)
    }

    const selectNope = () => {
        return (
            <div className="container-selection-big-user shadow-game">
                <h1>You have a NOPE card. Do you want to use it?:</h1>

                <div className="users">
                    <div className="option"
                         id="NOPE-YES"
                         onClick={handlePlayNOPE}>
                        <p>
                            Yes
                        </p>
                    </div>

                    <div className="option"
                         id="NOPE-NO"
                         onClick={handlePlayNOPE}>
                        <p>
                            No
                        </p>
                    </div>
                </div>
                
                <div></div>
            </div>
        )
    }

    const selection = () =>  {
        if (socket.selectPlayer)
            return selectPlayer();
        else if (socket.selectCardType)
            return selectCardType();
        else if (socket.selectCard)
            return cardSelection();
        else if (socket.selectNope)
            return selectNope();
        else
            return <></>
    }

    return selection();
}

export default Selection;
