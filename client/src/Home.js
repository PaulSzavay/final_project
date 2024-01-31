import { styled } from "styled-components";
import HomePageBackground from "./Assets/Background3.jpg";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import HelpPage from "./HelpPage";
import { AiFillGithub } from "react-icons/ai";
import { MdEmail } from "react-icons/md";





const Home = () => {

    const {currentUser} = useContext(UserContext)

    const [helpPageDisplay, setHelpPageDisplay] = useState(false)
    
    const howToFunction = () => {
      setHelpPageDisplay(true)
    }

    return (
        <>
        <Container>
          {!helpPageDisplay &&
          <>
          <HowTo onClick={howToFunction}>How To</HowTo>
          <WelcomeDiv>
            <Welcome>Welcome to Kavu Academy</Welcome>
            {!currentUser && <SignInTitle>Please Sign In to start Drafting!</SignInTitle>}
            {currentUser && <CreateALobbyButton to="/NewLobby">Create a New Lobby!</CreateALobbyButton>}
            {currentUser && <JoinALobbyButton to="/JoinLobby">Join a Lobby!</JoinALobbyButton>}
          </WelcomeDiv>
        </>
        }
        </Container> 
        <LinksDiv>
            <Links href="https://github.com/PaulSzavay"> <AiFillGithub/> </Links>
            <Links href="mailto:szavay.paul@gmail.com"><MdEmail/></Links>
        </LinksDiv>
        {helpPageDisplay && <HelpPage setHelpPageDisplay={setHelpPageDisplay}/>}
        </>
    )

}


export default Home;

const Container = styled.section`
    background-image: url(${HomePageBackground});
    /* Photo by Adrien Olichon on Unsplash */
    background-size: cover;
    width: 100%;
    height: 100vh;
`

const WelcomeDiv = styled.div`
    margin:0;
    overflow: hidden;
    width: 100%;
    height: 100vh;
    z-index: -10000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Welcome = styled.h1`
color:rgb(227, 204, 174);
font-size: 4rem;
`

const SignInTitle = styled.h2`
color:rgb(227, 204, 174);
font-size: 3rem;
`

const CreateALobbyButton = styled(Link)`
text-decoration: none;
color: rgb(184, 98, 27);
font-size: 2.5rem;
font-weight: 700;
border:0.2rem solid rgb(227, 204, 174);
background-color: rgb(38, 42, 86);
padding: 1rem;

&:hover {
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

const JoinALobbyButton = styled(Link)`
margin: 1rem 0 0 0;
text-decoration: none;
color: rgb(184, 98, 27);
font-size: 2.5rem;
font-weight: 700;
border:0.2rem solid rgb(227, 204, 174);
background-color: rgb(38, 42, 86);
padding: 1rem;

&:hover {
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


const HowTo = styled.button`
margin: 11rem 0 0 2rem;
background-color: white;
color: black;
position:fixed;
font-family: 'Monomaniac One', sans-serif;
font-size: 2rem;
min-width: 10rem;
min-height: 4rem;
display: flex;
justify-content: center;
align-items: center;
border-radius: 1rem;

&:hover {
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


const LinksDiv = styled.div`
color: white;
font-size: 1.5rem;
position: fixed;
bottom: 1rem;
right: 1rem;
`

const Links = styled.a`
text-decoration: none;
color:white;
`

