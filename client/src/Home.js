import { styled } from "styled-components";
import HomePageBackground from "./Assets/Background3.jpg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";





const Home = () => {


    const {currentUser} = useContext(UserContext)

    return (
        <>
        <Container>

            <Welcome>Welcome to Draft Site</Welcome>
            {!currentUser && <SignInTitle>Please Sign In to start Drafting!</SignInTitle>}
            {currentUser && <CreateALobbyButton to="/NewLobby">Create a New Lobby!</CreateALobbyButton>}
            {currentUser && <JoinALobbyButton to="/JoinLobby">Join a Lobby!</JoinALobbyButton>}

        </Container>
        </>
    )

}


export default Home;

const Container = styled.section`
    margin:0;
    overflow: hidden;
    background-image: url(${HomePageBackground});
    /* Photo by Adrien Olichon on Unsplash */
    background-size: cover;
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
color:rgb(227, 204, 174);
font-size: 2.5rem;
font-weight: 700;
border:0.2rem solid rgb(227, 204, 174);
padding: 1rem;
`

const JoinALobbyButton = styled(Link)`
text-decoration: none;
color:rgb(227, 204, 174);
font-size: 2.5rem;
font-weight: 700;
border:0.2rem solid rgb(227, 204, 174);
padding: 1rem;
`

