import { createContext, useState } from "react";

export const UpdatedContext = createContext(null);

export const UpdatedProvider = ({children}) => {

  const [currentUpdated, setCurrentUpdated] = useState(() => {
    

    let updated = localStorage.getItem("updated");
    
    if(updated){
        return JSON.parse(updated)
    }
    else{
        return null
    }
})


  return (
    <UpdatedContext.Provider value={{currentUpdated, setCurrentUpdated}}>
            {children}
    </UpdatedContext.Provider>
  )

};