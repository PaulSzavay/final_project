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

    const updateQuery = { _id:pack_id, "packData._id":card_id}
    const updateChange = { $set: { "packData.$.isPicked" : true } }

    // const updateCardPicked = await db.collection("Packs").updateOne(updateQuery, updateChange);

    const query = { _id: lobby_id, "players.userName": player_userName }
    const change = { $push: { "players.$.pool" : foundCard } }

    // updateMany [ change1 , change2 ]

    // const pushCardIntoPlayerPool = await db.collection("Lobby").updateOne(query, change)

    const change2 = { $set: { "players.$.lastPicked" : pack_id } }

    // const pushCardIntoPlayerLastPicked = await db.collection("Lobby").updateOne(query, change2)



    await Promise.all([db.collection("Packs").updateOne(updateQuery, updateChange), db.collection("Lobby").updateOne(query, change), db.collection("Lobby").updateOne(query, change2)])



    const getPackInfoToGetChanged = await db.collection("Lobby").findOne({ _id:lobby_id })

    const findPlayerInfoToGetPacksToGetChanged = getPackInfoToGetChanged.players.find((player)=>{
      return player.userName = player_userName
    })

    // change to ["", plus remaining packs]

    const newArrayOfPacksToSet = findPlayerInfoToGetPacksToGetChanged.packs.shift()

    const addEmptyString = findPlayerInfoToGetPacksToGetChanged.packs.unshift("")

    const query3 = { _id: lobby_id, "players.userName": player_userName }
    const change3 = { $set: { "players.$.packs" : findPlayerInfoToGetPacksToGetChanged.packs } }


    const lastPackChangedToEmptyString = await db.collection("Lobby").findOneAndUpdate(query3, change3, { returnNewDocument: true })
  
    
    // const lobby2 = await db.collection("Lobby").findOne({ _id:lobby_id })

    const lobby2 = lastPackChangedToEmptyString.value;

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

    if(numberOfPlayersThatPicked === numberOfRealPlayers){
      

      let arrayOfBots = []
      for(let i=0+numberOfRealPlayers; i<8; i++){
        arrayOfBots.push(howManyPlayersExist[i])
      }

      for(let i=0; i<arrayOfBots.length; i++){
        const updateBotPacks = lobby2.players.find((players)=>{
          return players.userName === arrayOfBots[i]
          })

        const botPack = await db.collection("Packs").findOne({_id:updateBotPacks.packs[0]})

        const findCardsNotYetPicked = botPack.packData.filter((card)=>{
          return card.isPicked === false
        })

        const cardsNotYetPicked = []
        cardsNotYetPicked.push(...findCardsNotYetPicked)
  
        const cardPickedByBot = cardsNotYetPicked[Math.floor(Math.random()*cardsNotYetPicked.length)]
  
        // const findPackToFindCard = await db.collection("Packs").findOne({ _id:botPack._id });
  
        const updateQuery = { _id:botPack._id, "packData._id":cardPickedByBot._id}
        const updateChange = { $set: { "packData.$.isPicked" : true } }
  
        const updateCardPicked = await db.collection("Packs").updateOne(updateQuery, updateChange);
  

        // const lobbyUpdate = await db.collection("Lobby").findOne({ _id:lobby_id })
  
        const query = { _id: lobby_id, "players.userName": arrayOfBots[i] }
        const change = { $push: { "players.$.pool" : cardPickedByBot } }
  
// await db.collection("Lobby").updateOne(query, change)
  
        const change2 = { $set: { "players.$.lastPicked" : botPack._id } }
  
// await db.collection("Lobby").updateOne(query, change2)

        await Promise.all([db.collection("Lobby").updateOne(query, change),db.collection("Lobby").updateOne(query, change2)])

  
        const lobbyUpdate2 = await db.collection("Lobby").findOne({ _id:lobby_id })
  
        const botPackArray = lobbyUpdate2.players.find((player)=>{
          return player.userName === arrayOfBots[i]
        })
    


        botPackArray.packs.shift()
    
        botPackArray.packs.unshift("")

        // const newArrayOfBotPacksToSet = ["", botPackArray.packs[1], botPackArray.packs[2]]
    
        const query3 = { _id: lobby_id, "players.userName": arrayOfBots[i] }
        const change3 = { $set: { "players.$.packs" : botPackArray.packs } }
    
        const BotPackChangedToEmptyString = await db.collection("Lobby").updateOne(query3, change3)


      }
    }

    // pass cards

    const lobbyObject = await db.collection("Lobby").findOne({_id:lobby_id})

    const players = lobbyObject.players

    const packArrayLength = players.map((player)=>{
      return player.packs.length
    })

    if(packArrayLength[0] === 2){
    for(let i=0; i<8; i++){
      let targetIndex = i - 1;
      if (targetIndex === -1) targetIndex = 7;

      players[i].packs[0] = players[targetIndex].lastPicked
      players[targetIndex].lastPicked = ""
    }}
    else{
    for(let i=0; i<8; i++){
        let targetIndex = i + 1;
        if (targetIndex > 7) targetIndex = 0;

        players[i].packs[0] = players[targetIndex].lastPicked
        players[targetIndex].lastPicked = ""
    }
    }

    const queryPassLeft = {_id:lobby_id}
    const changePassLeft = {$set:{players}}

    const lobbyPassLeft = await db.collection("Lobby").updateOne(queryPassLeft, changePassLeft)

    
    // end pack

    const packUpdate = await db.collection("Packs").findOne({_id:pack_id})


    const checkIsPicked = packUpdate.packData.every((pack)=>{
      return pack.isPicked === true
    })

    if(checkIsPicked === true){
      const lobbyUpdate = await db.collection("Lobby").findOne({_id:lobby_id})


      const players = lobbyUpdate.players


      for(let i=0; i<8; i++){
          const removePackIndex0 = players[i].packs.shift()
      }

      const queryRemovePack1 = {_id:lobby_id}
      const changeRemovePack1 = {$set:{players}}
      const lobbyPassLeft = await db.collection("Lobby").updateOne(queryRemovePack1, changeRemovePack1)
    }


    const lastUpdated = Date.now()
    const queryDateNow = {_id:lobby_id}
    const changeDateNow = {$set:{lastUpdated}}
    const updateLobby = await db.collection("Lobby").updateOne(queryDateNow, changeDateNow);

    const finalLobbyFind = await db.collection("Lobby").findOne({_id:lobby_id});


    const findPlayer = finalLobbyFind.players.find((player)=>{
      return player.userName === player_userName
    }) 

    let packInfo = {}
    for(let i = 0; i < 3; i++){
      const findPacks = await db.collection("Packs").findOne({_id:findPlayer.packs[i]});
      if(findPacks !== null){
        packInfo = {...packInfo, [`pack${i+1}`]:findPacks}
      }
      if(packInfo.length === 0){

        const query = {_id:lobby_id}
        const change = {$set:{phase:"Ended"}}
        const updateLobby = await db.collection("Lobby").updateOne(query, change);
    
        return response.status(200).json({status:200, data:packInfo, lastUpdated, draft:"ended"})
      }
    }


    return response.status(200).json({status:200, data:packInfo, lastUpdated})



      } catch (error) {
        return response.status(500).json({status:500, message:error.message})
      } finally {
        client.close();
      }
}

module.exports = { pickACard }