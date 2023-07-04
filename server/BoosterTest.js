const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addSet = async () => {
  const client = new MongoClient(MONGO_URI, options);
  const newId = uuidv4();

  try {
    await client.connect();
    const db = client.db("MTGDraft");
    console.log("client is running")

    // dryer code await with consts and then for the next pages use a while loop

    await fetch("https://api.scryfall.com/sets/rav")
      .then((response) => response.json())
      .then(async (parsed) => {
        console.log(parsed)
        const setAdded = await db.collection("Sets").insertOne({_id:newId, setInfo:parsed});
        await fetch(`${parsed.search_uri}`)
        .then((response) => response.json())
        .then(async (parsed) => {
          const setAdded = await db.collection("Sets").updateMany({_id:newId}, {$push:{data:{$each:parsed.data}}});
            console.log(setAdded)
            if(parsed.has_more === true){
                await fetch(`${parsed.next_page}`)
                .then((response) => response.json())
                .then(async (parsed) => {
                const setAdded = await db.collection("Sets").updateMany({_id:newId}, {$push:{data:{$each:parsed.data}}});
                console.log(setAdded)
                if(parsed.has_more === true){
                    await fetch(`${parsed.next_page}`)
                    .then((response) => response.json())
                    .then(async (parsed) => {
                    const setAdded = await db.collection("Sets").updateMany({_id:newId}, {$push:{data:{$each:parsed.data}}});
                    console.log(setAdded)
                    if(parsed.has_more === true){
                        await fetch(`${parsed.next_page}`)
                        .then((response) => response.json())
                        .then(async (parsed) => {
                        const setAdded = await db.collection("Sets").updateMany({_id:newId}, {$push:{data:{$each:parsed.data}}});
                        console.log(setAdded)
                    })}
                })}
            })
        }
        })
      });


  } catch (error) {
    console.error(error);
  } finally {
    client.close()
  }
};
// only if collector # is number, isBooster is true and no repeats


addSet();
