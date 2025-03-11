import { io } from "socket.io-client";

import { ips } from "./constants.js";

const URL = ips.server;

export const socket = io(URL, { withCredentials: true });
