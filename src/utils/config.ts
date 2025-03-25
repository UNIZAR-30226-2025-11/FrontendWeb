// Define defaults for the server
export const SERVER_IP = import.meta.env.VITE_SERVER_IP || "localhost";
export const SERVER_PORT = Number(import.meta.env.VITE_SERVER_PORT) || 8000;
export const SERVER = "http://" + SERVER_IP + ":" + String(SERVER_PORT)
