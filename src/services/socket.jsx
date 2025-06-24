// === src/services/socket.js ===
import { io } from "socket.io-client";

export const socket = io("https://dealbackend.onrender.com", {
  transports: ['websocket'],
});
