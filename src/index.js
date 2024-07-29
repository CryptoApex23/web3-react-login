// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import WebSocketProvider from './context/WebSocketContext';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
   <WebSocketProvider>
      <App />
    </WebSocketProvider>
  </Provider>
);
