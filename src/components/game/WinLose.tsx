import React from "react"
import { routes } from "../../utils/constants"
import { useNavigate } from "react-router-dom";

import "./WinLose.css"
import { useSocket } from "../../context/SocketContext";

const WinLose = (
    {
    win
    } : {
    win:boolean
    }
) => {
    const navegate = useNavigate();
    const socket = useSocket();

    const handleClick = () => {
        socket.setWinner(undefined);
        socket.setGameState(undefined);
        socket.setLobbyStart(undefined);
        socket.setLobbyCreate(undefined);
        socket.setLobbyEnter(undefined);
        navegate(routes.gamemenu);
    }

    return (
        <div className="win-lose-container">
            {win
            ?   <div className="win-message">
                    <h1>You won !</h1>
                    <p>Congratulations, you&apos;ve won the game!</p>
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