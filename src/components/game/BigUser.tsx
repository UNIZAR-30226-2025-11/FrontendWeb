import React from "react";
import * as Objects from "../../api/JSON"

import "./Select.css"
import { useSocket } from "../../context/SocketContext";
import { selectPlayer } from "../../services/socketService";
import { IMAGES_EXTENSION, IMAGES_PATH } from "../../services/apiShop";

const BigUser = (
    {
    player,
    lobbyID,
    } : {
    player:Objects.PlayerJSON,
    lobbyID:string
    }
) => {

    const socket = useSocket();

    const handleClick = (username:string) => {
        selectPlayer(   socket.socket,
                        username,
                        lobbyID,
        )

        socket.setSelectPlayer(undefined);
    }

    return (
        <div className="div-user div-big-user"
                onClick={() => {handleClick(player.playerUsername)}}>
            <img    className="img-user"
                    src={`${IMAGES_PATH}/avatar/${player.playerAvatar}${IMAGES_EXTENSION}`}>
            </img>
            <span className="card-count">
                {player.numCards}
            </span>
            <p className="name-user">
                {player.playerUsername}
            </p>
        </div>
    )
}

export default BigUser
