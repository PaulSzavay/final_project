'use strict';
const express = require('express');
const morgan = require("morgan");
const app = express();


app.use(express.json());
app.use(morgan("tiny"));

// endpoints
const {createLobby} = require("./Handlers/createALobby")
const {getABooster} = require("./Handlers/getABoosterPack");
const { joinALobby } = require('./Handlers/joinALobby');
const { createUser } = require('./Handlers/createUser');
const { readyCheck } = require('./Handlers/readyCheck');
const { getUser } = require('./Handlers/getUser');
const { getUsers } = require('./Handlers/getUsers');
const { signIn } = require('./Handlers/signIn');
const { signUp } = require('./Handlers/signUp');
const { lobbyCheck } = require('./Handlers/LobbyCheck');
const { partyLeaderCheck } = require('./Handlers/partyLeaderCheck');
const { fillLobby } = require('./Handlers/fillLobby');
const { findLobby } = require('./Handlers/findLobby');
const { findPacks } = require('./Handlers/findPacks');
const { pickACard } = require('./Handlers/pickACard');
const { testDraftStarted } = require('./Handlers/testToStartDraft');
const { UpToDate } = require('./Handlers/UpToDate');
const { findLobbyWithLobbyId } = require('./Handlers/findLobbyWithLobbyId');
const { pushToSideBoard } = require('./Handlers/pushToSideBoard');
const { pushBackToPool } = require('./Handlers/pushBackToPool');
const { sendMessage } = require('./Handlers/MessageSender');
const { deleteALobby } = require('./Handlers/DeleteLobby');



app.get('/helloworld', (req, res) => {
  res.status(200).json({status:200, message:"Hello World!"})
})

app.post("/api/signin", signIn)

app.post("/api/signup", signUp)

app.post("/api/partyleadercheck", partyLeaderCheck)

app.post("/api/lobbycheck", lobbyCheck)

app.post("/api/filllobby", fillLobby)

app.post("/api/findlobby", findLobby)

app.post("/api/findpacks", findPacks)

app.post("/api/pickacard", pickACard)

app.post("/api/draftlobbystart", testDraftStarted)

app.post("/api/uptodate", UpToDate)

app.post("/api/findlobbyWithLobbyId", findLobbyWithLobbyId)

app.post("/api/pushToSideBoard", pushToSideBoard)

app.post("/api/pushBackToPool", pushBackToPool)

app.post("/api/sendMessage", sendMessage)

app.post("/api/deletelobby", deleteALobby)

app.get("/api/users", getUsers)

app.get("/api/user/:email", getUser)

app.post("/api/lobby", readyCheck)

app.post("/api/createuser", createUser)

app.post("/api/createlobby", createLobby)

app.post("/api/oneboosterpack", getABooster)

app.patch("/api/joinlobby", joinALobby)
// 

const PORT = 4986



app.listen(PORT, () => {
  console.log("Listening on port", PORT)
})