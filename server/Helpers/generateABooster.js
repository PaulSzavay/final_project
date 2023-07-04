const {nonRepeating} = require("./nonRepeatingFunction");
const { v4: uuidv4 } = require('uuid');
const {rares, uncommons, commons, basic} = require("../Helpers/cardFilterFunction")


const makeABooster = (setOfCards) => {
    if({...nonRepeating(basic(setOfCards), 1)===null}){
        return {"_id":uuidv4(),
            "packData":[
                ...nonRepeating(rares(setOfCards), 1),
                ...nonRepeating(uncommons(setOfCards), 3),
                ...nonRepeating(commons(setOfCards), 10)
            ], 
            "status":"next"}
    }
    return {"_id":uuidv4(),
            "packData":[
                ...nonRepeating(rares(setOfCards), 1),
                ...nonRepeating(uncommons(setOfCards), 3),
                ...nonRepeating(commons(setOfCards), 10),
                ...nonRepeating(basic(setOfCards), 1)
            ], 
            "status":"next"}}

module.exports = {makeABooster}