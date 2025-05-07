// Define defaults for the server
const SERVER_IP = import.meta.env.VITE_SERVER_IP || "localhost";
const SERVER_PORT = Number(import.meta.env.VITE_SERVER_PORT) || 8000;
//export const SERVER_PORT = Number(import.meta.env.VITE_SERVER_PORT) || 8000;

const SERVER_PROTOCOL = import.meta.env.VITE_SERVER_PROTOCOL || "https";

export const SERVER =  SERVER_PROTOCOL + "://" + SERVER_IP + ":" + SERVER_PORT; // your server address
export const PORT = Number(import.meta.env.VITE_PORT) || 5173; // your custom port

