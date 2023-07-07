import { styled } from "styled-components";
import cards from "./Assets/card-game.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {UserContext} from "./UserContext"


const Header = () => {

    const {currentUser, setCurrentUser, loggedInUser} = useContext(UserContext)

    const signOut = (event) => {
        event.preventDefault()
        localStorage.removeItem("user");
        setCurrentUser(null);
    }

    return (
    <>
    <HeaderBox>
    <Left>
        <Logo src={cards}/>
    </Left>
    <Middle>
        <MainSiteLink to="/">Draft Site</MainSiteLink>
    </Middle>
    <Right>
        <SignInLink to="/signin">{currentUser ? `Hello ${loggedInUser}` : "Sign In"}</SignInLink>
        <SignOutLink to="/" onClick={signOut}>{currentUser && "Sign Out"}</SignOutLink>
    </Right>
    </HeaderBox>
    </>
)
}

export default Header;


const HeaderBox = styled.div`
display:flex;
justify-content: space-between;
align-items: center;
padding: 0 2rem;
box-sizing: border-box;
background-color: rgb(38, 42, 86);
position: fixed;
top: 0;
width: 100%;
min-height: 6rem;
`

const Left = styled.div`
width: 33%;
`

const Logo = styled.img`
// Card game icons created by mangsaabguru from www.flaticon.com
height: 4rem;
`



const Middle = styled.div`
width: 33%;
text-align: center;
`

const Right = styled.div`
width: 33%;
display: flex;
flex-direction: column;
padding: 0.5rem 0;
`

const MainSiteLink = styled(Link)`
font-size: 3rem;
color: rgb(184, 98, 27);
text-decoration: none;
`

const SignInLink = styled(Link)`
display: flex;
justify-content: right;
font-size: 2.5rem;
color: rgb(184, 98, 27);
text-decoration: none;
margin: 0;
max-height: 3rem;
`

const SignOutLink = styled(Link)`
display: flex;
justify-content: right;
font-size: 2.5rem;
color: rgb(184, 98, 27);
text-decoration: none;
margin-bottom: 1rem;
`