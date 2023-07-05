'use strict';
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (request, response) => {

  const client = new MongoClient(MONGO_URI, options);

  try{
    await client.connect();
    const db = client.db("MTGDraft");

    const users = await db.collection("Users").find().toArray();

    users
        ? response.status(200).json({ status: 200, data: users })
        : response.status(404).json({ status: 404, message: "Users not found" });
      } catch (error) {
        console.error(error);
      } finally {
        client.close();
      }
}

module.exports = { getUsers }