import React from 'react'

import './Lobby.css'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../utils/constants'

import { useSocketHandlers } from '../../hooks/useSocket'

import * as Objects from "../../api/JSON"


const LobbyUsers = ({lobbyCreate, owner} : {lobbyCreate:Objects.BackendCreateLobbyResponseJSON | undefined, owner:boolean}) =>
{
    const navigate = useNavigate()

    const handleClick = () => {
        // navigate(routes.game)
        // console.log(lobbyID)
    }

    return (
        <div className='container-lobby-users'>
            {
                lobbyCreate === undefined &&
                <p>
                    Lobby Identifier: Loading...
                </p>
            }

            {
                lobbyCreate &&
                <p>
                    Lobby Identifier: {lobbyCreate.lobbyId}
                </p>
            }

            <ol>
                <li>One user</li>
                <li>Another user</li>
            </ol>

            {owner && <button className='button-lobby'
                onClick={handleClick}>
                Start
            </button>}
        </div>
    )
}

export default LobbyUsers;
