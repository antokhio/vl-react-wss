import { CircularProgress, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const socket = io(
//   `ws://${import.meta.env.VITE_WSS_HOST}:${import.meta.env.VITE_WSS_PORT}`,
//   {
//     transports: ["websocket"],
//   }
// );

const socket = new WebSocket(
  `ws://${import.meta.env.VITE_WSS_HOST}:${import.meta.env.VITE_WSS_PORT}`
);

interface SocketProviderProps {
  children?: React.ReactNode;
}

const SocketProvider = ({ children }: SocketProviderProps) => {
  const [isConnected, setConnected] = useState(false);

  useEffect(() => {
    const onConnected = () => {
      setConnected(true);
      console.log("connect");
    };

    const onDisconnected = () => {
      setConnected(false);
      console.log("disconnected");
    };

    socket.addEventListener("open", onConnected);
    socket.addEventListener("close", onDisconnected);

    return () => {
      socket.removeEventListener("open", onConnected);
      socket.removeEventListener("close", onDisconnected);
    };
  }, []);

  return isConnected ? (
    <Stack alignItems="center" spacing={2}>
      <CircularProgress />
      <Typography>Loading...</Typography>
    </Stack>
  ) : (
    <>{children}</>
  );
};

const useSocket = () => socket;

export { SocketProvider, type SocketProviderProps, useSocket };
