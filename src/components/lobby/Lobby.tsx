import React, { useState } from 'react'

import './Lobby.css'
import { createLobby, joinLobby } from '../../services/socketService'
import { useSocket } from '../../context/SocketContext'

import * as Objects from "../../api/JSON"

/**
 * Creates the Lobby screen, in which the user can join a created lobby
 * or create his own.
 * 
 * @param setLobbyVisible Function for putting this screen visible or not.
 * @param setLobbyListVisible Function for putting the next screen visible.
 * 
 * @returns The Lobby screen.
 */
const Lobby = (
    {
    setLobbyCreate,
    setLobbyVisible,
    setLobbyListVisible,
    setLobbyEnter
    } : {
    setLobbyCreate:React.Dispatch<React.SetStateAction<Objects.BackendCreateLobbyResponseJSON | undefined>>,
    setLobbyVisible:React.Dispatch<React.SetStateAction<boolean>>,
    setLobbyListVisible:React.Dispatch<React.SetStateAction<boolean>>,
    setLobbyEnter:React.Dispatch<React.SetStateAction<Objects.BackendJoinLobbyResponseJSON | undefined>>
    }) =>
{
    // Id of the lobby to join
    const [ lobbyID, setLobbyID ] = useState("");

    // Number of players for the game
    const [numPlayers, setNumPlayers] = useState(2);

    const socket = useSocket();

    /**
     * Save the information inside the text filed
     */
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLobbyID(e.target.value)
    }

    /**
     * Save the information inside the text filed
     */
    const handleChangeNumPlayers = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNumPlayers(Number(e.target.value))
    }

    /**
     * Close this window
     */
    const handleClose = () => {
        setLobbyVisible(false)
    }

    /**
     * Defines the actios to do if the user
     * joins an existent Lobby
     */
    const handleJoin = () => {
        joinLobby(socket, lobbyID, setLobbyEnter)

        setLobbyVisible(false)
        setLobbyListVisible(true)
    }

    /**
     * Defines the actions to do if the user
     * creates a new Lobby
     */
    const handleCreate = () => {
        // Send to the backend the information
        createLobby(socket, numPlayers, setLobbyCreate)

        // Update windows
        setLobbyVisible(false)
        setLobbyListVisible(true)
    }

    return (
        <div className='container-lobby'>
            <button id='close-button-lobby'
                onClick={handleClose}>
                Close
            </button>

            {/* Join a lobby */}
            <div className='semi-container'>
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
            </div>

            {/* Create a lobby */}
            <div className='semi-container'>
                <input  name='num-players'
                        type='number'
                        placeholder='Number of max players'
                        min={2}
                        max={4}
                        required
                        value={numPlayers}
                        onChange={handleChangeNumPlayers}>
                </input>
                <button className='button-lobby'
                        onClick={handleCreate}>
                    Create a new lobby
                </button>

            {/* {
                lobbyCreate &&
                <p>
                    Texto: {lobbyCreate.lobbyId}
                </p>
            } */}
            </div>
        </div>
    )
}

export default Lobby;
