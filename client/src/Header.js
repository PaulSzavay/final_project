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
    {/* <HeaderBox>
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
    </HeaderBox> */}
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
background-color: red;
position: fixed;
width: 100%;
min-height: 5rem;
`

const Left = styled.div`
`

const Logo = styled.img`
// Card game icons created by mangsaabguru from www.flaticon.com
height: 4rem;
`



const Middle = styled.div`
`

const Right = styled.div`
`

const MainSiteLink = styled(Link)`
font-size: 3rem;
color: black;
text-decoration: none;
`

const SignInLink = styled(Link)`
display: flex;
font-size: 2.5rem;
color: black;
text-decoration: none;
`

const SignOutLink = styled(Link)`
display: flex;
font-size: 2.5rem;
color: black;
text-decoration: none;
`