import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

export const useSocket = () => {
  const socket = io(backendUrl);

  return { socket };
};