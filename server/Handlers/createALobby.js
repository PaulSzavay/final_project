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

const createLobby = async (request, response) => {
  const { userName, booster1, booster2, booster3 } = request.body;


  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("MTGDraft");

    const packAdded1 = await db.collection("Sets").findOne({ 'setInfo.name':booster1} );
    const packAdded2 = await db.collection("Sets").findOne({ 'setInfo.name':booster2} );
    const packAdded3 = await db.collection("Sets").findOne({ 'setInfo.name':booster3} );

    let packIds = []

    // for loop over packs to generate 24 boosters
    for(let i = 0; i < 8; i++){
      let packs = makeABooster(packAdded1)
      const generatePacks1ForDraft = await db.collection("Packs").insertMany([packs]);
      let Ids = [packs._id]
      packIds.push(Ids)
    }

    for(let i = 0; i < 8; i++){
      let packs = makeABooster(packAdded2)
      const generatePacks2ForDraft = await db.collection("Packs").insertMany([packs]);
      let Ids = [packs._id]
      packIds.push(Ids)
    }

    for(let i = 0; i < 8; i++){
      let packs = makeABooster(packAdded3)
      const generatePacks3ForDraft = await db.collection("Packs").insertMany([packs]);
      let Ids = [packs._id]
      packIds.push(Ids)
    }


    const newLobby = await db.collection("Lobby").insertOne({ _id:uuidv4(), packIds, players:[{userName, partyLeader:true, isReady:false}]});
    console.log(newLobby)


    response.status(200).json({
      status: 201,
      message: "Success, lobby has been created",
      newLobby,
      userName
    });
  } catch (error) {
    console.error(error);
  } finally {
    client.close();
  }
};

module.exports = {createLobby};
