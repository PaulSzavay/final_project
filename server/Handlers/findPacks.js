'use strict';
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const findPacks = async (request, response) => {
    const { packIds } = request.body


  const client = new MongoClient(MONGO_URI, options);

  try{
    await client.connect();
    const db = client.db("MTGDraft");

    console.log(packIds[3])
    
    // for(let i = 0; i < 3; i++){
    //     const findPacks = await db.collection("Packs").findOne({_id:packIds[i]});
    //     console.log(findPacks)
    //     response.status(200).json({status:200, data:findPacks})
    //   }

    const findPack1 = await db.collection("Packs").findOne({_id:packIds[0]});
    const findPack2 = await db.collection("Packs").findOne({_id:packIds[1]});
    const findPack3 = await db.collection("Packs").findOne({_id:packIds[2]});

    if(findPack1 && findPack2 && findPack3){
        return response.status(200).json({status:200, data:{pack1:findPack1, pack2:findPack2, pack3:findPack3}})
    }


      } catch (error) {
        return response.status(500).json({status:500, message:error.message})
      } finally {
        client.close();
      }
}

module.exports = { findPacks }