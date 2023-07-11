"use strict";
const { MongoClient } = require("mongodb");


require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const pushBackToPool = async (request, response) => {
  const { lobby_id, userName, card_id } = request.body;

  console.log(request.body)

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("MTGDraft");

    const foundLobby = await db.collection("Lobby").findOne({ _id:lobby_id });

    const findPlayer = foundLobby.players.find((player)=>{
        return player.userName === userName
    })

    const findCard = findPlayer.Sideboard.find((card)=>{
        return(card._id === card_id)
    })

    const queryPushToPool = {_id:lobby_id, "players.userName": findPlayer.userName }
    const changePushToPool = { $push: { "players.$.pool" : findCard } }
    const updateLobbyPushPool = await db.collection("Lobby").updateOne(queryPushToPool, changePushToPool);

    console.log("pool done")

        let index = []
    const removeCardFromPool = findPlayer.Sideboard.find((card)=>{
        index.push(card._id)
    })
    const spliceIndex = index.indexOf(card_id)

    const newPoolArray = findPlayer.Sideboard.splice(spliceIndex, 1)

    const queryRemoveFromSideboard = {_id:lobby_id, "players.userName": findPlayer.userName }
    const changeRemoveFromSideboard = { $set: { "players.$.Sideboard" : findPlayer.Sideboard } }
    const updateLobbyRemoveFromSideboard  = await db.collection("Lobby").updateOne(queryRemoveFromSideboard, changeRemoveFromSideboard);

    console.log("sideboard done")

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

module.exports = {pushBackToPool};