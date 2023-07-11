import { useState, useEffect, useContext } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { LobbyContext } from "./LobbyContext";
import { UserContext } from "./UserContext";
import LobbyBackground from "./Assets/LobbyBackground.jpg";


const JoinLobby = () => {

  const [userName, setUserName] = useState("")
  const [errorMessage, setErrorMessage] = useState()
  const navigate = useNavigate()

  const {currentLobby_id, setCurrentLobby_id, lobby, setLobby, updateLastUpdated} = useContext(LobbyContext);
  const {setCurrentUser, currentUser} = useContext(UserContext)


  const joinLobby = (event) => {
    event.preventDefault();

    fetch('/api/joinlobby', {
    method: 'PATCH',
    body: JSON.stringify({
        _id:currentLobby_id,
        userName: currentUser
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
            localStorage.setItem("lobby_id", JSON.stringify(parsed.foundNewLobby._id));
            setCurrentLobby_id(parsed.foundNewLobby._id);
            setLobby(parsed.foundNewLobby)
            navigate("/waitingroom")
        }
        if(parsed.status === 403){
          setErrorMessage("Lobby is full, please create a new lobby.")
        }
    });
}


  return (
    <>
        <Container>
          <Title>Join a Lobby!</Title>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Form onSubmit={joinLobby}>
            <LabelDiv>
              <FormLabel>LobbyID: </FormLabel><FormInput type="text" id="id" autoComplete="off" onChange={(e) => setCurrentLobby_id(e.target.value)}></FormInput>
            </LabelDiv>
            <Button>Submit</Button>
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
  align-items: center;
  overflow: hidden;
  height: 100vh;
`;

const Title = styled.h1`
margin-top: 13rem;
text-align: center;
font-size: 3rem;
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
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1.25;
  margin-top: 5rem;
  padding: 0.75rem;
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
`;


const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
`

const FormLabel = styled.label`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 0;
  margin-left: 1rem;
`

const LabelDiv = styled.div`
margin-top: 4rem;
`

const FormInput = styled.input`
  font-family: 'Monomaniac One', sans-serif;
  font-size: 2rem;
  margin: 1rem;
  width: 30rem;
  background-color: rgb(227, 204, 174);
  &:focus {
    outline: 2px solid white;
  }
`

const ErrorMessage = styled.p`
`






export default JoinLobby;
