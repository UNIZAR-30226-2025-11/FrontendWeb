
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  server: {
    host: "0.0.0.0", // allows access from other devices on the network
    port: Number(import.meta.env.VITE_PORT) || 5173, // your custom port
    strictPort: true, // fail if the port is already in use
  },
});