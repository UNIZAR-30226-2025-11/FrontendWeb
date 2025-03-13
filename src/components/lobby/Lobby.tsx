import React, { useState } from 'react'

import './Lobby.css'


const Lobby = ({setLobbyVisible,
                setLobbyListVisible,
                setOwner} : {
                setLobbyVisible:React.Dispatch<React.SetStateAction<boolean>>,
                setLobbyListVisible:React.Dispatch<React.SetStateAction<boolean>>,
                setOwner:React.Dispatch<React.SetStateAction<boolean>>}) =>
{
    const [lobbyID, setLobbyID] = useState("")

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLobbyID(e.target.value)
    }

    const handleClose = () => {
        setLobbyVisible(false)
    }

    const handleJoin = () => {
        setLobbyVisible(false)
        setLobbyListVisible(true)
        setOwner(false)
    }

    const handleCreate = () => {
        setLobbyVisible(false)
        setLobbyListVisible(true)
        setOwner(true)
    }

    return (
        <div className='container-lobby'>
            <button id='close-button-lobby'
                onClick={handleClose}>
                Close
            </button>

            {/* Join a lobby */}
            <div className='semi-container'>
                <form>
                    <input
                        type='text'
                        name='lobby-id'
                        placeholder='Insert the lobby identifier'
                        value={lobbyID}
                        onChange={handleChange}
                        required>
                    </input>

                    <button type='submit'
                        className='button-lobby'
                        onClick={handleJoin}>
                        Join
                    </button>
                </form>
            </div>

            {/* Create a lobby */}
            <div className='semi-container'>
                <button className='button-lobby'
                        onClick={handleCreate}>
                    Create a new lobby
                </button>
            </div>
        </div>
    )
}

export default Lobby;
