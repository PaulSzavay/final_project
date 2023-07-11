"use strict";
const { MongoClient } = require("mongodb");


require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const sendMessage = async (request, response) => {
  const { lobby_id, userName, message, time } = request.body;

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("MTGDraft");

    const foundLobby = await db.collection("Lobby").findOne({ _id:lobby_id });

    const messageToSend = {userName, message, time}

    const queryMessage = {_id:lobby_id}
    const changeMessage = {$push:{messages:messageToSend}}
    const lobbyMessage = await db.collection("Lobby").updateOne(queryMessage, changeMessage);

    const lastUpdated = Date.now()
    const queryDateNow = {_id:lobby_id}
    const changeDateNow = {$set:{lastUpdated}}
    const updateLobby = await db.collection("Lobby").updateOne(queryDateNow, changeDateNow);

    const foundNewLobby = await db.collection("Lobby").findOne({_id:lobby_id});

    return response.status(200).json({status:200, lobby:foundNewLobby, lastUpdated})
  
  } catch (error) {
    return response.status(500).json({status:500, message:error.message})
  } finally {
    client.close();
  }
};

module.exports = {sendMessage};