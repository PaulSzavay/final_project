import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { LobbyContext } from "./LobbyContext";


const DraftPage = ({socket}) => {

    const [starterPacks, setStarterPacks] = useState(null)
    const [pack, setPack] = useState("")
    const [loading, setLoading] = useState(true)

    const [selectedCard, setSelectedCard] = useState("")

    const {currentUser} = useContext(UserContext)
    const {currentLobby} = useContext(LobbyContext)

    useEffect(()=>{
        if (currentLobby !== ""){
            socket.emit("join_room", currentLobby)
        }
    }, [socket]);

    useEffect(()=>{
        fetch("/api/findlobby", {
            method: 'POST',
            body: JSON.stringify({_id:currentLobby, userName:currentUser}),
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
                lobby_id:currentLobby
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((parsed) => {
                console.log(parsed)
                if(parsed.status===200)
                    setPack(parsed.data.pack1)
                    setLoading(false)
            })}
    },[starterPacks])

    console.log(pack.packData)


    const selectCard = ( _id) => {

        fetch('/api/pickacard', {
            method: 'POST',
            body: JSON.stringify({
                pack_id: pack._id,
                card_id:_id,
                player_userName:currentUser,
                lobby_id:currentLobby
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((parsed) => {
                console.log(parsed);
                });


    }





    return (
        <>
        {!loading &&
        <Container>
            <DraftPack >
            {pack && pack.packData.map((packContent)=>{
                // console.log(packContent[0].card_faces[0].image_uris.png)
                return (
                    <>
                    {packContent.isPicked===false && 
                    <ImageDiv key={packContent.card.oracle_id}>
                        <ImageButton 
                        key={packContent.card.id}
                        onDoubleClick={()=>{selectCard(packContent._id)}}
                        id={packContent._id}
                        >
                        {packContent.card.card_faces ? <Image key={packContent.card.multiverse_ids} src={packContent.card.card_faces[0].image_uris.png}/>
                        :
                        <Image key={packContent.card.multiverse_ids} src={packContent.card.image_uris.png}/>}
                        </ImageButton>
                        <Name key={packContent.card.name}>{packContent.card.name}</Name>
                    </ImageDiv>}
                    </>
                )
            })}
            </DraftPack>
        </Container>
        }
        </>
    )
};

export default DraftPage

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center; 
  align-items: center;
  margin:0;
  height: 110vh;

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
margin: 10% 25% 0 25%;
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

