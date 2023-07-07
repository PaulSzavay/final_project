'use strict';
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createUser = async (request, response) => {
  const { firstName, lastName, email, password } = request.body;
  const newId = uuidv4();

  if (!firstName || !lastName || !email || !password) {
    return response.status(400).json({
      status: 400,
      message: "Missing information, please fill out all information correctly."
    });
  }

  const client = new MongoClient(MONGO_URI, options);

  try{
    await client.connect();
    const db = client.db("MTGDraft");


  const existingUser = await db.collection("Users").findOne({ email });
  if (existingUser) {
    return response.status(400).json({
      status: 400,
      message: "A user with that email is already created, please signin now.",
    });
  }

    const user = {
    _id: newId,
    name: `${firstName} ${lastName}`,
    password,
    email
    };
    const createUser = await db.collection("Users").insertOne(user);
    
    createUser
    ? response.status(200).json({
    status: 200,
    userId: newId,
    createUser})
    :response.status(501).json({
    status: 501,
    message: "User was not created, please try again",
    });
  } catch (error) {
    return response.status(500).json({status:500, message:error.message})
  } finally {
    client.close();
  }
};


module.exports = { createUser }