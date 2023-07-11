"use strict";
const { MongoClient } = require("mongodb");


require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const deleteALobby = async (request, response) => {
  const { lobby_id } = request.body;

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("MTGDraft");

    const foundLobby = await db.collection("Lobby").findOne({ _id:lobby_id });

    const deleteLobby = await db.collection("Lobby").updateOne( {_id:lobby_id}, { $set: {deleted:true} });

    const lastUpdated = Date.now()
    const queryDateNow = {_id:lobby_id}
    const changeDateNow = {$set:{lastUpdated}}
    const updateLobby = await db.collection("Lobby").updateOne(queryDateNow, changeDateNow);

    const foundNewLobby = await db.collection("Lobby").findOne({_id:lobby_id});

    return response.status(200).json({
      status: 204,
      message: "Lobby ended",
      foundNewLobby
    });

  } catch (error) {
    return response.status(500).json({status:500, message:error.message})
  } finally {
    client.close();
  }
};

module.exports = {deleteALobby};
