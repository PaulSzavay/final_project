import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { LobbyContext } from "./LobbyContext";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import WaitingroomBackground from "./Assets/WaitingRoomBackground3.jpg"
import Messenger from "./Messenger";

const WaitingRoom = () => {


    const [room, setRoom] = useState("")
    const [loading, setLoading] = useState(true)
    const [ready, setReady] = useState(false)
    const [partyLeader, setPartyLeader] = useState(false)
    const [askIfFull, setAskIfFull] = useState("")

    const {currentLobby_id, setCurrentLobby_id, lobby, setLobby, updateLastUpdated} = useContext(LobbyContext);
    const {currentUser, setCurrentUser, loggedInUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=>{
        setLoading(false)
    }, [currentUser])
    

    useEffect(()=>{
      fetch("/api/partyleadercheck", {
        method: "POST",
        body: JSON.stringify({ _id:currentLobby_id, userName:currentUser}),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((parsed) => {
              if(parsed.status===200){
                setPartyLeader(parsed.partyLeader);
                setLoading(false);
              }
        })
        .catch((error) => {
          console.error(error);
        })
  }, []);

    const readyFunction = (event) => {
        event.preventDefault();
        fetch("/api/lobby", {
            method: "POST",
            body: JSON.stringify({ _id:currentLobby_id, userName:currentUser, isReady:!ready }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((parsed) => {
                if(parsed.status === 200 ){
                  setReady(!ready);
                }
            })
            .catch((error) => {
              console.error(error);
            })
    }

    const startFunction = (event) => {
      event.preventDefault();
      fetch("/api/lobbycheck", {
        method: "POST",
        body: JSON.stringify({ _id:currentLobby_id}),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((parsed) => {
          if(parsed.playersFound < 7){
            setAskIfFull(parsed.playersFound);
          }
          else{
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
        body: JSON.stringify({ _id:currentLobby_id, numberOfPlayers:askIfFull}),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((parsed) => {
          navigate("/draftPage");
        })
        .catch((error) => {
          console.error(error);
        });
    }

    const noFunction = (event) => {
      event.preventDefault();
      setAskIfFull("");
    }

    const deleteFunction = (event) => {
      event.preventDefault();
      fetch("/api/deletelobby", {
        method: "POST",
        body: JSON.stringify({ lobby_id:currentLobby_id}),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((parsed) => {
          if(parsed.status===204){
            console.log(parsed)
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if(lobby.lastUpdated !== 0 && lobby.players.length === 8 && lobby.players.every((player)=>{return player.isReady})){
      navigate("/draftPage");
    }


    return (
      <>
      {lobby.deleted === true && lobby.lastUpdated !== 0 &&
      <Container >
        <Deleted>Lobby has been deleted &#128557;</Deleted>
      </Container>
      }
      {lobby.deleted === false && lobby.lastUpdated !== 0 &&
      <Container>
        <>
        {lobby.lastUpdated === 0 || loading ? <h1>loading...</h1> :
        <>
          <Title>Waiting Room</Title>
          <RoomInfoDiv>
            {currentLobby_id && <RoomId>Room ID: {currentLobby_id}</RoomId>}
            {currentUser && <UserName>Username: {currentUser}</UserName>}
          </RoomInfoDiv>
          <Bottom>
          <Left>
            <ButtonDiv>
            <Button onClick={readyFunction}>{!ready?"Ready":"Unready"}</Button>
            {partyLeader === currentUser && <Button 
            disabled={
              !lobby.players.every((player)=>{
                return player.isReady
              })
            }
            onClick={startFunction}>Start</Button>}
            {partyLeader === currentUser && <Button 
            onClick={deleteFunction}>Delete</Button>}
            </ButtonDiv>
            {askIfFull < 7 && (typeof(askIfFull) === "number") && 
            <StartDiv>
              <Start>Are you sure you want to start?</Start>
              <EmptySeats>Empty seats will be filled with bots</EmptySeats>
              <StartButton onClick={yesFunction}>Yes</StartButton>
              <StartButton onClick={noFunction}>No</StartButton>
            </StartDiv> }
            </Left>
            <Right>
            <Messenger/>
            </Right>
            </Bottom>
        </>
        }
        </>
        </Container>}
      </>
    )
}

export default WaitingRoom

const Container = styled.div`
  background-image: url(${WaitingroomBackground});
  /* Photo by Rangarajan Ragunathan on Unsplash */
  background-size: cover;
  color: rgb(227, 204, 174);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  height: 100vh;
`;

const Title = styled.h1`
margin-top: 13rem;
text-align: center;
font-size: 3rem;
`

const RoomInfoDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`


const RoomId = styled.h2`
font-weight: 100;
font-size: 2rem;
margin: -25px 0;
`

const UserName = styled.h2`
font-weight: 100;
font-size: 2rem;

`

const Deleted = styled.h1`
font-size: 3rem;
`

const MessengerForm = styled.form`
margin-left: 3rem;
`

const ButtonDiv = styled.div`
display: flex;
margin-left: 9rem;
padding: 0 2rem;
margin-top: 2rem;
`

const Messages = styled.p`
font-size: 1.75rem;
`

const Input = styled.input`
  font-family: 'Monomaniac One', sans-serif;
  font-size: 1.5rem;
  margin: 1rem;
  width: 30rem;
  background-color: rgb(227, 204, 174);
  &:focus {
    outline: 2px solid grey;
  }
`

const Button = styled.button`
  align-items: center;
  background-color: black;
  border: 1px solid darkgrey;
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgb(227, 204, 174);
  cursor: pointer;
  font-family: 'Monomaniac One', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.25;
  margin: 0;
  padding: 0.5rem;
  text-decoration: none;
  transition: all 250ms;
  width: 10rem;

&:hover,
&:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  opacity: 0.75;
}

&:hover {
  transform: translateY(-1px);
  
}

&:active {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  transform: translateY(0);
}

&:disabled{
  opacity: 0.5
}
`

const StartDiv = styled.div`
width: 50%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-left: 5rem;
margin-top: 2rem;
`

const Start = styled.h3`
font-size: 1.75rem;
margin-bottom: -1rem;
`

const EmptySeats = styled.p`
font-size: 1.25rem;
`

const StartButton = styled.button`
  align-items: center;
  background-color: black;
  border: 1px solid darkgrey;
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgb(227, 204, 174);
  cursor: pointer;
  font-family: 'Monomaniac One', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.25;
  margin: 0.5rem 0;
  padding: 0.5rem;
  text-decoration: none;
  transition: all 250ms;
  width: 10rem;

&:hover,
&:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  opacity: 0.75;
}

&:hover {
  transform: translateY(-1px);
  
}

&:active {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  transform: translateY(0);
}
`

const Bottom = styled.div`
display: flex;

`

const Left = styled.div`
width: 50%;
`

const Right = styled.div`
width: 50%;
`