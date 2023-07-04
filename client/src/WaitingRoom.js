import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { LobbyContext } from "./LobbyContext";
import { UserContext } from "./UserContext";

const WaitingRoom = ({socket}) => {

    const [message, setMessage] = useState("")
    const [messageReceived, setMessageReceived] = useState("")
    const [room, setRoom] = useState("")
    const [loading, setLoading] = useState(true)

    const {currentLobby, setCurrentLobby} = useContext(LobbyContext);
    const {currentUser, setCurrentUser} = useContext(UserContext)

    useEffect(()=>{
        setLoading(false)
    }, [currentUser])
    
    const sendMessage = () => {
        socket.emit("send_message", { message, room});
    };

    useEffect(()=>{
        socket.on("receive_message", (data) => {
            setMessageReceived(data.message);
        });
    }, [socket]);

    

    useEffect(()=>{
        if (currentLobby !== ""){
            socket.emit("join_room", currentLobby)
        }
    }, [socket]);


    useEffect(()=>{
        currentLobby &&
        fetch("/api/lobby", {
            method: "POST",
            body: JSON.stringify({ _id:currentLobby }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((parsed) => {
              console.log(parsed)
            })
            .catch((error) => {
              console.error(error);
            })
    }, [])

    const readyFunction = (event) => {
        event.preventDefault();
        fetch("/api/lobby", {
            method: "POST",
            body: JSON.stringify({ _id:currentLobby, userName:currentUser }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((parsed) => {
                if(parsed.status === 200 )
              console.log(parsed)
              console.log(`parsed.data.players.${currentUser}`)
            })
            .catch((error) => {
              console.error(error);
            })
    }


    return (
        <>
        {loading? <h1>loading...</h1> :
        <div >
            {currentLobby && <p>Room ID: {currentLobby}</p>}
            {currentUser && <p>Username: {currentUser}</p>}
            {!currentLobby && 
            <>
            <input placeholder="Room ID..." onChange={(event)=>{setRoom(event.target.value)}}/>
            </>
            }
            <input placeholder="Message..." onChange={(event)=>{setMessage(event.target.value)}}/>
            <button onClick={sendMessage}>Send Message</button>
            <p>Message: {messageReceived}</p>
            <button onClick={readyFunction}>Ready</button>
            {/* <button onclick={startFunction}>Start</button> */}
        </div>
        }
        </>
    )
}

export default WaitingRoom
