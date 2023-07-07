'use strict';
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const testDraftStarted = async (request, response) => {

    const {_id, lastUpdated} = request.body

    if(!_id || !lastUpdated){
        return response.status(404).json({status:404, message:"Not enough information provided."})
    }

  const client = new MongoClient(MONGO_URI, options);

  try{
    await client.connect();
    const db = client.db("MTGDraft");

    const foundLobby = await db.collection("Lobby").findOne({_id});

    const lastUpdatedMongo = foundLobby.lastUpdated

    if(foundLobby.players === 8 && lastUpdatedMongo>lastUpdated){

        const lastUpdated = Date.now()
        const queryDateNow = {_id:_id}
        const changeDateNow = {$set:{lastUpdated}}
        const updateLobby = await db.collection("Lobby").updateOne(queryDateNow, changeDateNow);

        return response.status(200).json({status:200, message:"Draft has started", lastUpdated})
    }

      } catch (error) {
        return response.status(500).json({status:500, message:error.message})
      } finally {
        client.close();
      }
}

module.exports = { testDraftStarted }