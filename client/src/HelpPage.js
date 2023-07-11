import { styled } from "styled-components"
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const HelpPage = ({setHelpPageDisplay}) => {

    const closeFunction = () => {
        setHelpPageDisplay(false)
    }

    return (
        <>
        <Container >
        <HelpSection>
            <Icon>
                <Button onClick={closeFunction}><AiOutlineClose  /></Button>
            </Icon>
            
                <Title>How To:</Title>
                <ul>
                    <li>To start a lobby, click on "Create a New Lobby"</li>
                    <li>Choose the packs you want to draft</li>
                    <li>Invite friends by sending them your "Room ID"</li>
                    <li>Once everyone is "Ready" you can "Start" the draft; if you are less than 8 players, bots will be added to complete the draft pod</li>
                    <li>Mouse Over cards to increase their size and double click them to select them</li>
                </ul>
        </HelpSection>
        </Container>     
        </>
        
    )
}

export default HelpPage


const Container = styled.section`
/* visibility: hidden; */
display: flex;
justify-content: center;
align-items: center;
z-index: 100;
position: fixed;
top:0;
width: 100%;
height: 100vh;
`


const HelpSection = styled.div`
width: 33%;
padding: 6rem 6rem 7rem 6rem;
background-color: rgb(227, 204, 174);
border-radius: 0.5rem;
font-size: 1.25rem;
`


const Title = styled.h1`
font-size: 2.5rem;
text-align: center;
margin-bottom: 3rem;
`

const Icon = styled.div`
margin:-5.5rem -5.5rem 0 0;
display: flex;
justify-content: right;
`

const Button = styled.button`
min-height: 1rem;
min-width: 1rem;
display: flex;
justify-content: center;
align-items: center;
font-size: 1.5rem;
color:rgb(184, 98, 27);
background-color: rgb(38, 42, 86);
padding: 0.5rem;
border: none;


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