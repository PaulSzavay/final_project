import { styled } from "styled-components";
import HomePageBackground from "./Assets/BackgroundCropped.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import DraftGrid from "./DraftGrid";




const Home = () => {

    const [allData, setAllData] = useState([])

    useEffect(() => {
        fetch("https://api.scryfall.com/sets")
              .then((response) => response.json())
              .then((parsed)=>{
                    setAllData(parsed.data)
          })
          .catch((error) => {
              console.log(error);
          })
      }, []);

    const setTypes = allData.map((dataPoint)=>{
        return dataPoint.set_type
    })



      const onlyUnique = (value, index, array) => {
        return array.indexOf(value) === index;
      }
      
      var unique = setTypes.filter(onlyUnique);
      




      const setsToDraft = allData.filter((data)=>{
        return (data.set_type === "masters" || data.set_type === "expansion" || data.set_type === "core" || data.set_type === "draft_innovation") && (data.released_at < Date.now)
    })


    const setsToDraftName = setsToDraft.map((set)=>{
        return set.name
    })


    const setsToDraftIcons = setsToDraft.map((set)=>{
        return set.icon_svg_uri 
    })



    return (
        <>
        <Container>
            <CreateALobbyButton to="/NewLobby">Create a New Lobby!</CreateALobbyButton>
            <JoinALobbyButton to="/JoinLobby">Join a Lobby!</JoinALobbyButton>
            
            <DraftTab>
            <ListDiv>
              <ListTitle>Sets</ListTitle>
              <SetsList>
              {
            setsToDraft.map( (set) => 
            <Sets key={set.id} className="dropdown">{set.name} <Image key={set.id} src={set.icon_svg_uri}/> </Sets> 
            )
            }
              </SetsList>
            </ListDiv>
            <Time><Input></Input>seconds</Time>
            </DraftTab>
            

        </Container>
        <DraftGrid/>
        </>
    )

}


export default Home;

const Container = styled.section`
    margin:0;
    overflow: hidden;
    background-image: url(${HomePageBackground});
    /* Photo by Lucas Kapla on Unsplash */
    background-size: cover;
    width: 100%;
    height: 100vh;
    z-index: -10000;
    display: flex;
    justify-content: center;
    align-items: center;
`

const CreateALobbyButton = styled(Link)`
text-decoration: none;
color:white;
font-size: 2.5rem;
font-weight: 700;
border:0.2rem solid white;
padding: 1rem;
`

const JoinALobbyButton = styled(Link)`
text-decoration: none;
color:white;
font-size: 2.5rem;
font-weight: 700;
border:0.2rem solid white;
padding: 1rem;
`

const DraftTab = styled.div`
`

const Image = styled.img`
height:1rem;
`

const Time = styled.div`
`

const Input = styled.input`
font-family: 'Monomaniac One', sans-serif;
width: 3.5rem;
`

const Sets = styled.li`
background-color: white;
list-style: none;
padding: 0 1rem;
margin: 0;
visibility:hidden;
&:hover {
        color: red;
        cursor: pointer;
    }

`

const SetsList = styled.ul`
    max-height: 20rem;
    overflow-y : scroll;
    margin:0;
    padding:0;
    &::-webkit-scrollbar{
        display:none
    }
`

const ListDiv = styled.div`
    &:hover ${Sets}{
    visibility: visible;
}

`


const ListTitle = styled.p`
&:hover {
        color: red;
        cursor: pointer;
    }


`