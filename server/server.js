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
const { getLobby } = require('./Handlers/getLobby');


app.get('/helloworld', (req, res) => {
  res.status(200).json({status:200, message:"Hello World!"})
})

app.post("/api/lobby", getLobby)

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