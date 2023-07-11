"use strict";
const { MongoClient } = require("mongodb");


require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const pushToSideBoard = async (request, response) => {
  const { lobby_id, userName, card_id } = request.body;

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("MTGDraft");

    const foundLobby = await db.collection("Lobby").findOne({ _id:lobby_id });

    const findPlayer = foundLobby.players.find((player)=>{
        return player.userName === userName
    })

    const findCard = findPlayer.pool.find((card)=>{
        return(card._id === card_id)
    })

    const queryPushToSideboard = {_id:lobby_id, "players.userName": findPlayer.userName }
    const changePushToSideboard = { $push: { "players.$.Sideboard" : findCard } }
    const updateLobbyPushSideboard = await db.collection("Lobby").updateOne(queryPushToSideboard, changePushToSideboard);

        let index = []
    const removeCardFromPool = findPlayer.pool.find((card)=>{
        index.push(card._id)
    })
    const spliceIndex = index.indexOf(card_id)

    const newPoolArray = findPlayer.pool.splice(spliceIndex, 1)

    const queryRemoveFromPool = {_id:lobby_id, "players.userName": findPlayer.userName }
    const changeRemoveFromPool = { $set: { "players.$.pool" : findPlayer.pool } }
    const updateLobbyRemoveFromPool  = await db.collection("Lobby").updateOne(queryRemoveFromPool, changeRemoveFromPool);

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

module.exports = {pushToSideBoard};
