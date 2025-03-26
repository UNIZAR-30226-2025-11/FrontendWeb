import React, { useState } from "react";
import * as Objects from "../../api/JSON"

import "./Select.css"
import BigUser from "./BigUser";
import { CardType } from "../../utils/types";
import { selectTypeOfCard } from "../../services/socketService";
import { SocketContextType, useSocket } from "../../context/SocketContext";

const SelectUser = (
    {} : {}
) => {

    const socket:SocketContextType = useSocket()

    if (socket.gameState === undefined)
        return <></>

    const players = socket.gameState.players.filter((player) => player.playerUsername != socket.gameState!.playerUsername && player.active)
    const [selectedCard, setSelectedCard] = useState("")
    const cardOptions = Object.keys(CardType).filter((key) => isNaN(Number(key))) as (keyof typeof CardType)[];

    const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCard(e.target.value as keyof typeof CardType)
    }

    const isPlayers:boolean = socket.selectPlayer !== undefined;
    const lobbyID:string = socket.gameState.lobbyId;

    const handleClick = () => {
        selectTypeOfCard(   socket.socket,
                            selectedCard,
                            lobbyID,
        )

        socket.setSelectCardType(undefined)
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
                                            />
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
