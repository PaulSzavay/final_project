
import { useContext, useEffect, useState } from "react"
import { styled } from "styled-components"
import { LobbyContext } from "./LobbyContext"
import profilepic from "./Assets/profilepic.png"

const PodRotation = () => {

    const [direction,setDirection] =useState("")

    const {lobby} = useContext(LobbyContext)

    useEffect(()=>{
    if(lobby.lastUpdated !== 0 && lobby.players[0].packs.length%2 === 0){
        setDirection("Right")
    }
    if(lobby.lastUpdated !== 0 && lobby.players[0].packs.length%2 !== 0){
        setDirection("Left")
    }
    },[lobby])


    return (
        <>
        {lobby.lastUpdated === 0 ? <h1>loading...</h1> :
            <Container>

            <Pod>
            
            <Player>
            <Circle></Circle>
            <Name>{lobby.players[0].userName}</Name>
            </Player>

            <Middle>
            <Top>
            <Player>
            <Circle></Circle>
            <Name>{lobby.players[1].userName}</Name>
            </Player>
            <Player>
            <Circle></Circle>
            <Name>{lobby.players[2].userName}</Name>
            </Player>
            <Player>
            <Circle></Circle>
            <Name>{lobby.players[3].userName}</Name>
            </Player>
            </Top>

            <Table>Pod Passing {direction}</Table>

            <Bottom>
            <Player>
            <Circle></Circle>
            <Name>{lobby.players[7].userName}</Name>
            </Player>
            <Player>
            <Circle></Circle>
            <Name>{lobby.players[6].userName}</Name>
            </Player>
            <Player>
            <Circle></Circle>
            <Name>{lobby.players[5].userName}</Name>
            </Player>
            </Bottom>
            </Middle>

            <Player>
            <Circle></Circle>
            <Name>{lobby.players[4].userName}</Name>
            </Player>

            </Pod>
            

            </Container>
        }
        </>
    )
}

export default PodRotation


const Container = styled.section`
display: flex;
justify-content: center;
align-items: center;
margin: 8rem 0 0 0;
transform: scale(0.8);
`


const Table = styled.div`
    font-size: 2rem;
    height: 20rem;
    width: 25rem;
    color: rgb(227, 204, 174);
    background-color: #632000;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Circle = styled.div`
    height: 5rem;
    width: 5rem;
    background-color: #39918C;
    border-radius: 50%;
    margin: 0 1rem;
    background-image: url(${profilepic});
    background-size: cover;
`

const Top = styled.div`
display: flex;
height: 50%;
`

const Bottom = styled.div`
display: flex;
height: 50%;
`

const Pod = styled.div`
display: flex;
min-width: 50rem;
min-height: 25rem;
justify-content: center;
align-items: center;
`

const Name = styled.p`
margin: 0;
`

const Player = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`


const Middle = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 30rem;
`