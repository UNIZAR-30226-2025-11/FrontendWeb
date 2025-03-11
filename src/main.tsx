import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { SocketProvider } from './context/SocketContext';


const rootElement = document.getElementById('root');

if (rootElement)
{
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <SocketProvider>
        <App />
      </SocketProvider>
    </React.StrictMode>
  );
} else {
  console.error("ERROR: 'Root' element not found.");
}
