import { styled } from "styled-components";
import ProfileBackground from "./Assets/ProfileBackground.jpg"
import { Fragment, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { Navigate, useNavigate } from "react-router-dom";




const Profile = () => {

    const {currentUser, setCurrentUser, loggedInUser, setLoggedInUser, drafts, setDrafts} = useContext(UserContext);

    const navigate = useNavigate()

    const reviewDraft = (draft) => {
      navigate(`/Draft/${draft._id}`)
    }

    console.log(drafts)
 
    return (
        <Container>
            <Title>Profile</Title>
            <Draft>Drafts:</Draft>
            {drafts && <Drafts>
                {drafts.map((draft, index)=>{
                    return (
                        <Fragment key={draft._id}>
                        <DraftDiv>
                        <Button onClick={()=>reviewDraft(draft)}>
                        <DraftNumber>Draft {index+1}</DraftNumber>
                        </Button>
                        </DraftDiv>
                        </Fragment>
                    )
                })
                }
            </Drafts>}
        </Container>
    )
}

export default Profile

const Container = styled.div`
  background-image: url(${ProfileBackground});
    /* Photo by David Jorre on Unsplash */
  background-size: cover;
  color: rgb(227, 204, 174);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100vh;
`;

const Title = styled.h1`
    text-align: center;
    margin-top: 13rem;
    font-size: 3rem;
`

const Draft = styled.h2`
margin-left: 3rem;
`

const Drafts = styled.h3`
margin-left: 5rem;
`

const DraftNumber = styled.p`
text-decoration: none;
`

const Button = styled.button`
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-family: 'Monomaniac One', sans-serif;
    padding-left: 0.33rem;
    padding-bottom: 0.5rem;
    min-height: 8rem;
    min-width: 15rem;
    margin: 0.25rem;
    color:rgb(184, 98, 27);
    background-color: rgb(227, 204, 174);
    border: rgb(38, 42, 86) solid 0.2rem;

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


const DraftDiv = styled.div`
display: flex;

`