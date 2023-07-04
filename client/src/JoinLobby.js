import { useState, useEffect, useContext } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { LobbyContext } from "./LobbyContext";
import { UserContext } from "./UserContext";

const JoinLobby = ({socket}) => {

  const [userName, setUserName] = useState("")
  const navigate = useNavigate()

  const {currentLobby, setCurrentLobby} = useContext(LobbyContext);
  const {setCurrentUser, currentUser} = useContext(UserContext)

  const joinLobby = (event) => {
    event.preventDefault();
    if (currentLobby !== ""){
        socket.emit("join_room", currentLobby)
    }

    fetch('/api/joinlobby', {
    method: 'PATCH',
    body: JSON.stringify({
        _id:currentLobby,
        userName
    }),
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((parsed) => {
        console.log(parsed)
        if(parsed.status===200){
            localStorage.setItem("lobby", JSON.stringify(parsed.lobbyId));
            localStorage.setItem("user", JSON.stringify(parsed.userName));
            setCurrentLobby(parsed.lobbyId);
            setCurrentUser(parsed.userName);
            navigate("/waitingroom")
        }
    });
}
console.log(currentUser)

  return (
    <>
        <Container>
          <Form onSubmit={joinLobby}>
            <label>LobbyID: </label><input type="text" id="id" autoComplete="off" onChange={(e) => setCurrentLobby(e.target.value)}></input>
            <label>UserName: </label><input type="text" id="Username" autoComplete="off" onChange={(e) => setUserName(e.target.value)}></input>
            <Button>Submit</Button>
          </Form>
        </Container>
    </>
  );
};

const Button = styled.button`
`;

const Form = styled.form`
`

const Pack = styled.div`
margin-top: 5rem;
`

const PackImage = styled.img`
padding:1rem;
max-height: 20rem;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Sets = styled.li`
background-color: white;
list-style: none;
padding: 0 1rem;
margin: 0;
visibility:hidden;
&:hover {
        color: red;
        cursor: pointer;
    }

`

const SetsList = styled.ul`
    max-height: 20rem;
    overflow-y : scroll;
    margin:0;
    padding:0;
    &::-webkit-scrollbar{
        display:none
    }
`

const Image = styled.img`
height:1rem;
`

export default JoinLobby;
