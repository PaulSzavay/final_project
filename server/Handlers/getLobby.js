"use strict";
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');
const {makeABooster} = require("../Helpers/generateABooster")


require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getLobby = async (request, response) => {
    console.log(request.body)

    const { _id, userName } = request.body


    const client = new MongoClient(MONGO_URI, options);

    try {
      await client.connect();
      const db = client.db("MTGDraft");

      const foundLobby = await db.collection("Lobby").findOne({ _id } );
      console.log(foundLobby)

      const query = {_id, "players.userName": userName}
      const change = { $set: { "players.$.isReady": true}}

      const readyPlayer = await db.collection("Lobby").updateOne( query, change );
      console.log(readyPlayer)

    response.status(200).json({status:200, message:"Lobby found", data:foundLobby})

    } catch (error) {
      console.error(error);
    } finally {
      client.close();
    }
  };
  
  module.exports = {getLobby};