'use strict';
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

    const botArray = [{"userName":"Bot1"}, {"userName":"Bot2"}, {"userName":"Bot3"}, {"userName":"Bot4"}, {"userName":"Bot5"}, {"userName":"Bot6"}, {"userName":"Bot7"}]

const fillLobby = async (request, response) => {
    const { _id, numberOfPlayers } = request.body

  const client = new MongoClient(MONGO_URI, options);

  try{
    await client.connect();
    const db = client.db("MTGDraft");

    const foundLobby = await db.collection("Lobby").findOne({ _id });

    const numberOfSeatsToFill = 8 - numberOfPlayers


    const pushFunction = () => {
        let newArrayOfNeededBots = botArray.slice(0, numberOfSeatsToFill)
        return newArrayOfNeededBots
    }


    const query = {_id, }
    const change = {$push:{players:{$each:pushFunction()}}}

    const fillLobbyWithBots = await db.collection("Lobby").updateMany(query, change);

    const boosterIds = await db.collection("Lobby").findOne({_id})

    const query1 = {_id:_id, "players.userName": boosterIds.players[0].userName}
    const change1 = {$set: { "players.$.packs" : [boosterIds.packIds[0].toString(),boosterIds.packIds[8].toString(),boosterIds.packIds[16].toString()]}}

    const givePlayer1Packs = await db.collection("Lobby").updateOne(query1, change1);
    console.log(givePlayer1Packs)

    const query2 = {_id:_id, "players.userName": boosterIds.players[1].userName}
    const change2 = {$set: { "players.$.packs" : [boosterIds.packIds[1].toString(),boosterIds.packIds[9].toString(),boosterIds.packIds[17].toString()]}}

    const givePlayer2Packs = await db.collection("Lobby").updateOne(query2, change2);
    console.log(givePlayer2Packs)

    const query3 = {_id:_id, "players.userName": boosterIds.players[2].userName}
    const change3 = {$set: { "players.$.packs" : [boosterIds.packIds[2].toString(),boosterIds.packIds[10].toString(),boosterIds.packIds[18].toString()]}}

    const givePlayer3Packs = await db.collection("Lobby").updateOne(query3, change3);
    console.log(givePlayer3Packs)

    const query4 = {_id:_id, "players.userName": boosterIds.players[3].userName}
    const change4 = {$set: { "players.$.packs" : [boosterIds.packIds[3].toString(),boosterIds.packIds[11].toString(),boosterIds.packIds[19].toString()]}}

    const givePlayer4Packs = await db.collection("Lobby").updateOne(query4, change4);
    console.log(givePlayer4Packs)

    const query5 = {_id:_id, "players.userName": boosterIds.players[4].userName}
    const change5 = {$set: { "players.$.packs" : [boosterIds.packIds[4].toString(),boosterIds.packIds[12].toString(),boosterIds.packIds[20].toString()]}}

    const givePlayer5Packs = await db.collection("Lobby").updateOne(query5, change5);
    console.log(givePlayer5Packs)

    const query6 = {_id:_id, "players.userName": boosterIds.players[5].userName}
    const change6 = {$set: { "players.$.packs" : [boosterIds.packIds[5].toString(),boosterIds.packIds[13].toString(),boosterIds.packIds[21].toString()]}}

    const givePlayer6Packs = await db.collection("Lobby").updateOne(query6, change6);
    console.log(givePlayer6Packs)

    const query7 = {_id:_id, "players.userName": boosterIds.players[6].userName}
    const change7 = {$set: { "players.$.packs" : [boosterIds.packIds[6].toString(),boosterIds.packIds[14].toString(),boosterIds.packIds[22].toString()]}}

    const givePlayer7Packs = await db.collection("Lobby").updateOne(query7, change7);
    console.log(givePlayer7Packs)

    const query8 = {_id:_id, "players.userName": boosterIds.players[7].userName}
    const change8 = {$set: { "players.$.packs" : [boosterIds.packIds[7].toString(),boosterIds.packIds[15].toString(),boosterIds.packIds[23].toString()]}}

    const givePlayer8Packs = await db.collection("Lobby").updateOne(query8, change8);
    console.log(givePlayer8Packs)

    if(fillLobbyWithBots && givePlayer1Packs && givePlayer2Packs && givePlayer3Packs && givePlayer4Packs && givePlayer5Packs && givePlayer6Packs && givePlayer7Packs && givePlayer8Packs){
        return response.json(200).json({status:200, message:"Draft has started"})
    }
    

      } catch (error) {
        return response.status(500).json({status:500, message:error.message})
      } finally {
        client.close();
      }
}

module.exports = { fillLobby }