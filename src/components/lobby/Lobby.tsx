import React, { useState } from 'react'

import './Lobby.css'
import { createLobby } from '../../services/socketService'
import { useSocket } from '../../context/SocketContext'

import * as Objects from "../../api/JSON"

/**
 * Creates the Lobby screen, in which the user can join a created lobby
 * or create his own.
 * 
 * @param setLobbyVisible Function for putting this screen visible or not.
 * @param setLobbyListVisible Function for putting the next screen visible.
 * @param setOwner Function for putting lider or not to the user
 * 
 * @returns The Lobby screen.
 */
const Lobby = ({setLobbyCreate,
                setLobbyVisible,
                setLobbyListVisible,
                setOwner} : {
                setLobbyCreate:React.Dispatch<React.SetStateAction<Objects.BackendCreateLobbyResponseJSON | undefined>>,
                setLobbyVisible:React.Dispatch<React.SetStateAction<boolean>>,
                setLobbyListVisible:React.Dispatch<React.SetStateAction<boolean>>,
                setOwner:React.Dispatch<React.SetStateAction<boolean>>}) =>
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
        setLobbyVisible(false)
        setLobbyListVisible(true)
        setOwner(false)
    }

    // const f = (data: Objects.BackendCreateLobbyResponseJSON) => {
    //     console.log("Hola")
    //     console.log(data)
    //     setLobbyCreate(data)
    //     console.log("A")
    //     console.log(data)
    //     console.log("B")
    //     console.log(lobbyCreate)
    // }

    /**
     * Defines the actions to do if the user
     * creates a new Lobby
     */
    const handleCreate = () => {
        createLobby(socket, numPlayers, setLobbyCreate)

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
