import React from 'react'

import './Lobby.css'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../utils/constants'

import { useSocketHandlers } from '../../hooks/useSocket'

import * as Objects from "../../api/JSON"


const LobbyUsers = (
    {
    lobbyEnter,
    lobbyCreate,
    lobbyState,
    } : {
    lobbyEnter:Objects.BackendJoinLobbyResponseJSON | undefined,
    lobbyCreate:Objects.BackendCreateLobbyResponseJSON | undefined,
    lobbyState:Objects.BackendLobbyStateUpdateJSON | undefined,
    }) =>
{
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
            {lobbyCreate && <button className='button-lobby'>
                Start
            </button>}
        </div>
    )
}

export default LobbyUsers;
