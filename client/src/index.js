import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './UserContext';
import { LobbyProvider } from './LobbyContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
        <LobbyProvider>
            <App />
        </LobbyProvider>
    </UserProvider>
);


