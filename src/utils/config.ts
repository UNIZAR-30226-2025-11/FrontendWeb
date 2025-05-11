// Define defaults for the server
const SERVER_IP = import.meta.env.VITE_SERVER_IP || "http://localhost";

let server = SERVER_IP;

if (import.meta.env.VITE_SERVER_PORT) {
    const SERVER_PORT = Number(import.meta.env.VITE_SERVER_PORT);
    server += ":" + SERVER_PORT; 
}

export const SERVER = server;
export const PORT = Number(import.meta.env.VITE_PORT) || 5173; // your custom port

