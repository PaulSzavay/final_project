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

const readyCheck = async (request, response) => {
    console.log(request.body)

    const { _id, userName, isReady } = request.body
    console.log(isReady)


    const client = new MongoClient(MONGO_URI, options);

    try {
      await client.connect();
      const db = client.db("MTGDraft");

      const foundLobby = await db.collection("Lobby").findOne({ _id } );

      const query = {_id, "players.userName": userName}
      const change = { $set: { "players.$.isReady": isReady }}

      const readyPlayer = await db.collection("Lobby").updateOne( query, change );

      const lastUpdated = Date.now()
      const queryDateNow = {_id:_id}
      const changeDateNow = {$set:{lastUpdated}}
      const updateLobby = await db.collection("Lobby").updateOne(queryDateNow, changeDateNow);  

      response.status(200).json({status:200, message:"Lobby found", data:foundLobby, lastUpdated})

    } catch (error) {
      return response.status(500).json({status:500, message:error.message})
    } finally {
      client.close();
    }
  };
  
  module.exports = {readyCheck};