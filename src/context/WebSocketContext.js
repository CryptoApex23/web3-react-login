import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

// Create a WebSocket context
const WebSocketContext = createContext(null);

// Custom hook to use the WebSocket context
export const useWebSocket = () => {
  return useContext(WebSocketContext);
};

const WebSocketProvider = ({ children }) => {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);

  const wsRef = useRef(null);

  useEffect(() => {
    // Connect to the Bybit WebSocket
    const connectWebSocket = () => {
      wsRef.current = new WebSocket('wss://stream-testnet.bybit.com/v5/public/spot');

      wsRef.current.onopen = () => {
        console.log('Connected to WebSocket');
        // Subscribe to topics
        wsRef.current.send(JSON.stringify({
          op: 'subscribe',
          args: ['tickers.BTCUSDT', 'tickers.ETHUSDT'],
        }));
      };

      wsRef.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
      };

      wsRef.current.onclose = () => {
        console.log('Disconnected from WebSocket');
        setTimeout(connectWebSocket, 1000); // Reconnect after 1 second
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error', error);
        wsRef.current.close();
      };

      setWs(wsRef.current);
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ ws, messages }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
