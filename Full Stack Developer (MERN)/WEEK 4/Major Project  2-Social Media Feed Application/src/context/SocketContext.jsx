import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user) {
      setSocket(null);
      return undefined;
    }

    const socketUrl =
      import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

    const connection = io(socketUrl, {
      transports: ["websocket", "polling"],
      autoConnect: true,
    });

    const userId = user.id || user._id;

    if (userId) {
      connection.emit("user:join", userId);
    }

    setSocket(connection);

    return () => {
      connection.removeAllListeners();
      connection.disconnect();
      setSocket(null);
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
