import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({children}) => {

  const [currentUser, setCurrentUser] = useState(() => {
    

    let user = localStorage.getItem("user");
    
    if(user){
        return JSON.parse(user)
    }
    else{
        return null
    }
})
  
// this is used for the header form. When a user signs in they will have a "Hello Message"
const [loggedInUser, setLoggedInUser] = useState("");

useEffect(()=>{
  currentUser && 
  fetch(`/api/user/${currentUser}`)
  .then((response) => response.json())
  .then((parsed) => {
    if(parsed.status === 200){
      localStorage.setItem("user", JSON.stringify(parsed.data.email))
      setLoggedInUser(parsed.data.name)
    }
    })
  .catch((error) => {
      console.log(error)
  })
},[currentUser]);

// passing currentUser, setCurrentUser, loggedInUser, setLoggedInUser to all children
  return (
    <UserContext.Provider value={{currentUser, setCurrentUser, loggedInUser, setLoggedInUser}}>
            {children}
    </UserContext.Provider>
  )

};