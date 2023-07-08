"use strict";
const { MongoClient } = require("mongodb");


require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const findLobbyWithLobbyId = async (request, response) => {
  const { _id } = request.body;

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("MTGDraft");

    const foundLobby = await db.collection("Lobby").findOne({ _id });

    response.status(200).json({status:200, lobby:foundLobby});

  } catch (error) {
    return response.status(500).json({status:500, message:error.message})
  } finally {
    client.close();
  }
};

module.exports = { findLobbyWithLobbyId };
