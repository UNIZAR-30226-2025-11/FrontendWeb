import React from 'react'

import './Lobby.css'
import { useNavigate } from 'react-router-dom'
import { routes } from '../../utils/constants'


const LobbyUsers = ({lobbyID, owner} : {lobbyID:string, owner:boolean}) =>
{
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(routes.game)
    }

    return (
        <div className='container-lobby-users'>
            <p>
                Lobby Identifier: {lobbyID}
            </p>

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
