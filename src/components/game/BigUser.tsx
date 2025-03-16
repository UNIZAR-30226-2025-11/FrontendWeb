import React from "react";
import * as Objects from "../../api/JSON"

import "./Select.css"
import { useSocket } from "../../context/SocketContext";
import { selectPlayer } from "../../services/socketService";

const BigUser = (
    {
    player,
    lobbyID,
    setSelectPlayer
    } : {
    player:Objects.PlayerJSON,
    lobbyID:string,
    setSelectPlayer:React.Dispatch<React.SetStateAction<Objects.BackendGameSelectPlayerJSON | undefined>>
    }
) => {

    const socket = useSocket();

    const handleClick = (playerID:number) => {
        selectPlayer(   socket,
                        playerID,
                        lobbyID,
        )
        setSelectPlayer(undefined)
    }

    return (
        <div className="div-user div-big-user"
                onClick={() => {handleClick(player.id)}}>
            <img    className="img-user"
                    src="./assets/user.png">
            </img>
            <span className="card-count">
                {player.numCards}
            </span>
            <p className="name-user">
                {player.id}
            </p>
        </div>
    )
}

export default BigUser
