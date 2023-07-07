'use strict';
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

    const botArray = [{"userName":"Bot1", pool:[], lastPicked:""},
                      {"userName":"Bot2", pool:[], lastPicked:""}, 
                      {"userName":"Bot3", pool:[], lastPicked:""}, 
                      {"userName":"Bot4", pool:[], lastPicked:""}, 
                      {"userName":"Bot5", pool:[], lastPicked:""}, 
                      {"userName":"Bot6", pool:[], lastPicked:""}, 
                      {"userName":"Bot7", pool:[], lastPicked:""}]

const fillLobby = async (request, response) => {
    const { _id, numberOfPlayers } = request.body

  const client = new MongoClient(MONGO_URI, options);

  try{
    await client.connect();
    const db = client.db("MTGDraft");

    const foundLobby = await db.collection("Lobby").findOne({ _id });

    const numberOfSeatsToFill = 8 - numberOfPlayers

    const pushFunction = () => {
        let newArrayOfNeededBots = botArray.slice(0, numberOfSeatsToFill)
        return newArrayOfNeededBots
    }

// slice 0,0


    const query = {_id}
    const change = {$push:{players:{$each:pushFunction()}}}

    const fillLobbyWithBots = await db.collection("Lobby").updateOne(query, change);

    const boosterIds = await db.collection("Lobby").findOne({_id})


    for(let i=0; i<8; i++){
      const query = {_id:_id, "players.userName": boosterIds.players[i].userName}
      const change = {$set: { "players.$.packs" : [boosterIds.packIds[i].toString(),boosterIds.packIds[i+8].toString(),boosterIds.packIds[i+16].toString()]}}
      const givePlayerPacks = await db.collection("Lobby").updateOne(query, change);
    }


    const lastUpdated = Date.now()
    const queryDateNow = {_id}
    const changeDateNow = {$set:{lastUpdated}}
    const updateLobby = await db.collection("Lobby").updateOne(queryDateNow, changeDateNow);


        return response.status(200).json({status:200, message:"Draft has started", lastUpdated})

      } catch (error) {
        console.log(error)
        return response.status(500).json({status:500, message:error.message})
      } finally {
        client.close();
      }
}

module.exports = { fillLobby }