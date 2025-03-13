import { config } from "dotenv";

config();

// Check the configuration
if (!process.env.SERVER_IP) console.log("Using default SERVER");
if (!process.env.SERVER_PORT) console.log("Using default PORT");
if (!process.env.LOCAL_SERVER) console.log("Using default LOCAL SERVER");
if (!process.env.LOCAL_SERVER_IP) console.log("Using default LOCAL SERVER IP");

// Define defaults for the server
export const SERVER_IP = process.env.SERVER_IP || "http://localhost";
export const SERVER_PORT = Number(process.env.SERVER_PORT) || 8000;

// Define defaults for the local server
export const LOCAL_SERVER_IP = process.env.LOCAL_SERVER_IP || "http://localhost"
export const LOCAL_SERVER_PORT = Number(process.env.LOCAL_SERVER_IP) || 5000;
