import React, { useEffect } from "react"
import { routes } from "../../utils/constants"
import { useNavigate } from "react-router-dom";

import "./WinLose.css"
import { useSocket } from "../../context/SocketContext";
import { useUser } from "../../context/UserContext";
import { fetchUser } from "../../services/apiService";

const WinLose = (
    {
    win
    } : {
    win:boolean
    }
) => {
    const navegate = useNavigate();
    const socket = useSocket();
    const userContext = useUser();

    const handleClick = () => {
        socket.setWinner(undefined);
        socket.setGameState(undefined);
        socket.setLobbyStart(undefined);
        socket.setLobbyCreate(undefined);
        socket.setLobbyEnter(undefined);
        socket.setLobbyState(undefined);
        socket.setMessagesChat(undefined);
        navegate(routes.gamemenu);
    }

    useEffect(() => {
        fetchUser(  userContext.setUser,
                    userContext.setIsLoading);
    }, [])

    return (
        <div className="win-lose-container">
            {win
            ?   <div className="win-message">
                    <h1>You won !</h1>
                    <p>Congratulations, you&apos;ve won the game!</p>
                    <p>You have won {socket.winner?.coinsEarned} coins!</p>
                </div>
            :
                <div className="loose-message">
                <h1>You lost !</h1>
                <p>Too bad you didn&apos;t succeed this time.</p>
                </div>
            }
            <button onClick={handleClick}
                    className="restart-button">
                Back to menu
            </button>
        </div>
    )
}

export default WinLose