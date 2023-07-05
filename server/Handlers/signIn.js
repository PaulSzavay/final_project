'use strict';
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt")

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const signIn = async (request, response) => {
    const {email, password} = request.body

    if(!password || !email){
        return response.status(400).json({status:400, message:"Missing information"})
    }

    const client = new MongoClient(MONGO_URI, options);
  
    try{
      await client.connect();
      const db = client.db("MTGDraft");
  
      const users = await db.collection("Users").find().toArray();

      const foundAccount = users.find((user)=> user.email === email)

      if(!foundAccount){
        return response.status(404).json({status:404, message: "No account exists"})
      }


      const matchingPassword = await bcrypt.compare(password, foundAccount.password)

      if(!matchingPassword){
        return response.status(401).json({status:401, message:"Password is incorrect"})
      }

      response.status(200).json({status:200, message:"Success", data:foundAccount.email})

        } catch (error) {
          response.status(500).json({status:500, message:error.message})
        } finally {
          client.close();
        }
  }
  
  module.exports = { signIn }