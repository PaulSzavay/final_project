import { useContext, useEffect, useState, Fragment } from "react"
import { UserContext } from "./UserContext"
import { LobbyContext } from "./LobbyContext"
import { styled } from "styled-components";
import { useParams, useNavigate } from "react-router-dom";



const EndLobby = () => {

    const [loading, setLoading] = useState(true);
    const [plains, setPlains] = useState(0);
    const [islands, setIslands] = useState(0);
    const [swamps, setSwamps] = useState(0);
    const [mountains, setMountains] = useState(0);
    const [forests, setForests] = useState(0);

    const lobby_id = useParams()

    const navigate = useNavigate()

        useEffect(()=>{
            fetch("/api/findlobby", {
                method: 'POST',
                body: JSON.stringify({_id:lobby_id.lobby_id, userName:currentUser}),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    },
                })
                .then((response) => response.json())
                .then((parsed) => {
                    console.log(parsed)
                    setLoading(false)
                })
            
        },[])


    const {currentUser, setCurrentUser} = useContext(UserContext)
    const {currentLobby_id, setCurrentLobby_id, lobby, setLobby, updateLastUpdated, upToDate, setUpToDate} = useContext(LobbyContext)


    if(!loading ){
    
    const currentPlayer = lobby.players.find((player)=>{
        return player.userName === currentUser
    })

    const foundCards0CMCCreature = currentPlayer.pool.filter((card)=>{
        return card.card.cmc === 0 && card.card.type_line.includes("Creature")
    })

    const foundCards1CMCCreature = currentPlayer.pool.filter((card)=>{
        return card.card.cmc === 1 && card.card.type_line.includes("Creature")
    })

    const foundCards2CMCCreature = currentPlayer.pool.filter((card)=>{
        return card.card.cmc === 2 && card.card.type_line.includes("Creature")
    })

    const foundCards3CMCCreature = currentPlayer.pool.filter((card)=>{
        return card.card.cmc === 3 && card.card.type_line.includes("Creature")
    })

    const foundCards4CMCCreature = currentPlayer.pool.filter((card)=>{
        return card.card.cmc === 4 && card.card.type_line.includes("Creature")
    })

    const foundCards5CMCCreature = currentPlayer.pool.filter((card)=>{
        return card.card.cmc === 5 && card.card.type_line.includes("Creature")
    })

    const foundCards6CMCCreature = currentPlayer.pool.filter((card)=>{
        return card.card.cmc === 6 && card.card.type_line.includes("Creature")
    })

    const foundCards7OrMoreCMCCreature = currentPlayer.pool.filter((card)=>{
        return card.card.cmc >= 7 && card.card.type_line.includes("Creature")
    })

    const foundCards0CMCSpell = currentPlayer.pool.filter((card)=>{
        return card.card.cmc === 0 && !card.card.type_line.includes("Creature")
    })

    const foundCards1CMCSpell = currentPlayer.pool.filter((card)=>{
        return card.card.cmc === 1 && !card.card.type_line.includes("Creature")
    })

    const foundCards2CMCSpell = currentPlayer.pool.filter((card)=>{
        return card.card.cmc === 2 && !card.card.type_line.includes("Creature")
    })

    const foundCards3CMCSpell = currentPlayer.pool.filter((card)=>{
        return card.card.cmc === 3 && !card.card.type_line.includes("Creature")
    })

    const foundCards4CMCSpell = currentPlayer.pool.filter((card)=>{
        return card.card.cmc === 4 && !card.card.type_line.includes("Creature")
    })

    const foundCards5CMCSpell = currentPlayer.pool.filter((card)=>{
        return card.card.cmc === 5 && !card.card.type_line.includes("Creature")
    })

    const foundCards6CMCSpell = currentPlayer.pool.filter((card)=>{
        return card.card.cmc === 6 && !card.card.type_line.includes("Creature")
    })

    const foundCards7OrMoreCMCSpell = currentPlayer.pool.filter((card)=>{
        return card.card.cmc >= 7 && !card.card.type_line.includes("Creature")
    })


    const handleClick = (card) => {
        fetch("/api/pushToSideBoard", {
            method: 'POST',
            body: JSON.stringify({
                lobby_id:currentLobby_id,
                userName:currentPlayer.userName,
                card_id:card._id
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((parsed) => {
                console.log(parsed)
            })
    }


    const handleClick2 = (card) => {
        fetch("/api/pushBackToPool", {
            method: 'POST',
            body: JSON.stringify({
                lobby_id:currentLobby_id,
                userName:currentPlayer.userName,
                card_id:card._id
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((parsed) => {
                console.log(parsed)
            })
    }


    const numberOfNonLands = currentPlayer.pool.filter((card)=>{
        return !card.card.type_line.includes("Land")
    })

    const numberOfLands = currentPlayer.pool.filter((card)=>{
        return card.card.type_line.includes("Land")
    })



    const handleClickIncreasePlains = () => {
        setPlains(plains + 1)
    }

    const handleClickDecreasePlains = () => {
        setPlains(plains - 1)
    }

    const handleClickIncreaseIslands = () => {
        setIslands(islands + 1)
    }

    const handleClickDecreaseIslands = () => {
        setIslands(islands - 1)
    }

    const handleClickIncreaseSwamps = () => {
        setSwamps(swamps + 1)
    }

    const handleClickDecreaseSwamps = () => {
        setSwamps(swamps - 1)
    }

    const handleClickIncreaseMountains = () => {
        setMountains(mountains + 1)
    }

    const handleClickDecreaseMountains = () => {
        setMountains(mountains - 1)
    }

    const handleClickIncreaseForests = () => {
        setForests(forests + 1)
    }

    const handleClickDecreaseForests = () => {
        setForests(forests - 1)
    }


    const foundPlayer = lobby.players.find((player)=>{
        return player.userName === currentUser
    })



    const saveDraft = () => {

        fetch("/api/updateprofile", {
            method: 'POST',
            body: JSON.stringify({
                lobby_id:currentLobby_id,
                userName:currentUser,
                lands:{plains, islands, swamps, mountains, forests}
            }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((parsed) => {
                console.log(parsed)
                if(parsed.status === 200){
                    navigate("/")
                    localStorage.removeItem("lobby_id")
                }
            })

    }



    return (
        <>
        {!loading &&
        <PoolandSideboardDiv>
        <Pool >
            <HeaderDiv>
            <CardNumbers>Pool:</CardNumbers>
            </HeaderDiv>
            <HeaderDiv>
            <CardNumbers>Non Lands: {numberOfNonLands.length}</CardNumbers>
            <CardNumbers>Lands: {numberOfLands.length + plains + islands + swamps + mountains + forests}</CardNumbers>
            </HeaderDiv>
            <HeaderDiv>
                <CardNumbers>Basics</CardNumbers>
            <CardNumbers><ButtonDiv> Plains: {plains}   <Button onClick={handleClickIncreasePlains}>+</Button> <Button onClick={handleClickDecreasePlains}>-</Button></ButtonDiv> </CardNumbers>
            <CardNumbers><ButtonDiv> Islands: {islands}  <Button onClick={handleClickIncreaseIslands}>+</Button> <Button onClick={handleClickDecreaseIslands}>-</Button></ButtonDiv></CardNumbers>
            <CardNumbers><ButtonDiv> Swamps: {swamps}  <Button onClick={handleClickIncreaseSwamps}>+</Button> <Button onClick={handleClickDecreaseSwamps}>-</Button></ButtonDiv></CardNumbers>
            <CardNumbers><ButtonDiv> Mountains: {mountains}   <Button onClick={handleClickIncreaseMountains}>+</Button> <Button onClick={handleClickDecreaseMountains}>-</Button></ButtonDiv></CardNumbers>
            <CardNumbers><ButtonDiv> Forests: {forests}  <Button onClick={handleClickIncreaseForests}>+</Button> <Button onClick={handleClickDecreaseForests}>-</Button></ButtonDiv></CardNumbers>
            </HeaderDiv>
            <HeaderDiv>
            <CardNumbers><SaveButton onClick={saveDraft}>Save Draft</SaveButton></CardNumbers>
            </HeaderDiv>
            <DraftGrid>
                <Creatures>
                        <One id="0">
                        {foundCards0CMCCreature && foundCards0CMCCreature.map((card)=>{
                            return (
                                <Fragment key={card._id}>
                                <ImageDiv onDoubleClick={()=>handleClick(card)}>
                                    <Image value={card} src={card.card.image_uris.png}/>
                                </ImageDiv>    
                                </Fragment>
                            )
                        })}
                        </One>
                        <Two id="1">
                        {foundCards1CMCCreature && foundCards1CMCCreature.map((card)=>{
                            return (
                                <Fragment key={card._id}>
                                <ImageDiv onDoubleClick={()=>handleClick(card)}>
                                    <Image value={card} src={card.card.image_uris.png}/>
                                </ImageDiv>    
                                </Fragment>
                            )
                        })}
                        </Two>
                        <Three id="2">
                        {foundCards2CMCCreature && foundCards2CMCCreature.map((card)=>{
                            return (
                                <Fragment key={card._id}>
                                <ImageDiv onDoubleClick={()=>handleClick(card)}>
                                    <Image value={card} src={card.card.image_uris.png}/>
                                </ImageDiv>    
                                </Fragment>
                            )
                        })}
                        </Three>
                        <Four id="3">
                        {foundCards3CMCCreature && foundCards3CMCCreature.map((card)=>{
                            return (
                                <Fragment key={card._id}>
                                <ImageDiv onDoubleClick={()=>handleClick(card)}>
                                    <Image value={card} src={card.card.image_uris.png}/>
                                </ImageDiv>    
                                </Fragment>
                            )
                        })}
                        </Four>
                        <Five id="4">
                        {foundCards4CMCCreature && foundCards4CMCCreature.map((card)=>{
                            return (
                                <Fragment key={card._id}>
                                <ImageDiv onDoubleClick={()=>handleClick(card)}>
                                    <Image value={card} src={card.card.image_uris.png}/>
                                </ImageDiv>    
                                </Fragment>
                            )
                        })}
                        </Five>
                        <Six id="5">
                        {foundCards5CMCCreature && foundCards5CMCCreature.map((card)=>{
                            return (
                                <Fragment key={card._id}>
                                <ImageDiv onDoubleClick={()=>handleClick(card)}>
                                    <Image value={card} src={card.card.image_uris.png}/>
                                </ImageDiv>    
                                </Fragment>
                            )
                        })}
                        </Six>
                        <Seven id="6">
                        {foundCards6CMCCreature && foundCards6CMCCreature.map((card)=>{
                            return (
                                <Fragment key={card._id}>
                                <ImageDiv onDoubleClick={()=>handleClick(card)}>
                                    <Image value={card} src={card.card.image_uris.png}/>
                                </ImageDiv>    
                                </Fragment>
                            )
                        })}
                        </Seven>
                        <Eight id="7">
                        {foundCards7OrMoreCMCCreature && foundCards7OrMoreCMCCreature.map((card)=>{
                            return (
                                <Fragment key={card._id}>
                                <ImageDiv onDoubleClick={()=>handleClick(card)}>
                                    <Image value={card} src={card.card.image_uris.png}/>
                                </ImageDiv>    
                                </Fragment>
                            )
                        })}
                        </Eight>
                </Creatures>
                <Spells>
                <One id="0">
                        {foundCards0CMCSpell && foundCards0CMCSpell.map((card)=>{
                            return (
                                <Fragment key={card._id}>
                                <ImageDiv onDoubleClick={()=>handleClick(card)}>
                                    <Image value={card} src={card.card.image_uris.png}/>
                                </ImageDiv>    
                                </Fragment>
                            )
                        })}
                        </One>
                        <Two id="1">
                        {foundCards1CMCSpell && foundCards1CMCSpell.map((card)=>{
                            return (
                                <Fragment key={card._id}>
                                <ImageDiv onDoubleClick={()=>handleClick(card)}>
                                    <Image value={card} src={card.card.image_uris.png}/>
                                </ImageDiv>    
                                </Fragment>
                            )
                        })}
                        </Two>
                        <Three id="2">
                        {foundCards2CMCSpell && foundCards2CMCSpell.map((card)=>{
                            return (
                                <Fragment key={card._id}>
                                <ImageDiv onDoubleClick={()=>handleClick(card)}>
                                    <Image value={card} src={card.card.image_uris.png}/>
                                </ImageDiv>    
                                </Fragment>
                            )
                        })}
                        </Three>
                        <Four id="3">
                        {foundCards3CMCSpell && foundCards3CMCSpell.map((card)=>{
                            return (
                                <Fragment key={card._id}>
                                <ImageDiv onDoubleClick={()=>handleClick(card)}>
                                    <Image value={card} src={card.card.image_uris.png}/>
                                </ImageDiv>    
                                </Fragment>
                            )
                        })}
                        </Four>
                        <Five id="4">
                        {foundCards4CMCSpell && foundCards4CMCSpell.map((card)=>{
                            return (
                                <Fragment key={card._id}>
                                <ImageDiv onDoubleClick={()=>handleClick(card)}>
                                    <Image value={card} src={card.card.image_uris.png}/>
                                </ImageDiv>    
                                </Fragment>
                            )
                        })}
                        </Five>
                        <Six id="5">
                        {foundCards5CMCSpell && foundCards5CMCSpell.map((card)=>{
                            return (
                                <Fragment key={card._id}>
                                <ImageDiv onDoubleClick={()=>handleClick(card)}>
                                    <Image value={card} src={card.card.image_uris.png}/>
                                </ImageDiv>    
                                </Fragment>
                            )
                        })}
                        </Six>
                        <Seven id="6">
                        {foundCards6CMCSpell && foundCards6CMCSpell.map((card)=>{
                            return (
                                <Fragment key={card._id}>
                                <ImageDiv onDoubleClick={()=>handleClick(card)}>
                                    <Image value={card} src={card.card.image_uris.png}/>
                                </ImageDiv>    
                                </Fragment>
                            )
                        })}
                        </Seven>
                        <Eight id="7">
                        {foundCards7OrMoreCMCSpell && foundCards7OrMoreCMCSpell.map((card)=>{
                            return (
                                <Fragment key={card._id}>
                                <ImageDiv onDoubleClick={()=>handleClick(card)}>
                                    <Image value={card} src={card.card.image_uris.png}/>
                                </ImageDiv>    
                                </Fragment>
                            )
                        })}
                        </Eight>
                </Spells>
            </DraftGrid>
        </Pool>
        <Sideboard>
            <h1>Sideboard:</h1>
            <div>
                {currentPlayer.Sideboard && currentPlayer.Sideboard.map((cards)=>{
                    return (
                        <Fragment key={cards._id}>
                        <ImageDiv onDoubleClick={()=>handleClick2(cards)}>
                        <Image src={cards.card.image_uris.png}/>
                        </ImageDiv>
                        </Fragment>
                    )
                })}
            </div>
        </Sideboard>
        </PoolandSideboardDiv>
        }</>
    )
    }
}
    
    
    export default EndLobby;
    
    
    
    
    const Pool = styled.section`
    margin-top: 10rem;
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: start;
    `
    
    const DraftGrid = styled.div`
    `
    
    
    const One = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0.25rem 0;
    width: 10.5rem;
    background-color: grey;
    border: 0.1rem solid black;
    border-radius: 0.5rem;
    `
    
    const Two = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0.25rem 0;
    width: 10.5rem;
    background-color: grey;
    border: 0.1rem solid black;
    border-radius: 0.5rem;
    `
    
    const Three = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0.25rem 0;
    width: 10.5rem;
    background-color: grey;
    border: 0.1rem solid black;
    border-radius: 0.5rem;
    `
    
    const Four = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0.25rem 0;
    width: 10.5rem;
    background-color: grey;
    border: 0.1rem solid black;
    border-radius: 0.5rem;
    `
    
    const Five = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0.25rem 0;
    width: 10.5rem;
    background-color: grey;
    border: 0.1rem solid black;
    border-radius: 0.5rem;
    `
    
    const Six = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0.25rem 0;
    width: 10.5rem;
    background-color: grey;
    border: 0.1rem solid black;
    border-radius: 0.5rem;
    `
    
    const Seven = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0.25rem 0;
    width: 10.5rem;
    background-color: grey;
    border: 0.1rem solid black;
    border-radius: 0.5rem;
    `
    
    const Eight = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 0.25rem 0;
    width: 10.5rem;
    background-color: grey;
    border: 0.1rem solid black;
    border-radius: 0.5rem;
    `
    
    
    const Image = styled.img`
    max-width: 10rem;
    z-index:2;
    
    `
    
    const ImageDiv = styled.div`
    margin: 0.25rem 0 0 0;
    height: 1.15rem;
    &:hover{
        transform: scale(1.15) ;
        z-index: 5;
    }
    `
    
    const Creatures = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    min-height: 30rem;
    `
    
    const Spells = styled.div`
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    min-height: 30rem;
    position: relative;
    `
    
    const Sideboard = styled.section`
    margin-top: 27rem;
    width: 33%;
    display: flex;
    flex-direction: column;
    
    align-items: start;
    
    `
    
    const PoolandSideboardDiv = styled.div`
    display: flex;
    `

    const HeaderDiv = styled.div`
    display:flex;
    `

    const CardNumbers = styled.h2`
    margin-left: 1.5rem;
    `

    const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 2rem;
    font-family: 'Monomaniac One', sans-serif;
    padding-left: 0.33rem;
    padding-bottom: 0.5rem;
    height: 2rem;
    width: 2rem;
    margin: 0.25rem;
    color:rgb(184, 98, 27);
    background-color: rgb(227, 204, 174);
    border: rgb(38, 42, 86) solid 0.1rem;

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

    const ButtonDiv = styled.div`
    display: flex;
    `


const SaveButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-family: 'Monomaniac One', sans-serif;
    padding-left: 0.33rem;
    padding-bottom: 0.5rem;

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