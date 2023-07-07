import {useState, useEffect} from "react"



const useLobby = (lobby_id) => {
    const [lobby, setLobby] = useState({lastUpdated: 0})

    const updateLastUpdated = (lastUpdated) => {
        setLobby({...lobby, lastUpdated})
    } 
    
    // if response from server too long, create useEffect that sets updateLastUpdated to Date.now()

    useEffect(()=>{
        let timer;
        if (lobby.lastUpdated) {
            const keepUpToDate = () => {
                fetch('/api/uptodate', {
                    method: 'POST',
                    body: JSON.stringify({
                        _id: lobby_id,
                        lastUpdated: lobby.lastUpdated
                    }),
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        },
                    })
                .then((response)=>response.json())
                .then((parsed)=>{
                    if(parsed.status === 200 && parsed.upToDate === false){
                        setLobby(parsed.lobby)
                    }
                    if(parsed.status === 200 && parsed.upToDate === true){
                        timer = setTimeout(keepUpToDate, 2000)
                    }
                }
                )
            }
            timer = setTimeout(keepUpToDate,2000)
        }
        return () => {
            clearTimeout(timer)
        }
    }, [lobby.lastUpdated] )

    useEffect(()=>{
        if(!lobby_id){
            setLobby({lastUpdated: 0})
        }
        else{
            fetch("/api/findlobbyWithLobbyId", {
                method: 'POST',
                body: JSON.stringify({
                    _id: lobby_id,
                }),
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    },
                })
                .then((response)=>response.json())
                .then((parsed)=>{
                    if(parsed.status === 200){
                        setLobby(parsed.lobby)
                    }
                })
        }
    }, [lobby_id])

    return [lobby, setLobby, updateLastUpdated]
}


export default useLobby



    // // to use:
    // const [lobby, setLobby] = useLobby()