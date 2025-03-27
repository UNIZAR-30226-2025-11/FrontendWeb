import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/UserContext';

import './styles/main.css'

const rootElement = document.getElementById('root');

if (rootElement)
{
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
    </React.StrictMode>
  );
} else {
  console.error("ERROR: 'Root' element not found.");
}
