import React, { useState } from "react";
import * as Objects from "../../api/JSON"

import "./Select.css"
import BigUser from "./BigUser";
import { CardType } from "../../utils/types";
import { selectTypeOfCard } from "../../services/socketService";
import { useSocket } from "../../context/SocketContext";

const SelectUser = (
    {
    gameState,
    lobbyID,
    setSelectPlayer,
    setSelectCardType,
    isPlayers
    } : {
    gameState:Objects.BackendStateUpdateJSON,
    lobbyID:string,
    setSelectPlayer:React.Dispatch<React.SetStateAction<Objects.BackendGameSelectPlayerJSON | undefined>>,
    setSelectCardType:React.Dispatch<React.SetStateAction<Objects.BackendGameSelectCardTypeJSON | undefined>>,
    isPlayers:boolean
    }
) => {

    if (!gameState)
        return <></>

    const socket = useSocket()
    const players = gameState.players.filter((player) => player.id != gameState.playerId && player.active)
    const [selectedCard, setSelectedCard] = useState("")
    const cardOptions = Object.keys(CardType).filter((key) => isNaN(Number(key))) as (keyof typeof CardType)[];

    const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCard(e.target.value as keyof typeof CardType)
    }

    const handleClick = () => {
        selectTypeOfCard(   socket,
                            selectedCard,
                            lobbyID
        )

        setSelectCardType(undefined)

    }

    return (
        <div className="container-selection-big-user shadow-game">
            <h1>Select a user for apply the action of the card:</h1>

            {isPlayers
            ?   <div className="users">
                    {   players.map((player, idx) => {
                            return <BigUser key={idx}
                                            player={player}
                                            lobbyID={lobbyID}
                                            setSelectPlayer={setSelectPlayer}/>
                        })
                    }
                </div>
            :   <div>
                    <label htmlFor="cardSelect">Choose a card:</label>
                    <select
                            id="cardSelect"
                            value={selectedCard}
                            onChange={handleChange}
                            >

                        <option value="">Select a card</option>
                        
                        {cardOptions.map((card) => (
                            <option key={card} value={card}>
                            {card}
                            </option>
                        ))}
                    </select>
                    <button disabled={selectedCard == ""}
                            onClick={handleClick}>
                        Confirm
                    </button>
                </div>
            }

            <div></div>
        </div>
    )
}

export default SelectUser;
