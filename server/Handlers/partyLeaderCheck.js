'use strict';
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const partyLeaderCheck = async (request, response) => {

    const {userName, _id} = request.body

    if(!userName || !_id){
        return response.status(404).json({status:404, message:"Not enough information provided."})
    }

  const client = new MongoClient(MONGO_URI, options);

  try{
    await client.connect();
    const db = client.db("MTGDraft");

    const foundLobby = await db.collection("Lobby").findOne({_id});

    const isUserPartyLeader = foundLobby.players.find((user)=>{
        return user.userName
    })

    const lastUpdated = Date.now()
    const queryDateNow = {_id:_id}
    const changeDateNow = {$set:{lastUpdated}}
    const updateLobby = await db.collection("Lobby").updateOne(queryDateNow, changeDateNow);

    if(isUserPartyLeader.partyLeader){
        return response.status(200).json({status:200, partyLeader:isUserPartyLeader.userName, lastUpdated})
    }

      } catch (error) {
        return response.status(500).json({status:500, message:error.message})
      } finally {
        client.close();
      }
}

module.exports = { partyLeaderCheck }