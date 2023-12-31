"use strict";
const { MongoClient } = require("mongodb");


require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const joinALobby = async (request, response) => {
  const { _id, userName } = request.body;

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("MTGDraft");

    const foundLobby = await db.collection("Lobby").findOne({ _id });

    if(foundLobby.players.length >= 8){
      return response.status(403).json({status:403, message:"Lobby is full, create a new lobby."})
    }

    const newLobby = await db.collection("Lobby").updateOne( {_id}, { $push: { "players":{userName, partyLeader:false, isReady:false, pool:[], messages:[]}} });

    const lastUpdated = Date.now()
    const queryDateNow = {_id:_id}
    const changeDateNow = {$set:{lastUpdated}}
    const updateLobby = await db.collection("Lobby").updateOne(queryDateNow, changeDateNow);

    const foundNewLobby = await db.collection("Lobby").findOne({_id});

    return response.status(200).json({
      status: 200,
      message: "Success",
      foundNewLobby,
      userName
    });

  } catch (error) {
    return response.status(500).json({status:500, message:error.message})
  } finally {
    client.close();
  }
};

module.exports = {joinALobby};
