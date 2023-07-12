'use strict';
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getDraft = async (request, response) => {
    const { email, lobby_id } = request.body

    console.log(request.body)
  const client = new MongoClient(MONGO_URI, options);

  try{
    await client.connect();
    const db = client.db("MTGDraft");

    const foundUser = await db.collection("Users").findOne({ email });

    const foundDrafter = foundUser.Drafts.find((draft)=>{
        return draft.players
    })

    const foundDraft = foundDrafter.players.find((drafter)=>{
        return drafter.userName === email
    })

    return response.status(200).json({status:200, draftInfo:foundDraft})

      } catch (error) {
        return response.status(500).json({status:500, message:error.message})
      } finally {
        client.close();
      }
}

module.exports = { getDraft }