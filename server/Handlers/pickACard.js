'use strict';
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const pickACard = async (request, response) => {
    const { pack_id, card_id, player_userName, lobby_id } = request.body


  const client = new MongoClient(MONGO_URI, options);

  try{
    await client.connect();
    const db = client.db("MTGDraft");

    const findPackToFindCard = await db.collection("Packs").findOne({ _id:pack_id });

    const foundCard = findPackToFindCard.packData.find((card)=>{
        return card._id === card_id
    })

    const updateQuery = { _id:pack_id, "packData._id":foundCard._id}
    const updateChange = { $set: { "packData.$.isPicked" : true } }

    const updateCardPicked = await db.collection("Packs").updateOne(updateQuery, updateChange);

    const findLobbyToFindPlayer = await db.collection("Lobby").findOne({ _id:lobby_id })

    const foundPlayer = findLobbyToFindPlayer.players.find((player)=>{
        return player.userName = player_userName
    })

    const query = { _id: lobby_id, "players.userName": foundPlayer.userName }
    const change = { $push: { "players.$.pool" : foundCard } }

    const pushCardIntoPlayerPool = await db.collection("Lobby").updateOne(query, change)

    const query2 = { _id: lobby_id, "players.userName": foundPlayer.userName }
    const change2 = { $set: { "players.$.lastPicked" : pack_id } }

    const pushCardIntoPlayerLastPicked = await db.collection("Lobby").updateOne(query2, change2)

    const getPackInfoToGetChanged = await db.collection("Lobby").findOne({ _id:lobby_id })

    const findPlayerInfoToGetPacksToGetChanged = getPackInfoToGetChanged.players.find((player)=>{
      return player.userName = player_userName
    })

    const newArrayOfPacksToSet = ["", findPlayerInfoToGetPacksToGetChanged.packs[1], findPlayerInfoToGetPacksToGetChanged.packs[2]]

    const query3 = { _id: lobby_id, "players.userName": foundPlayer.userName }
    const change3 = { $set: { "players.$.packs" : newArrayOfPacksToSet } }

    const lastPackChangedToEmptyString = await db.collection("Lobby").updateOne(query3, change3)

    const lobby2 = await db.collection("Lobby").findOne({ _id:lobby_id })

    const howManyPlayersExist = lobby2.players.map((players)=>{
      return players.userName
    })

    const findRealPlayers = howManyPlayersExist.filter((players)=>{
      return players !== "Bot1" && players !== "Bot2" && players !== "Bot3" && players !== "Bot4" && players !== "Bot5" && players !== "Bot6" && players !== "Bot7"
    })

    const numberOfRealPlayers = findRealPlayers.length

      let numberOfPlayersThatPicked = 0
    const realPlayers = lobby2.players.forEach((players)=>{
      if(players.lastPicked !== "" && players.lastPicked !== undefined){
        numberOfPlayersThatPicked += 1
      }
    })

    console.log("reached here")


    if(numberOfPlayersThatPicked>=numberOfRealPlayers){
      

      let arrayOfBots = []
      for(let i=0+numberOfRealPlayers; i<8; i++){
        arrayOfBots.push(howManyPlayersExist[i])
      }


      for(let i=0; i<arrayOfBots.length; i++){
        const updateBotPacks = lobby2.players.find((players)=>{
          return players.userName === arrayOfBots[i]
          })

          // console.log(updateBotPacks.packs[0])
  
        const botPack = await db.collection("Packs").findOne({_id:updateBotPacks.packs[0]})

        // console.log(botPack)
  
        const findCardsNotYetPicked = botPack.packData.filter((card)=>{
          return card.isPicked === false
        })

        const cardsNotYetPicked = []
        cardsNotYetPicked.push(...findCardsNotYetPicked)
  
        const cardPickedByBot = cardsNotYetPicked[Math.floor(Math.random()*cardsNotYetPicked.length)]
  
        const findPackToFindCard = await db.collection("Packs").findOne({ _id:botPack._id });
  
        const updateQuery = { _id:botPack._id, "packData._id":cardPickedByBot._id}
        const updateChange = { $set: { "packData.$.isPicked" : true } }
  
        const updateCardPicked = await db.collection("Packs").updateOne(updateQuery, updateChange);
  
        const lobbyUpdate = await db.collection("Lobby").findOne({ _id:lobby_id })
  
        const query = { _id: lobby_id, "players.userName": arrayOfBots[i] }
        const change = { $push: { "players.$.pool" : cardPickedByBot } }
  
        const pushCardIntoBotPool = await db.collection("Lobby").updateOne(query, change)
  
        const query2 = { _id: lobby_id, "players.userName": arrayOfBots[i] }
        const change2 = { $set: { "players.$.lastPicked" : botPack._id } }
  
        const pushCardIntoBotLastPicked = await db.collection("Lobby").updateOne(query2, change2)
  
        const lobbyUpdate2 = await db.collection("Lobby").findOne({ _id:lobby_id })
  
        const botPackArray = lobbyUpdate2.players.find((player)=>{
          return player.userName === arrayOfBots[i]
        })
    
        const newArrayOfBotPacksToSet = ["", botPackArray.packs[1], botPackArray.packs[2]]
    
        const query3 = { _id: lobby_id, "players.userName": arrayOfBots[i] }
        const change3 = { $set: { "players.$.packs" : newArrayOfBotPacksToSet } }
    
        const BotPackChangedToEmptyString = await db.collection("Lobby").updateOne(query3, change3)
      }


        
        const updateBotPacks = lobby2.players.find((players)=>{
          return players.userName === arrayOfBots[i]
          })

          // console.log(updateBotPacks.packs[0])
  
        const botPack = await db.collection("Packs").findOne({_id:updateBotPacks.packs[0]})

        console.log(botPack)
  
        const findCardsNotYetPicked = botPack.packData.filter((card)=>{
          return card.isPicked === false
        })

        const cardsNotYetPicked = []
        cardsNotYetPicked.push(...findCardsNotYetPicked)
  
        const cardPickedByBot = cardsNotYetPicked[Math.floor(Math.random()*cardsNotYetPicked.length)]
  
        const findPackToFindCard = await db.collection("Packs").findOne({ _id:botPack._id });
  
        const updateQuery = { _id:botPack._id, "packData._id":cardPickedByBot._id}
        const updateChange = { $set: { "packData.$.isPicked" : true } }
  
        const updateCardPicked = await db.collection("Packs").updateOne(updateQuery, updateChange);
  
        const lobbyUpdate = await db.collection("Lobby").findOne({ _id:lobby_id })
  
        const query = { _id: lobby_id, "players.userName": arrayOfBots[i] }
        const change = { $push: { "players.$.pool" : cardPickedByBot } }
  
        const pushCardIntoBotPool = await db.collection("Lobby").updateOne(query, change)
  
        const query2 = { _id: lobby_id, "players.userName": arrayOfBots[i] }
        const change2 = { $set: { "players.$.lastPicked" : botPack._id } }
  
        const pushCardIntoBotLastPicked = await db.collection("Lobby").updateOne(query2, change2)
  
        const lobbyUpdate2 = await db.collection("Lobby").findOne({ _id:lobby_id })
  
        const botPackArray = lobbyUpdate2.players.find((player)=>{
          return player.userName === arrayOfBots[i]
        })
    
        const newArrayOfBotPacksToSet = ["", botPackArray.packs[1], botPackArray.packs[2]]
    
        const query3 = { _id: lobby_id, "players.userName": arrayOfBots[i] }
        const change3 = { $set: { "players.$.packs" : newArrayOfBotPacksToSet } }
    
        const BotPackChangedToEmptyString = await db.collection("Lobby").updateOne(query3, change3)

    }
    




      } catch (error) {
        return response.status(500).json({status:500, message:error.message})
      } finally {
        client.close();
      }
}

module.exports = { pickACard }