import { styled } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { LobbyContext } from "./LobbyContext";


const DraftPage = ({socket}) => {

    const [starterPacks, setStarterPacks] = useState(null)
    const [pack1, setPack1] = useState("")
    const [pack2, setPack2] = useState("")
    const [pack3, setPack3] = useState("")
    const [loading, setLoading] = useState(true)
    const [active, setActive]= useState(false)

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
            body: JSON.stringify({packIds:starterPacks}),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((parsed) => {
                if(parsed.status===200)
                    setPack1(parsed.data.pack1)
                    setPack2(parsed.data.pack2)
                    setPack3(parsed.data.pack3)
                    setLoading(false)
            })}
    },[starterPacks])


    // const mouseDownHandler = ( event ) => {
    //     event.preventDefault();
    //     if( event.button === 1 ) {
    //       setActive(true)
    //     }
    //   }

    //   const mouseUpHandler = ( event ) => {
    //     event.preventDefault();
    //     if( event.button === 1 ) {
    //       setActive(false)
    //     }
    //   }

    const selectCard = () => {

    }



    return (
        <>
        {!loading &&
        <Container>
            <DraftPack >
            {pack1.packData.map((packContent)=>{
                return (
                    <>
                    <ImageDiv key={packContent.name}>
                        <ImageButton 
                        onDoubleClick={selectCard}
                        // onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler}
                        >
                        <Image active={active} src={packContent.image_uris.png}/>
                        </ImageButton>
                        <Name>{packContent.name}</Name>
                    </ImageDiv>
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
  /* display: flex;
  flex-direction: row;
  justify-content: center; 
  align-items: center;
  margin:0;
  overflow: hidden;
  height: 100vh; */
`;

const Image = styled.img`
max-width: 10rem;
margin: 0;

/* &:active{
    max-width: 20rem;
    z-index: 1;
    position: static;
} */
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

