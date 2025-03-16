import React from "react";
import * as Objects from "../../api/JSON"

import "./Select.css"
import BigUser from "./BigUser";

const SelectUser = (
    {
    gameState,
    lobbyID,
    setSelectPlayer
    } : {
    gameState:Objects.BackendStateUpdateJSON,
    lobbyID:string,
    setSelectPlayer:React.Dispatch<React.SetStateAction<Objects.BackendGameSelectPlayerJSON | undefined>>
    }
) => {

    if (!gameState)
        return <></>

    const players = gameState.players.filter((player) => player.id != gameState.playerId && player.active)

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

export default SelectUser;
