import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './UserContext';
import { LobbyContext, LobbyProvider } from './LobbyContext';
import { UpdatedProvider } from './UpdatedContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <UserProvider>
            <LobbyProvider>
                <UpdatedProvider>
                    <App />
                </UpdatedProvider>
            </LobbyProvider>
    </UserProvider>
);


