import { useState, useEffect, useContext, useRef } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { LobbyContext } from "./LobbyContext";
import { UserContext } from "./UserContext";
import LobbyBackground from "./Assets/LobbyBackground.jpg";
import useLobby from "./useLobby";


const NewLobby = () => {

  const [booster1, setBooster1] = useState("")
  const [booster2, setBooster2] = useState("")
  const [booster3, setBooster3] = useState("")
  const [isMenuVisible, setIsMenuVisible] = useState(true)
  const [isMenuVisible2, setIsMenuVisible2] = useState(true)
  const [isMenuVisible3, setIsMenuVisible3] = useState(true)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex]=useState(0)
  const [selectedSuggestionIndex2, setSelectedSuggestionIndex2]=useState(0)
  const [selectedSuggestionIndex3, setSelectedSuggestionIndex3]=useState(0)


  const navigate = useNavigate()

  const [allData, setAllData] = useState([])



  const {setCurrentLobby_id, lobby, setLobby, updateLastUpdated} = useContext(LobbyContext);
  const {currentUser, setCurrentUser} = useContext(UserContext);
  
  const setsRef = useRef(null);
  const setsRef2 = useRef(null);
  const setsRef3 = useRef(null);

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

  const setsToDraft = allData.filter((data)=>{
    return (data.set_type === "masters" || data.set_type === "expansion" || data.set_type === "core" || data.set_type === "draft_innovation") && (data.released_at < Date.now)
})


const matchedItems = setsToDraft.filter((set) => {
  return set.name.toLowerCase().includes(booster1.toLowerCase())}
);

  const getHighlightedText = (text) => {
    const valueIndex = text.toLowerCase().indexOf(booster1.toLowerCase());
    const firstHalf1 = text.slice(0, valueIndex + booster1.length);
    const secondHalf1 = text.slice(valueIndex + booster1.length);
    return { firstHalf1, secondHalf1 };
  };


  const handleClickItem=(item) => {
    setBooster1(item)
    setIsMenuVisible(false)
}

const matchedItems2 = setsToDraft.filter((set) => {
  return set.name.toLowerCase().includes(booster2.toLowerCase())}
);

const getHighlightedText2 = (text) => {
  const valueIndex = text.toLowerCase().indexOf(booster2.toLowerCase());
  const firstHalf2 = text.slice(0, valueIndex + booster2.length);
  const secondHalf2 = text.slice(valueIndex + booster2.length);
  return { firstHalf2, secondHalf2 };
};


const handleClickItem2 = (item) => {
  setBooster2(item)
  setIsMenuVisible2(false)
}

const matchedItems3 = setsToDraft.filter((set) => {
  return set.name.toLowerCase().includes(booster3.toLowerCase())}
);


const getHighlightedText3 = (text) => {
  const valueIndex = text.toLowerCase().indexOf(booster3.toLowerCase());
  const firstHalf3 = text.slice(0, valueIndex + booster3.length);
  const secondHalf3 = text.slice(valueIndex + booster3.length);
  return { firstHalf3, secondHalf3 };
};


const handleClickItem3 = (item) => {
  setBooster3(item)
  setIsMenuVisible3(false)
}

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
            localStorage.setItem("lobby_id", JSON.stringify(parsed.foundNewLobby._id));
            setLobby(parsed.foundNewLobby)
            setCurrentLobby_id(parsed.foundNewLobby._id);
            navigate("/waitingroom");
          }
        });
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "Enter": {
        const selectedItem = matchedItems[selectedSuggestionIndex];
        handleClickItem(selectedItem.name);
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        if (booster1.length >= 2 && isMenuVisible) {
          setSelectedSuggestionIndex(
            selectedSuggestionIndex >= 1 ? selectedSuggestionIndex - 1 : 0
          );
        }
        break;
      }
      case "ArrowDown": {
        event.preventDefault();
        if (booster1.length >= 2 && isMenuVisible) {
          setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
        }
        break;
        }
        case "Escape": {
            setIsMenuVisible(false);
            break;
          }
        //this is just depending if its windows or mac, on mac they behave the same way these 2 key names
      case "Delete":
        case "Backspace": {
            setSelectedSuggestionIndex(0);
            if (!booster1) {
                setIsMenuVisible(false);
              }
          break;
        }
        default:
          break;
      }
  };

  const handleKeyDown2 = (event) => {
    switch (event.key) {
      case "Enter": {
        const selectedItem2 = matchedItems2[selectedSuggestionIndex2];
        handleClickItem2(selectedItem2.name);
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        if (booster2.length >= 2 && isMenuVisible2) {
          setSelectedSuggestionIndex2(
            selectedSuggestionIndex2 >= 1 ? selectedSuggestionIndex2 - 1 : 0
          );
        }
        break;
      }
      case "ArrowDown": {
        event.preventDefault();
        if (booster2.length >= 2 && isMenuVisible2) {
          setSelectedSuggestionIndex2(selectedSuggestionIndex2 + 1);
        }
        break;
        }
        case "Escape": {
            setIsMenuVisible2(false);
            break;
          }
        //this is just depending if its windows or mac, on mac they behave the same way these 2 key names
      case "Delete":
        case "Backspace": {
            setSelectedSuggestionIndex2(0);
            if (!booster2) {
                setIsMenuVisible2(false);
              }
          break;
        }
        default:
          break;
      }
  };

  const handleKeyDown3 = (event) => {
    switch (event.key) {
      case "Enter": {
        const selectedItem3 = matchedItems3[selectedSuggestionIndex3];
        handleClickItem3(selectedItem3.name);
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        if (booster3.length >= 2 && isMenuVisible3) {
          setSelectedSuggestionIndex3(
            selectedSuggestionIndex3 >= 1 ? selectedSuggestionIndex3 - 1 : 0
          );
        }
        break;
      }
      case "ArrowDown": {
        event.preventDefault();
        if (booster3.length >= 2 && isMenuVisible3) {
          setSelectedSuggestionIndex3(selectedSuggestionIndex3 + 1);
        }
        break;
        }
        case "Escape": {
            setIsMenuVisible3(false);
            break;
          }
        //this is just depending if its windows or mac, on mac they behave the same way these 2 key names
      case "Delete":
        case "Backspace": {
            setSelectedSuggestionIndex3(0);
            if (!booster3) {
                setIsMenuVisible3(false);
              }
          break;
        }
        default:
          break;
      }
  };



  useEffect(() => {
    // Scroll the suggestions list to bring the selected suggestion into view
    if (setsRef.current) {
      const selectedSuggestion = setsRef.current.querySelector(
        "div.selected"
      );
      if (selectedSuggestion) {
        selectedSuggestion.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [selectedSuggestionIndex]);

  useEffect(() => {
    // Scroll the suggestions list to bring the selected suggestion into view
    if (setsRef2.current) {
      const selectedSuggestion2 = setsRef2.current.querySelector(
        "div.selected"
      );
      if (selectedSuggestion2) {
        selectedSuggestion2.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [selectedSuggestionIndex2]);

  useEffect(() => {
    // Scroll the suggestions list to bring the selected suggestion into view
    if (setsRef3.current) {
      const selectedSuggestion3 = setsRef3.current.querySelector(
        "div.selected"
      );
      if (selectedSuggestion3) {
        selectedSuggestion3.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [selectedSuggestionIndex3]);



  return (
    <>
        <Container>
          <Title>Create a Lobby!</Title>
          <Form onSubmit={addPack}>
            
            <PackLabel>Pack1: </PackLabel>
            <InputAndListDiv>
            <PackInput type="text" 
            value={booster1}
            id="search" 
            autoComplete="off" 
            onChange={(event) => {setBooster1(event.target.value); 
            setIsMenuVisible(true)}} 
            onKeyDown={handleKeyDown}
            />
            <SetsList  >
            {
              matchedItems.map((set, index)=>{
                const { firstHalf1, secondHalf1 } = getHighlightedText(set.name);
                const isSelected = matchedItems[selectedSuggestionIndex] === set;
                return(
                  <>
                  {isMenuVisible && booster1.length > 1 && 
                  <SetDiv ref={setsRef}
                  onClick={() => handleClickItem  (set.name)}
                  onMouseEnter={() => setSelectedSuggestionIndex(index)}
                  className={isSelected ? 'selected' : ''}
                  >
                    <Sets>
                      {firstHalf1}
                      <Bold>{secondHalf1}</Bold>
                    </Sets>
                    <Image src={set.icon_svg_uri} />
                  </SetDiv>}
                  </>
                )
              })
            }
            </SetsList>
            </InputAndListDiv>

            <PackLabel>Pack2: </PackLabel>
            <InputAndListDiv>
            <PackInput type="text" 
            value={booster2}
            id="search" 
            autoComplete="off" 
            onChange={(event) => {setBooster2(event.target.value); 
            setIsMenuVisible2(true)}} 
            onKeyDown={handleKeyDown2}
            />
            <SetsList>
            {
              matchedItems2.map((set, index)=>{
                const { firstHalf2, secondHalf2 } = getHighlightedText2(set.name);
                const isSelected2 = matchedItems2[selectedSuggestionIndex2] === set;
                return(
                  <>
                  {isMenuVisible2 && booster2.length > 1 && 
                  <SetDiv ref={setsRef2}
                  onClick={() => handleClickItem2(set.name)}
                  onMouseEnter={() => setSelectedSuggestionIndex2(index)}
                  className={isSelected2 ? 'selected' : ''}
                  >
                    <Sets>
                      {firstHalf2}
                      <Bold>{secondHalf2}</Bold>
                    </Sets>
                    <Image src={set.icon_svg_uri} />
                  </SetDiv>}
                  </>
                )
              })
            }
            </SetsList>
            </InputAndListDiv>

            <PackLabel>Pack3: </PackLabel>
            <InputAndListDiv>
            <PackInput type="text" 
            value={booster3}
            id="search" 
            autoComplete="off" 
            onChange={(event) => {setBooster3(event.target.value); 
            setIsMenuVisible3(true)}} 
            onKeyDown={handleKeyDown3}
            />
            <SetsList>
            {
              matchedItems3.map((set, index)=>{
                const { firstHalf3, secondHalf3 } = getHighlightedText3(set.name);
                const isSelected3 = matchedItems3[selectedSuggestionIndex3] === set;
                return(
                  <>
                  {isMenuVisible3 && booster3.length > 1 && 
                  <SetDiv ref={setsRef3}
                  onClick={() => handleClickItem3(set.name)}
                  onMouseEnter={() => setSelectedSuggestionIndex3(index)}
                  className={isSelected3 ? 'selected' : ''}
                  >
                    <Sets>
                      {firstHalf3}
                      <Bold>{secondHalf3}</Bold>
                    </Sets>
                    <Image src={set.icon_svg_uri} />
                  </SetDiv>}
                  </>
                )
              })
            }
            </SetsList>
            </InputAndListDiv>
            
            <Button >Press Me</Button>
          </Form>
        </Container>
    </>
  );
};



export default NewLobby;

const Container = styled.div`
  background-image: url(${LobbyBackground});
    /* Photo by Annie Spratt on Unsplash */
  background-size: cover;
  color: rgb(227, 204, 174);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  height: 100vh;
`;

const Title = styled.h1`
margin-top: 13rem;
text-align: center;
font-size: 3rem;
`


const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  border: 1px solid darkgrey;
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgb(227, 204, 174);
  cursor: pointer;
  font-family: 'Monomaniac One', sans-serif;
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1.25;
  margin: 0;
  padding: 0.75rem;
  text-decoration: none;
  transition: all 250ms;
  width: 10rem;
  max-height: 2.8rem;

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
`;

const Form = styled.form`
display: flex;
text-align: center;
margin-top: 5rem;
`



const SetsList = styled.ul`
max-height: 15rem;
overflow-y : scroll;
margin: 0.5rem 0 0 0;
padding:0;


`

const Image = styled.img`
height:1rem;
margin: 0.3rem 0 0 0.5rem;
`

const PackLabel = styled.label`
margin: 0 1rem 0 0;
font-size: 1.5rem;
`


const PackInput = styled.input`
margin-right: 1rem;
width: 23rem;
font-size: 1.5rem;
font-family: 'Monomaniac One', sans-serif;
`

const SetDiv = styled.div`
margin: 0;
display: flex;
flex-direction: row;
background-color: white;
border: 0.1rem solid black;
height: 1.76rem;
z-index: 5;

  &.selected {
    background-color:green;
  }

&:hover {
  background-color: green;
}

`


const InputAndListDiv = styled.div`
display: flex;
flex-direction: column;
`

const Bold = styled.span`
color: black;
`

const Sets = styled.div`
display: flex;
font-size: 1.15rem;
min-height: 1.75rem;

list-style: none;
padding: 0 0.5rem;
z-index: 2;



&:hover, :focus {
  background-color: green;

}
`