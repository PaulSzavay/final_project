import { styled } from "styled-components"
import { useState, useContext } from "react"
import { UserContext } from "./UserContext"
import { LobbyContext } from "./LobbyContext"

const Messenger = () => {

    const [message, setMessage] = useState("")
    const [messageReceived, setMessageReceived] = useState("")

    const {currentUser} = useContext(UserContext)
    const {lobby, currentLobby_id} = useContext(LobbyContext)




    const sendMessageFunction = () => {

        fetch("/api/sendMessage", {
            method: 'POST',
            body: JSON.stringify({
                lobby_id:currentLobby_id,
                userName:currentUser,
                message,
                time:Date.now()
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


    return (
        <>
            <MessengerForm>
              <Input placeholder="Message..." value={message} onChange={(event)=>{setMessage(event.target.value)}}/>
              <Button onClick={sendMessageFunction}>Send Message</Button>
            </MessengerForm>
            <MessengerSection>
            <Title>Messages:</Title>
            
            {lobby.messages && lobby.messages.map((message, index)=>{
                let date = new Date(message.time)
                let even = index%2 === 0
                return(
                    <>
                    <Chat>
                    <Left>
                    {even &&
                    <>
                    <Message>
                    <From>{message.userName} {date.toUTCString()}</From>
                    <Messages>{message.message}</Messages>
                    </Message>
                    </>
                    }
                    </Left>
                    <Right>
                    {!even &&
                    <>
                    <Message>
                    <From>{message.userName} {date.toUTCString()}</From>
                    <Messages>{message.message}</Messages>
                    </Message>
                    </>
                    }
                    </Right>
                    </Chat>
                    </>
                )
            })}
            </MessengerSection>
        </>
    )
}


export default Messenger


const MessengerForm = styled.form`
margin-left: 3rem;
`

const Title = styled.h2`
font-size: 1.75rem;
color:rgb(38, 42, 86);
`

const Messages = styled.p`
margin-left: 1rem;
`

const From = styled.p`
margin-top: 1rem;
text-align: center;
`

const Input = styled.input`
  font-family: 'Monomaniac One', sans-serif;
  font-size: 1.5rem;
  margin: 1rem;
  width: 30rem;
  background-color: rgb(227, 204, 174);
  &:focus {
    outline: 2px solid grey;
  }
`

const Button = styled.button`
  align-items: center;
  background-color: black;
  border: 1px solid darkgrey;
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgb(227, 204, 174);
  cursor: pointer;
  font-family: 'Monomaniac One', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.25;
  margin: 0;
  padding: 0.5rem;
  text-decoration: none;
  transition: all 250ms;
  width: 10rem;

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

&:disabled{
  opacity: 0.5
}
`


const MessengerSection = styled.div`
width: 58rem;
min-height: 25rem;
margin: 2rem;
padding: 0 1rem;
border-radius: 1rem;
display: flex;
flex-direction: column;
overflow-y: auto;
color: rgb(184, 98, 27);
background-color: rgb(227, 204, 174);
`

const Chat = styled.div`
display: flex;
`

const Left = styled.div`
width: 50%;
justify-content: start;
`

const Right = styled.div`
width: 50%;
justify-content: end;
`

const Message = styled.div`
border: 0.2rem solid rgb(38, 42, 86);
border-radius: 1rem;

min-width: 22rem;
height: 8rem;
display: flex;
flex-direction: column;
overflow-y: auto;
overflow-x: auto;
`