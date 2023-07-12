'use strict';
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const saveDraft = async (request, response) => {
    const { lobby_id, userName, lands } = request.body

  const client = new MongoClient(MONGO_URI, options);

  try{
    await client.connect();
    const db = client.db("MTGDraft");


    const query = { _id: lobby_id, "players.userName": userName }
    const change = { $set: { "players.$.lands" : lands } }

    const addLands = await db.collection("Lobby").updateOne(query, change)

    const findLobby = await db.collection("Lobby").findOne({_id: lobby_id})

    const foundPlayerId = await db.collection("Users").findOne({email:userName})


    const query2 = { _id:foundPlayerId._id }
    const change2 = { $push: { Drafts : findLobby } }

    const addDraftToProfile = await db.collection("Users").updateOne(query2, change2)

    

    return response.status(200).json({status:200, message:"Draft has been saved to profile."})


      } catch (error) {
        return response.status(500).json({status:500, message:error.message})
      } finally {
        client.close();
      }
}

module.exports = { saveDraft }