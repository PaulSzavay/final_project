'use strict';
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const lobbyCheck = async (request, response) => {
    const { _id } = request.body
    console.log(request.body)

  const client = new MongoClient(MONGO_URI, options);

  try{
    await client.connect();
    const db = client.db("MTGDraft");

    const foundLobby = await db.collection("Lobby").findOne({ _id });

    if(foundLobby){
        return response.status(200).json({status:200, playersFound:foundLobby.players.length})
    }
      } catch (error) {
        console.error(error);
      } finally {
        client.close();
      }
}

module.exports = { lobbyCheck }