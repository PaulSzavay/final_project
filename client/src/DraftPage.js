import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { LobbyContext } from "./LobbyContext";
import PlayerPool from "./PlayerPool";
import PodRotation from "./PodRotation";
import { useNavigate, Navigate } from "react-router-dom";



const DraftPage = () => {

    const [starterPacks, setStarterPacks] = useState(null)
    const [pack, setPack] = useState("")
    const [loading, setLoading] = useState(true)

    const {currentUser} = useContext(UserContext)
    const {currentLobby_id, setCurrentLobby_id, lobby, setLobby, updateLastUpdated, upToDate} = useContext(LobbyContext)


    const navigate = useNavigate();



    useEffect(()=>{
        fetch("/api/findlobby", {
            method: 'POST',
            body: JSON.stringify({_id:currentLobby_id, userName:currentUser}),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((parsed) => {
                if(parsed.status===200){
                    setStarterPacks(parsed.userPacks)
                }
                
            })
    },[])



    useEffect(()=>{
        {starterPacks !== null &&
        fetch("/api/findpacks", {
            method: 'POST',
            body: JSON.stringify({
                packIds:starterPacks,
                lobby_id:currentLobby_id
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((parsed) => {
                if(parsed.status===200)
                    setPack(parsed.data.pack1)
                    setLoading(false)  
            })}
    },[starterPacks])


    const selectCard = ( _id) => {
        setPack("");
        fetch('/api/pickacard', {
            method: 'POST',
            body: JSON.stringify({
                pack_id: pack._id,
                card_id:_id,
                player_userName:currentUser,
                lobby_id:currentLobby_id
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((parsed) => {
                if(parsed.status===200){
                    setPack(parsed.data.pack1);                 
                }
            });
    }

    if(lobby.lastUpdate !== 0 && !loading){
        const draftEndedCheck = lobby.players.every((player)=>{
            return player.packs.length === 0
        })
        if( draftEndedCheck ){
            return <Navigate to={`/EndLobby/${lobby._id}`}/>
        }}



    return (
        <>
        {!loading &&
        <Container>
            <PodRotation />
            <DraftPack >
            {pack !== undefined && typeof(pack) === "object" && pack.packData.map((packContent)=>{
                return (
                    <>
                    {packContent.isPicked===false && 
                    <ImageDiv key={packContent.card.oracle_id}>
                        <ImageButton 
                        key={packContent.card.id}
                        onDoubleClick={()=>{selectCard(packContent._id)}}
                        id={packContent._id}
                        >
                        {packContent.card.image_uris.png ? <Image key={packContent.card.multiverse_ids} src={packContent.card.image_uris.png}/>
                        :
                        <Image key={packContent.card.multiverse_ids} src={packContent.card.card_faces[0].image_uris.png}/>
                        }
                        </ImageButton>
                        <Name key={packContent.card.name}>{packContent.card.name}</Name>
                    </ImageDiv>}
                    </>
                )
            })}
            </DraftPack>
        </Container>
        }
        {!loading && <PlayerPool/>}
        </>
    )
};

export default DraftPage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center;
  margin:0;

`;

const Image = styled.img`
max-width: 10rem;
margin: 0;

&:hover{
    transform: scale(1.75) ;
    z-index: 1;
}
`

const DraftPack = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
margin: 0 33%;
text-align: center;

`

const ImageDiv = styled.div`
width: 100%;
padding: 0.05rem 0.25rem;
`

const Name = styled.p`
margin: 0;
`

const ImageButton = styled.button`
`

