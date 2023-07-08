import { createContext, useState, useEffect } from "react";
import useLobby from "./useLobby";

export const LobbyContext = createContext(null);

export const LobbyProvider = ({children}) => {

  const [currentLobby_id, setCurrentLobby_id] = useState(() => {
    

    let lobby_id = localStorage.getItem("lobby_id");
    
    if(lobby_id){
        return JSON.parse(lobby_id)
    }
    else{
        return null
    }
})

  const [lobby, setLobby, updateLastUpdated, upToDate, setUpToDate] = useLobby(currentLobby_id)

  return (
    <LobbyContext.Provider value={{currentLobby_id, setCurrentLobby_id, lobby, setLobby, updateLastUpdated, upToDate, setUpToDate}}>
            {children}
    </LobbyContext.Provider>
  )

};