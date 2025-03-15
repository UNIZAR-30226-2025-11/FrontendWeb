import React from 'react'

import { useNavigate } from 'react-router-dom'
import { routes } from '../../utils/constants'

import * as Objects from "../../api/JSON"
import './Lobby.css'
import { startLobby } from '../../services/socketService'
import { useSocket } from '../../context/SocketContext'


const LobbyUsers = (
    {
    lobbyEnter,
    lobbyCreate,
    lobbyState,
    setLobbyStart,
    } : {
    lobbyEnter:Objects.BackendJoinLobbyResponseJSON | undefined,
    lobbyCreate:Objects.BackendCreateLobbyResponseJSON | undefined,
    lobbyState:Objects.BackendLobbyStateUpdateJSON | undefined,
    setLobbyStart:React.Dispatch<React.SetStateAction<Objects.BackendStartLobbyResponseJSON | undefined>>
    }) =>
{

    const socket = useSocket();

    const handleClick = () => {
        let id = "";

        if (lobbyCreate) id = lobbyCreate.lobbyId
        else if (lobbyEnter) id = lobbyEnter.lobbyId

        startLobby(socket, id, setLobbyStart)
    }

    return (
        <div className='container-lobby-users'>
            {/* Header with lobby identifier */}
            <p>
                Lobby Identifier: { lobbyCreate?.lobbyId ||
                                    lobbyEnter?.lobbyId ||
                                    lobbyEnter?.errorMsg ||
                                    "Loading..." }
            </p>

            {/* List of users */}
            {lobbyState?.players.map((user) => (
                <li key={user.name}>{user.name}</li>
            )) ||
            <ol>
                <li>User 1</li>
                <li>User 2</li>
            </ol>}

            {/* Button for starting the game */}
            {lobbyCreate
            ?   <button className='button-lobby'
                        onClick={handleClick}>
                    Start
                </button>
            : <></>
            }
        </div>
    )
}

export default LobbyUsers;
