import { useState, useEffect, useContext } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { LobbyContext } from "./LobbyContext";
import { UserContext } from "./UserContext";
import LobbyBackground from "./Assets/LobbyBackground.jpg";
import useLobby from "./useLobby";


const NewLobby = () => {

  const [booster1, setBooster1] = useState("Invasion")
  const [booster2, setBooster2] = useState("Invasion")
  const [booster3, setBooster3] = useState("Invasion")
  const [userName, setUserName] = useState("")
  const [pack, setPack] = useState()
  const navigate = useNavigate()

  const {setCurrentLobby_id, lobby, setLobby, updateLastUpdated} = useContext(LobbyContext);
  const {currentUser, setCurrentUser} = useContext(UserContext);


  console.log(lobby)
  // promise.all

  const addPack = (event) => {
    event.preventDefault();
      fetch("/api/createlobby", {
        method: "POST",
        body: JSON.stringify({userName:currentUser, booster1, booster2, booster3}),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      })
        .then((response) => response.json())
        .then((parsed) => {
          if(parsed.status===201){
            localStorage.setItem("lobby_id", JSON.stringify(parsed.foundNewLobby._id));
            setLobby(parsed.foundNewLobby)
            setCurrentLobby_id(parsed.foundNewLobby._id);
            navigate("/waitingroom");
          }
        });
  };




  return (
    <>
        <Container>
          <Title>Create a Lobby!</Title>
          <Form onSubmit={addPack}>
            <label>Pack1: </label><input type="text" value={booster1} id="id" autoComplete="off" onChange={(e) => setBooster1(e.target.value)}></input>
            <label>Pack2: </label><input type="text" value={booster2} id="id" autoComplete="off" onChange={(e) => setBooster2(e.target.value)}></input>
            <label>Pack3: </label><input type="text" value={booster3} id="id" autoComplete="off" onChange={(e) => setBooster3(e.target.value)}></input>
            <Button >Press Me</Button>
          </Form>
        </Container>
    </>
  );
};


const Container = styled.div`
  background-image: url(${LobbyBackground});
    /* Photo by Annie Spratt on Unsplash */
  background-size: cover;
  color: rgb(227, 204, 174);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100vh;
`;

const Title = styled.h1`
margin-top: 13rem;
text-align: center;
font-size: 3rem;
`


const Button = styled.button`
`;

const Form = styled.form`
display: flex;


`

const Pack = styled.div`
`

const PackImage = styled.img`
padding:1rem;
max-height: 20rem;
`


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

export default NewLobby;
