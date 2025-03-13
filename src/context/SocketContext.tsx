import React, { createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";

import { SERVER_IP } from "../utils/config";

// Create the socket
const socket = io(SERVER_IP);

// Create the context
const SocketContext = createContext<Socket | null>(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};
