import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SERVER } from "../utils/config";
import * as Objects from "../api/JSON";

// Create the socket
const socket = io(SERVER, { withCredentials: true });

// Define the shape of the context
export interface SocketContextType {
    socket: Socket;
    gameState: Objects.BackendStateUpdateJSON | undefined;
    setGameState:React.Dispatch<React.SetStateAction<Objects.BackendStateUpdateJSON | undefined>>;
    cardPlayedResult: Objects.BackendGamePlayedCardsResponseJSON | undefined;
    setCardPlayedResult: React.Dispatch<React.SetStateAction<Objects.BackendGamePlayedCardsResponseJSON | undefined>>;
    winner: Objects.BackendWinnerJSON | undefined;
    setWinner:React.Dispatch<React.SetStateAction<Objects.BackendWinnerJSON | undefined>>;
    selectPlayer: Objects.BackendGameSelectPlayerJSON | undefined;
    setSelectPlayer: React.Dispatch<React.SetStateAction<Objects.BackendGameSelectPlayerJSON | undefined>>;
    selectCardType: Objects.BackendGameSelectCardTypeJSON | undefined;
    setSelectCardType: React.Dispatch<React.SetStateAction<Objects.BackendGameSelectCardTypeJSON | undefined>>;
    selectCard: Objects.BackendGameSelectCardJSON | undefined;
    setSelectCard: React.Dispatch<React.SetStateAction<Objects.BackendGameSelectCardJSON | undefined>>;
    selectNope: Objects.BackendGameSelectNopeJSON | undefined;
    setSelectNope: React.Dispatch<React.SetStateAction<Objects.BackendGameSelectNopeJSON | undefined>>;
    lobbyCreate: Objects.BackendCreateLobbyResponseJSON | undefined;
    setLobbyCreate: React.Dispatch<React.SetStateAction<Objects.BackendCreateLobbyResponseJSON | undefined>>;
    lobbyEnter: Objects.BackendJoinLobbyResponseJSON | undefined;
    setLobbyEnter: React.Dispatch<React.SetStateAction<Objects.BackendJoinLobbyResponseJSON | undefined>>;
    lobbyState: Objects.BackendLobbyStateUpdateJSON | undefined;
    setLobbyState: React.Dispatch<React.SetStateAction<Objects.BackendLobbyStateUpdateJSON | undefined>>;
    lobbyStart: Objects.BackendStartLobbyResponseJSON | undefined;
    setLobbyStart: React.Dispatch<React.SetStateAction<Objects.BackendStartLobbyResponseJSON | undefined>>;
    lobbyStarted: Objects.BackendStartGameResponseJSON | undefined;
    actions: Objects.BackendNotifyActionJSON | undefined;
    setActions: React.Dispatch<React.SetStateAction<Objects.BackendNotifyActionJSON | undefined>>;
    canReconnect: Objects.BackendPlayerCanReconnectJSON | undefined;
    setCanReconnect: React.Dispatch<React.SetStateAction<Objects.BackendPlayerCanReconnectJSON | undefined>>;
    messagesChat: Objects.BackendGetMessagesJSON | undefined;
    setMessagesChat: React.Dispatch<React.SetStateAction<Objects.BackendGetMessagesJSON | undefined>>;
    friendJoinRequest: Objects.BackendSendFriendRequestEnterLobbyJSON | undefined;
    setFriendJoinRequest: React.Dispatch<React.SetStateAction<Objects.BackendSendFriendRequestEnterLobbyJSON | undefined>>;
    // New invitation handlers
    acceptInvitation: (lobbyId: string) => void;
    declineInvitation: (lobbyId: string) => void;
    leaveGame: (lobbyId: string) => void;
}

// Create the context
const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {


    // -------------------------------------------------------------------------
    // GAME STATE
    // -------------------------------------------------------------------------
    const [gameState, setGameState] = useState<Objects.BackendStateUpdateJSON | undefined>(undefined);

    // -------------------------------------------------------------------------
    // PLAY A CARD
    // -------------------------------------------------------------------------
    const [cardPlayedResult, setCardPlayedResult] = useState<Objects.BackendGamePlayedCardsResponseJSON | undefined>(undefined);

    // -------------------------------------------------------------------------
    // DEFINE WINNER
    // -------------------------------------------------------------------------
    const [winner, setWinner] = useState<Objects.BackendWinnerJSON | undefined>(undefined);

    // -------------------------------------------------------------------------
    // SELECT CARDS AND PLAYERS
    // -------------------------------------------------------------------------
    const [selectPlayer, setSelectPlayer] = useState<Objects.BackendGameSelectPlayerJSON | undefined>(undefined);
    const [selectCardType, setSelectCardType] = useState<Objects.BackendGameSelectCardTypeJSON | undefined>(undefined);
    const [selectCard, setSelectCard] = useState<Objects.BackendGameSelectCardJSON | undefined>(undefined);
    const [selectNope, setSelectNope] = useState<Objects.BackendGameSelectNopeJSON | undefined>(undefined);

    // -------------------------------------------------------------------------
    // LOBBIES
    // -------------------------------------------------------------------------
    const [lobbyCreate, setLobbyCreate] = useState<Objects.BackendCreateLobbyResponseJSON | undefined>(undefined);
    const [lobbyEnter, setLobbyEnter] = useState<Objects.BackendJoinLobbyResponseJSON | undefined>(undefined);
    const [lobbyState, setLobbyState] = useState<Objects.BackendLobbyStateUpdateJSON | undefined>(undefined);
    const [lobbyStart, setLobbyStart] = useState<Objects.BackendStartLobbyResponseJSON | undefined>(undefined);
    const [lobbyStarted, setLobbyStarted] = useState<Objects.BackendStartGameResponseJSON | undefined>(undefined);

    // -------------------------------------------------------------------------
    // ACTIONS
    // -------------------------------------------------------------------------
    const [actions, setActions] = useState<Objects.BackendNotifyActionJSON | undefined>(undefined);

    // -------------------------------------------------------------------------
    // CHAT
    // -------------------------------------------------------------------------
    const [messagesChat, setMessagesChat] = useState<Objects.BackendGetMessagesJSON | undefined>(undefined);


    // -------------------------------------------------------------------------
    // FRIENDS
    // -------------------------------------------------------------------------
    const [friendJoinRequest, setFriendJoinRequest] = useState<Objects.BackendSendFriendRequestEnterLobbyJSON | undefined>(undefined);


    // -------------------------------------------------------------------------
    // RECONNECTING
    // -------------------------------------------------------------------------
    const [canReconnect, setCanReconnect] = useState<Objects.BackendPlayerCanReconnectJSON | undefined>(undefined);

    // -------------------------------------------------------------------------
    // HANDLERS (Using useCallback for stability)
    // -------------------------------------------------------------------------

    const handleFriendJoinRequest = useCallback((data: Objects.BackendSendFriendRequestEnterLobbyJSON) => {
        setFriendJoinRequest(data);
    }, []);

    
    const handleGameState = useCallback((data: Objects.BackendStateUpdateJSON) => {
        setGameState(data);
    }, []);

    const handleWinnerWrapper = useCallback((data: Objects.BackendWinnerJSON) => {
        setWinner(data);
    }, [socket]);

    const handleSelectPlayer = useCallback((data: Objects.BackendGameSelectPlayerJSON) => {
        setSelectPlayer(data);
    }, []);

    const handleSelectCardType = useCallback((data: Objects.BackendGameSelectCardTypeJSON) => {
        setSelectCardType(data);
    }, []);

    const handleSelectCard = useCallback((data: Objects.BackendGameSelectCardJSON) => {
        setSelectCard(data);
    }, []);

    const handleSelectNope = useCallback((data: Objects.BackendGameSelectNopeJSON) => {
        setSelectNope(data);
    }, []);

    const handleLobbyStateUpdate = useCallback((data: Objects.BackendLobbyStateUpdateJSON) => {
        setLobbyState(data);
    }, []);

    const handleStartGame = useCallback((data: Objects.BackendStartGameResponseJSON) => {
        setLobbyStarted(data);
    }, []);

    const handleNotifyAction = useCallback((data: Objects.BackendNotifyActionJSON) => {
        setActions(data);
    }, []);

    const handleGetMessages = useCallback((data: Objects.BackendGetMessagesJSON) => {
        setMessagesChat(data);
    }, []);

    const handleCanReconnect = useCallback((data: Objects.BackendPlayerCanReconnectJSON) => {
        setCanReconnect(data);
    }
    , []);

    // -------------------------------------------------------------------------
    const acceptInvitation = useCallback((lobbyId: string) => {
        if (friendJoinRequest) {
            const msg: Objects.FrontendResponseFriendRequestEnterLobbyJSON = {
                error: false,
                errorMsg: "",
                lobbyId: lobbyId,
                accept: true,
                friendSendingRequest: friendJoinRequest.friendSendingRequest
            }
            // Send socket message to accept the invitation
            socket.emit("receive-friend-join-lobby-request", msg);
            setFriendJoinRequest(undefined);
        }
    }, [friendJoinRequest]);

    const leaveGame = useCallback((lobbyId: string) => {
        const msg: Objects.FrontendSurrenderJSON = {
            error: false,
            errorMsg: "",
            lobbyId: lobbyId,
        }
        console.log("Surrendering from lobby: ", lobbyId);
        // Send socket message to leave the game
        socket.emit("surrender", msg);
    }, [gameState]);
    
    const declineInvitation = useCallback((lobbyId: string) => {
        if (friendJoinRequest) {
            const msg: Objects.FrontendResponseFriendRequestEnterLobbyJSON = {
                error: false,
                errorMsg: "",
                lobbyId: lobbyId,
                accept: false,
                friendSendingRequest: friendJoinRequest.friendSendingRequest
            }
            // Send socket message to accept the invitation
            socket.emit("receive-friend-join-lobby-request", msg);
            setFriendJoinRequest(undefined);
        }
    }, [friendJoinRequest]);


    useEffect(() => {
        // Lobby
        socket.on("lobby-state", handleLobbyStateUpdate);

        // Game
        socket.on("game-state", handleGameState);
        socket.on("start-game", handleStartGame);

        // Game actions
        socket.on("game-select-player", handleSelectPlayer);
        socket.on("game-select-card-type", handleSelectCardType);
        socket.on("game-select-card", handleSelectCard);
        socket.on("game-select-nope", handleSelectNope);

        // Global actions
        socket.on("notify-action", handleNotifyAction);

        // Chat
        socket.on("get-messages", handleGetMessages);

        // Winner
        socket.on("winner", handleWinnerWrapper);

        // Friends
        socket.on("receive-friend-join-lobby-request", handleFriendJoinRequest);

        // Reconnect
        socket.on("player-reconnect", handleCanReconnect);

        return () => {
            // Lobby
            socket.off("lobby-state", handleLobbyStateUpdate);

            // Game
            socket.off("game-state", handleGameState);
            socket.off("start-game", handleStartGame);

            // Game actions
            socket.off("game-select-player", handleSelectPlayer);
            socket.off("game-select-card-type", handleSelectCardType);
            socket.off("game-select-card", handleSelectCard);
            socket.off("game-select-nope", handleSelectNope);


            // Global actions
            socket.off("notify-action", handleNotifyAction);

            // Chat
            socket.off("get-messages", handleGetMessages);

            // Winner
            socket.off("winner", handleWinnerWrapper);

            // Friends
            socket.off("receive-friend-join-lobby-request", handleFriendJoinRequest);

            // Reconnect
            socket.off("player-reconnect", handleCanReconnect);
        };
    }, [
        socket,
        handleGameState,
        handleStartGame,
        handleSelectPlayer,
        handleSelectCardType,
        handleSelectCard,
        handleSelectNope,
        handleLobbyStateUpdate,
        handleWinnerWrapper,
        handleNotifyAction,
        handleGetMessages,
        handleCanReconnect,
        handleFriendJoinRequest,
    ]);

    return (
        <SocketContext.Provider value={{
            socket,
            gameState,
            setGameState,
            cardPlayedResult,
            setCardPlayedResult,
            winner,
            setWinner,
            selectPlayer,
            setSelectPlayer,
            selectCardType,
            setSelectCardType,
            selectCard,
            setSelectCard,
            selectNope,
            setSelectNope,
            lobbyCreate,
            setLobbyCreate,
            lobbyEnter,
            setLobbyEnter,
            lobbyState,
            setLobbyState,
            lobbyStart,
            setLobbyStart,
            lobbyStarted,
            actions,
            setActions,
            canReconnect,
            setCanReconnect,
            messagesChat,
            setMessagesChat,
            friendJoinRequest,
            setFriendJoinRequest,
            acceptInvitation,
            declineInvitation,
            leaveGame,
        }}>
            {children}
        </SocketContext.Provider>
    );
};

// Hook for using the socket context
export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};
