"use strict";
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getUser = async (request, response) => {
    const { email } = request.params;

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("MTGDraft");
        const user = await db.collection("Users").findOne({ email });

    if (user) {
        return response.status(200).json({ status: 200, data: {email:user.email, name:user.name} });
    } else {
        return response.status(404).json({ status: 404, message: `No user found with ${userId} id` });
    }

    } catch (error) {
        return response.status(500).json({status:500, message:error.message})
    } finally {
        client.close();
    }
}

module.exports = { getUser }
