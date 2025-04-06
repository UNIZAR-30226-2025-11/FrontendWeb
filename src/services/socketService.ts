import { Socket } from "socket.io-client";
import * as Objects from "../api/JSON";

/**
 * Creates a new lobby with specific parameters for
 * the game
 * 
 * @param socket The socket with the backend
 * @param numPlayers The maximum number of players
 * @param callback The function that will be executed
 *      when the server answers
 */
export const createLobby = (socket: Socket,
                            numPlayers: number,
                            callback: (data: Objects.BackendCreateLobbyResponseJSON) => void) =>
{
    // Create the request
    const request: Objects.FrontendCreateLobbyJSON =
    {
        error: false,
        errorMsg: "",
        maxPlayers: numPlayers
    };

    // Send the request and wait the answer
    socket.emit("create-lobby", request);
    socket.once("create-lobby", callback);
};


/**
 * Join the user to the specified lobby.
 * 
 * @param socket The socket with the server
 * @param lobbyId The ID of the lobby the user wants to join
 * @param callback The function tat will be executed when the
 *      server answers
 */
export const joinLobby = (  socket: Socket,
                            lobbyId: string,
                            callback: (data: Objects.BackendJoinLobbyResponseJSON) => void) =>
{
    // Create the request
    const request: Objects.FrontendJoinLobbyJSON =
    {
        error: false,
        errorMsg: "",
        lobbyId: lobbyId
    };

    // Send the request and wait the answer
    socket.emit("join-lobby", request);
    socket.once("join-lobby", callback);
};


/**
 * Starts the game inside a created lobby.
 * 
 * @param socket The socket with the server
 * @param lobbyId The ID of the lobby that wants to start
 *      the game
 * @param callback The function that will be executed when the
 *      server answers
 */
export const startLobby = ( socket: Socket,
                            lobbyId: string,
                            callback: (data: Objects.BackendStartLobbyResponseJSON) => void) =>
{
    // Create the request
    const request: Objects.FrontendStartLobbyJSON =
    {
        error: false,
        errorMsg: "",
        lobbyId: lobbyId
    };

    // Send the request and wait the answer
    socket.emit("start-lobby", request);
    socket.once("start-lobby", callback);
};


/**
 * Send a message to the backend with the played card.
 * 
 * @param socket The socket with the backend
 * @param playedCards A vector with the cards that the
 *      user wants to play
 * @param lobbyID The ID of the lobby
 * @param callback The function that will be executed
 *      when the server answers
 */
export const playCards = (  socket: Socket,
                            playedCards: Objects.CardJSON[],
                            lobbyID: string,
                            callback: (data: Objects.BackendGamePlayedCardsResponseJSON) => void) =>
{
    // Create the request
    const request: Objects.FrontendGamePlayedCardsJSON =
    {
        error: false,
        errorMsg: "",
        playedCards: playedCards,
        lobbyId: lobbyID
    };

    // Send the request and wait the answer
    socket.emit("game-played-cards", request);
    socket.once("game-played-cards", callback);
}



/**
 * Send a message to the backend with the selected user
 * 
 * @param socket The socket connection.
 * @param userID The id of the selected user.
 * @param lobbyID The id of the lobby.
 */
export const selectPlayer = (   socket: Socket,
                                username: string,
                                lobbyID: string
) => {
    // Create the request
    const request: Objects.FrontendGameSelectPlayerResponseJSON =
    {
        error: false,
        errorMsg: "",
        playerUsername: username,
        lobbyId: lobbyID
    };

    // Send the request
    socket.emit("game-select-player", request);
}


/**
 * Sends to the server the selected card type.
 * 
 * @param socket The socket for the connection with the server
 * @param cardType The card type selected by the user
 * @param lobbyID The id of the lobby
 */
export const selectTypeOfCard = (   socket: Socket,
                                    cardType: string,
                                    lobbyID: string
) => {
    // Create the request
    const request: Objects.FrontendGameSelectCardTypeResponseJSON =
    {
        error: false,
        errorMsg: "",
        cardType: cardType,
        lobbyId: lobbyID
    }

    // Send the request
    socket.emit("game-select-card-type", request);
}

/**
 * Select the card that the user wants to give to another user
 * @param socket    The socket with the server
 * @param card      The card selected by the user
 * @param lobbyID   The lobby identifier
 */
export const selectCard = ( socket: Socket,
                            card: Objects.CardJSON,
                            lobbyID: string
) => {
    // Create the request
    const request: Objects.FrontendGameSelectCardResponseJSON =
    {
        error: false,
        errorMsg: "",
        card: card,
        lobbyId: lobbyID
    }

    // Send the request
    socket.emit("game-select-card", request);
}


/**
 * Send if the user wants to use a 'Nope' card
 * @param socket    The socket with the server
 * @param isUsed    True if the user uses the card
 * @param lobbyID   The lobby identifier
 */
export const selectNopeUsage = (    socket: Socket,
                                    isUsed: boolean,
                                    lobbyID: string
) => {

    // Create the request
    const request:  Objects.FrontendGameSelectNopeResponseJSON =
    {
        error: false,
        errorMsg: "",
        useNope: isUsed,
        lobbyId: lobbyID
    }

    // Send the request
    socket.emit("game-select-nope", request);
}
                                 

/**
 * Sends to the server a message to post in the chat
 * 
 * @param socket The socket for the connection with the server
 * @param msg The message to be sent
 * @param lobbyId The id of the lobby
 */
export const postMessage = async (  socket: Socket, 
                                    msg: string, 
                                    lobbyId: string
) => {

    const msg_: Objects.FrontendPostMsgJSON = {
        error: false,
        errorMsg: "",
        lobbyId: lobbyId,
        msg: msg,
    }
    socket.emit("post-message", msg_);
}
