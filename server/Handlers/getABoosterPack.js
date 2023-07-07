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

const getABooster = async (request, response) => {
  const { name } = request.body;

  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("MTGDraft");

    const packAdded = await db.collection("Sets").findOne({ 'setInfo.name':name} );

    const pack = makeABooster(packAdded)

    const generateBoosterPack = await db.collection("Packs").insertOne(pack);

    

    response.status(200).json({
      status: 200,
      message: "Success",
      pack
    });
  } catch (error) {
    return response.status(500).json({status:500, message:error.message})
  } finally {
    client.close();
  }
};

module.exports = {getABooster};
