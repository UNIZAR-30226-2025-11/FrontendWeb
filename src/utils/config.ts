// Define defaults for the server
const SERVER_IP = import.meta.env.VITE_SERVER_IP || "http://localhost";
const SERVER_PORT = Number(import.meta.env.VITE_SERVER_PORT) || 8000;

export const SERVER = SERVER_IP + ":" + SERVER_PORT; // your server address
export const PORT = Number(import.meta.env.VITE_PORT) || 5173; // your custom port

