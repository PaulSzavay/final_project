import { createContext, useState, useEffect } from "react";

export const LobbyContext = createContext(null);

export const LobbyProvider = ({children}) => {

  const [currentLobby, setCurrentLobby] = useState(() => {
    

    let lobby = localStorage.getItem("lobby");
    
    if(lobby){
        return JSON.parse(lobby)
    }
    else{
        return null
    }
})


  return (
    <LobbyContext.Provider value={{currentLobby, setCurrentLobby}}>
            {children}
    </LobbyContext.Provider>
  )

};