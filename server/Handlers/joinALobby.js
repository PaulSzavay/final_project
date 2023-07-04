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
    console.log(foundLobby._id)


    const newLobby = await db.collection("Lobby").updateOne( {_id}, { $push: { "players":{userName, partyLeader:false, isReady:false}} });

    response.status(200).json({
      status: 200,
      message: "Success",
      newLobby,
      lobbyId:foundLobby._id,
      userName
    });
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
};

module.exports = {joinALobby};
