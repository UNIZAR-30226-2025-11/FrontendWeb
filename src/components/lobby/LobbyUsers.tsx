import React from 'react'

import { startLobby } from '../../services/socketService'
import { SocketContextType, useSocket } from '../../context/SocketContext'

import './LobbyUsers.css'

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

    const handleLeave = () => {
        window.location.reload();
    }

    return (
        <div className='lobby-container lobby-container-users'>
            {/* Header with lobby identifier */}
            <h1>
                Current state of the lobby
            </h1>
            <p>
                ID: { socket.lobbyCreate?.lobbyId ||
                                    socket.lobbyEnter?.lobbyId ||
                                    socket.lobbyEnter?.errorMsg ||
                                    "Loading..." }
            </p>

            <ol>
            {/* List of users */}
            {socket.lobbyState?.players.map((user) => {
                return <li key={user.name}>{user.name}</li>
            })}
            </ol>

            {/* Button for starting the game */}
            {socket.lobbyCreate
            ?   <button className='button-lobby'
                        onClick={handleClick}>
                    Start
                </button>
            :   <button className='button-lobby'
                        onClick={handleLeave}>
                    Leave the lobby
                </button>
            }
        </div>
    )
}

export default LobbyUsers;
