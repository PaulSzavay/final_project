'use strict';
const express = require('express');
const morgan = require("morgan");
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require("cors")

app.use(cors());
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

app.get("/api/users", getUsers)

app.get("/api/user/:email", getUser)

app.post("/api/lobby", readyCheck)

app.post("/api/createuser", createUser)

app.post("/api/createlobby", createLobby)

app.post("/api/oneboosterack", getABooster)

app.patch("/api/joinlobby", joinALobby)
// 

const server = http.createServer(app)

const io = new Server(server, {
  cors:{
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }
})

const PORT = 4986

io.on('connection', (socket) => {
  console.log(`a user connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("someone joined")
  })

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

server.on("error", (error) => {
  console.error(error)
})

server.listen(PORT, () => {
  console.log("Listening on port", PORT)
})