import { useState, useEffect, useContext } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { LobbyContext } from "./LobbyContext";
import { UserContext } from "./UserContext";
import { UpdatedContext } from "./UpdatedContext";

const NewLobby = () => {

  const [booster1, setBooster1] = useState("")
  const [booster2, setBooster2] = useState("")
  const [booster3, setBooster3] = useState("")
  const [userName, setUserName] = useState("")
  const [pack, setPack] = useState()
  const navigate = useNavigate()

  const {setCurrentLobby} = useContext(LobbyContext);
  const {currentUser, setCurrentUser} = useContext(UserContext);
  const {currentUpdated, setCurrentUpdated} = useContext(UpdatedContext);

  // promise.all

  const addPack = (event) => {
    event.preventDefault();
      fetch("/api/createlobby", {
        method: "POST",
        body: JSON.stringify({userName:currentUser, booster1, booster2, booster3}),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      })
        .then((response) => response.json())
        .then((parsed) => {
          console.log(parsed)
          if(parsed.status===201){
            localStorage.setItem("updated", JSON.stringify(parsed.lastUpdated));
            localStorage.setItem("lobby", JSON.stringify(parsed.newLobby.insertedId));
            setCurrentLobby(parsed.newLobby.insertedId);
            setCurrentUpdated(parsed.lastUpdated)
            navigate("/waitingroom");
          }
        });
  };

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
          <Form onSubmit={addPack}>
            <label>Pack1: </label><input type="text" id="id" autoComplete="off" onChange={(e) => setBooster1(e.target.value)}></input>
            <label>Pack2: </label><input type="text" id="id" autoComplete="off" onChange={(e) => setBooster2(e.target.value)}></input>
            <label>Pack3: </label><input type="text" id="id" autoComplete="off" onChange={(e) => setBooster3(e.target.value)}></input>
            <Button >Press Me</Button>
          </Form>
          <SetsList>
              {
            setsToDraft.map( (set) => 
            <Sets key={set.id} className="dropdown">{set.name} <Image key={set.id} src={set.icon_svg_uri}/> </Sets> 
            )
            }
            </SetsList>
          {pack && <Pack>
            {pack.map((cards)=>{
              return <PackImage key={cards.id} src={cards.image_uris.png}/>
            })}
          </Pack>}
        </Container>
    </>
  );
};

const Button = styled.button`
`;

const Form = styled.form`
`

const Pack = styled.div`
margin-top: 5rem;
`

const PackImage = styled.img`
padding:1rem;
max-height: 20rem;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin:0;
  overflow: hidden;
  height: 100vh;
`;

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

const Image = styled.img`
height:1rem;
`

export default NewLobby;
