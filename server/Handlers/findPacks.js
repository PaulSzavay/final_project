'use strict';
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const findPacks = async (request, response) => {
    const { packIds, lobby_id } = request.body

  const client = new MongoClient(MONGO_URI, options);

  try{
    await client.connect();
    const db = client.db("MTGDraft");

    let packInfo = {}
    for(let i = 0; i <= 2; i++){
        const findPacks = await db.collection("Packs").findOne({_id:packIds[i]});
        packInfo = {...packInfo, [`pack${i+1}`]:findPacks}
      }

      const lastUpdated = Date.now()
      const queryDateNow = {_id:lobby_id}
      const changeDateNow = {$set:{lastUpdated}}
      const updateLobby = await db.collection("Lobby").updateOne(queryDateNow, changeDateNow);

      return response.status(200).json({status:200, data:packInfo, lastUpdated})

      } catch (error) {
        return response.status(500).json({status:500, message:error.message})
      } finally {
        client.close();
      }
}

module.exports = { findPacks }