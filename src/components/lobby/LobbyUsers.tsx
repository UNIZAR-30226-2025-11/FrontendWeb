import React from 'react'

import { useNavigate } from 'react-router-dom'
import { routes } from '../../utils/constants'

import * as Objects from "../../api/JSON"
import './Lobby.css'
import { startLobby } from '../../services/socketService'
import { SocketContextType, useSocket } from '../../context/SocketContext'


const LobbyUsers = (
    {} : {}
) =>
{

    const socket: SocketContextType = useSocket();

    const handleClick = () => {
        let id = "";

        if (socket.lobbyCreate) id = socket.lobbyCreate.lobbyId
        else if (socket.lobbyEnter) id = socket.lobbyEnter.lobbyId

        startLobby(socket.socket, id, socket.setLobbyStart)
    }

    return (
        <div className='container-lobby-users'>
            {/* Header with lobby identifier */}
            <p>
                Lobby Identifier: { socket.lobbyCreate?.lobbyId ||
                                    socket.lobbyEnter?.lobbyId ||
                                    socket.lobbyEnter?.errorMsg ||
                                    "Loading..." }
            </p>

            {/* List of users */}
            {socket.lobbyState?.players.map((user) => (
                <li key={user.name}>{user.name}</li>
            )) ||
            <ol>
                <li>User 1</li>
                <li>User 2</li>
            </ol>}

            {/* Button for starting the game */}
            {socket.lobbyCreate
            ?   <button className='button-lobby'
                        onClick={handleClick}>
                    Start
                </button>
            : <div></div>
            }
        </div>
    )
}

export default LobbyUsers;
