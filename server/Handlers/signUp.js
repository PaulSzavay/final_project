"use strict";
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt")

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const signUp = async (request, response) => {
    
    const { firstName, lastName, email, password } = request.body;
    const newId = uuidv4();

    if (!firstName || !lastName || !email || !password) {
    return response.status(400).json({
        status: 400,
        message: "Missing information, please fill out all information correctly."
        });
    }

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("MTGDraft");

        const existingUser = await db.collection("Users").findOne({ email });
        if (existingUser) {
        return response.status(409).json({
            status: 409,
            message: "A user with that email is already created, please signin now.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = {
            _id: newId,
            name: `${firstName} ${lastName}`,
            password:hashedPassword,
            email
        };
        
        const createUser = await db.collection("Users").insertOne(user);

        if(createUser){
            response.status(201).json({status: 201, userId: newId, data:{email:user.email, name:user.name}, message:"Account created"})
        }

    } catch (error) {
        response.status(500).json({status:500, message:error.message})
    } finally {
        client.close();
    }
}

module.exports = { signUp }