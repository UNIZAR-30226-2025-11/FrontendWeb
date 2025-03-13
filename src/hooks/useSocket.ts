import { useEffect, useState } from "react";

import { useSocket } from "../context/SocketContext";

import * as Objects from "../api/JSON"


export const useSocketHandlers = () => {
    // Create the sockets
    const socket = useSocket();
    
    // Create all the states for the sockets connection
    const [lobbyCreate, setLobbyCreate] = useState<Objects.BackendCreateLobbyResponseJSON | undefined>(undefined);
    const [lobbyEnter, setLobbyEnter] = useState<Objects.BackendJoinLobbyResponseJSON | undefined>(undefined);
    const [lobbyStart, setLobbyStart] = useState<Objects.BackendStartLobbyResponseJSON | undefined>(undefined);
    const [gameState, setGameState] = useState<Objects.BackendStateUpdateJSON | undefined>(undefined);
    const [lobbyStartId, setLobbyStartId] = useState<Objects.BackendLobbyStartedJSON | undefined>(undefined);

    // Specify where to hear for information
    useEffect(() => {
        socket.on("game-state", setGameState);
        socket.on("lobby-started", setLobbyStartId);

        return () => {
            socket.off("game-state", setGameState);
            socket.off("lobby-started", setLobbyStartId);
        };
    }, [socket]);

    return { lobbyCreate, setLobbyCreate, lobbyEnter, setLobbyEnter, lobbyStart, setLobbyStart, gameState, lobbyStartId };
};
