// Define defaults for the server
export const SERVER_IP = import.meta.env.SERVER_IP || "http://localhost";
export const SERVER_PORT = Number(import.meta.env.SERVER_PORT) || 8000;
export const SERVER = SERVER_IP + ":" + String(SERVER_PORT)

// Define defaults for the local server
export const LOCAL_SERVER_IP = import.meta.env.LOCAL_SERVER_IP || "http://localhost"
export const LOCAL_SERVER_PORT = Number(import.meta.env.LOCAL_SERVER_IP) || 5000;
export const LOCAL_SERVER = LOCAL_SERVER_IP + ":" + String(LOCAL_SERVER_PORT)
