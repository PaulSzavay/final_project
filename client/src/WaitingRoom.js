import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { LobbyContext } from "./LobbyContext";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { UpdatedContext } from "./UpdatedContext";

const WaitingRoom = ({socket}) => {

    const [message, setMessage] = useState("")
    const [messageReceived, setMessageReceived] = useState("")
    const [room, setRoom] = useState("")
    const [loading, setLoading] = useState(true)
    const [ready, setReady] = useState(false)
    const [partyLeader, setPartyLeader] = useState(false)
    const [askIfFull, setAskIfFull] = useState("")

    const {currentLobby, setCurrentLobby} = useContext(LobbyContext);
    const {currentUser, setCurrentUser, loggedInUser} = useContext(UserContext);
    const {currentUpdated, setCurrentUpdated} = useContext(UpdatedContext);
    const navigate = useNavigate();

    useEffect(()=>{
        setLoading(false)
    }, [currentUser])
    
    const sendMessage = () => {
        socket.emit("send_message", { message, room });
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
      fetch("/api/partyleadercheck", {
        method: "POST",
        body: JSON.stringify({ _id:currentLobby, userName:currentUser}),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((parsed) => {
              if(parsed.status===200){
                localStorage.setItem("updated", JSON.stringify(parsed.lastUpdated));
                setPartyLeader(parsed.partyLeader);
                setCurrentUpdated(parsed.lastUpdated);
                setLoading(false);
              }
        })
        .catch((error) => {
          console.error(error);
        })
  }, []);

    const readyFunction = (event) => {
      console.log("ready pressed")
        event.preventDefault();
        fetch("/api/lobby", {
            method: "POST",
            body: JSON.stringify({ _id:currentLobby, userName:currentUser, isReady:!ready }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((parsed) => {
                if(parsed.status === 200 ){
                  setReady(!ready);
                  localStorage.setItem("updated", JSON.stringify(parsed.lastUpdated));
                  setCurrentUpdated(parsed.lastUpdated);
                }
            })
            .catch((error) => {
              console.error(error);
            })
    }

    const startFunction = (event) => {
      console.log("start pressed")
      event.preventDefault();
      fetch("/api/lobbycheck", {
        method: "POST",
        body: JSON.stringify({ _id:currentLobby}),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((parsed) => {
          if(parsed.playersFound < 7){
            setAskIfFull(parsed.playersFound);
            localStorage.setItem("updated", JSON.stringify(parsed.lastUpdated));
            setCurrentUpdated(parsed.lastUpdated);
          }
          else{
            localStorage.setItem("updated", JSON.stringify(parsed.lastUpdated));
            setCurrentUpdated(parsed.lastUpdated);
            navigate("/draftPage")
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    const yesFunction = (event) => {
      event.preventDefault();
      fetch("/api/filllobby", {
        method: "POST",
        body: JSON.stringify({ _id:currentLobby, numberOfPlayers:askIfFull}),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((parsed) => {
          navigate("/draftPage");
          localStorage.setItem("updated", JSON.stringify(parsed.lastUpdated));
          setCurrentUpdated(parsed.lastUpdated);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    const noFunction = (event) => {
      event.preventDefault();
      setAskIfFull("");
    }

    const checkIfDraftHasStarted = () => {
      fetch("/api/draftlobbystart", {
        method: "POST",
        body: JSON.stringify({ _id:currentLobby, lastUpdated:currentUpdated}),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((parsed) => {
          if(parsed.status === 200){
            navigate("/draftPage");
            localStorage.setItem("updated", JSON.stringify(parsed.lastUpdated));
            setCurrentUpdated(parsed.lastUpdated);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    setInterval(checkIfDraftHasStarted, 2000);

    return (
        <>
        {loading? <h1>loading...</h1> :
        <Container>
        <div >
            {askIfFull < 7 && (typeof(askIfFull) === "number") && 
            <div>
              <h2>Are you sure you want to start?</h2>
              <p>Empty seats will be filled with bots</p>
              <button onClick={yesFunction}>Yes</button>
              <button onClick={noFunction}>No</button>
            </div> }
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
            <button onClick={readyFunction}>{!ready?"Ready":"Unready"}</button>
            {partyLeader === currentUser && <button onClick={startFunction}>Start</button>}

        </div>
        </Container>
        }
        </>
    )
}

export default WaitingRoom

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin:0;
  overflow: hidden;
  height: 100vh;
`;
