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
    const request: Objects.FrontendCreateLobbyJSON =
    {
        error: false,
        errorMsg: "",
        maxPlayers: numPlayers
    };

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
    const request: Objects.FrontendJoinLobbyJSON =
    {
        error: false,
        errorMsg: "",
        lobbyId: lobbyId
    };
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
    const request: Objects.FrontendStartLobbyJSON =
    {
        error: false,
        errorMsg: "",
        lobbyId: lobbyId
    };

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
export const playCard = (   socket: Socket,
                            playedCards: string,
                            lobbyID: string,
                            callback: (data: Objects.BackendGamePlayedCardsResponseJSON) => void) =>
{
    const request: Objects.FrontendGamePlayedCardsJSON =
    {
        error: false,
        errorMsg: "",
        playedCards: JSON.stringify(playedCards),
        lobbyId: lobbyID
    };

    socket.emit("game-played-cards", request);
    socket.once("game-played-cards", callback);
}
