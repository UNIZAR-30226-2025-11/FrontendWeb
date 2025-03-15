import { use, useEffect, useState } from "react";

import { useSocket } from "../context/SocketContext";

import * as Objects from "../api/JSON"


export const useSocketHandlers = () => {
    // Create the sockets
    const socket = useSocket();
    
    // -------------------------------------------------------------------------
    // GAME STATE
    // -------------------------------------------------------------------------
    const [gameState, setGameState] =
    useState<Objects.BackendStateUpdateJSON | undefined>(undefined);

    // -------------------------------------------------------------------------
    // PLAY A CARD
    // -------------------------------------------------------------------------
    const [cardPlayedResult, setCardPlayedResult] =
    useState<Objects.BackendGamePlayedCardsResponseJSON | undefined>(undefined);


    // -------------------------------------------------------------------------
    // DEFINE WINNER
    // -------------------------------------------------------------------------
    const [winner, setWinner] =
    useState<Objects.BackendWinnerJSON | undefined> (undefined);


    // -------------------------------------------------------------------------
    // SELECT CARDS AND PLAYERS
    // -------------------------------------------------------------------------
    const [selectPlayer, setSelectPlayer] =
    useState<Objects.BackendGameSelectPlayerJSON | undefined> (undefined);

    const [selectCardType, setSelectCardType] =
    useState<Objects.BackendGameSelectCardTypeJSON | undefined>(undefined);


    // -------------------------------------------------------------------------
    // LOBBIES
    // -------------------------------------------------------------------------
    const [lobbyCreate, setLobbyCreate] =
    useState<Objects.BackendCreateLobbyResponseJSON | undefined>(undefined);

    const [lobbyEnter, setLobbyEnter] =
    useState<Objects.BackendJoinLobbyResponseJSON | undefined>(undefined);

    const [lobbyState, setLobbyState] =
    useState<Objects.BackendLobbyStateUpdateJSON | undefined>(undefined);

    const [lobbyStart, setLobbyStart] =
    useState<Objects.BackendStartLobbyResponseJSON | undefined>(undefined);

    const [lobbyStarted, setLobbyStarted] =
    useState<Objects.BackendStartGameResponseJSON | undefined>(undefined);


    // -------------------------------------------------------------------------
    // ACTIONS
    // -------------------------------------------------------------------------
    const [actions, setActions] =
    useState<Objects.BackendNotifyActionJSON | undefined>(undefined);



    // Specify where to hear for information
    useEffect(() => {
        socket.on("game-state", setGameState);
        socket.on("lobby-state", setLobbyState);
        socket.on("start-game", setLobbyStarted);
        socket.on("winner", setWinner);
        socket.on("game-select-player", setSelectPlayer);
        socket.on("game-select-card-type", setSelectCardType);
        socket.on("notify-action", setActions);

        return () => {
            socket.off("game-state", setGameState);
            socket.off("lobby-state", setLobbyState);
            socket.off("start-game", setLobbyStarted);
            socket.off("winner", setWinner);
            socket.off("game-select-player", setSelectPlayer);
            socket.off("game-select-card-type", setSelectCardType);
            socket.off("notify-action", setActions)
        };
    }, [socket]);

    return {    gameState,
                cardPlayedResult, setCardPlayedResult,
                winner,
                selectPlayer,
                selectCardType,
                lobbyCreate, setLobbyCreate,
                lobbyEnter, setLobbyEnter,
                lobbyState, setLobbyState,
                lobbyStart, setLobbyStart,
                lobbyStarted,
                actions};
};
