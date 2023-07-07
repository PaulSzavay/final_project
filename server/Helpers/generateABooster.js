const {nonRepeating} = require("./nonRepeatingFunction");
const { v4: uuidv4 } = require('uuid');
const {rares, uncommons, commons, basic} = require("../Helpers/cardFilterFunction")


const makeABooster = (setOfCards, num) => {
    if({...nonRepeating(basic(setOfCards), 1)===null}){
        return {"_id":uuidv4(),
            "packData":[
                ...nonRepeating(rares(setOfCards), 1),
                ...nonRepeating(uncommons(setOfCards), 3),
                ...nonRepeating(commons(setOfCards), 10)
            ], 
            "status":num}
    }
    return {"_id":uuidv4(),
            "packData":[
                ...nonRepeating(rares(setOfCards), 1),
                ...nonRepeating(uncommons(setOfCards), 3),
                ...nonRepeating(commons(setOfCards), 10),
                ...nonRepeating(basic(setOfCards), 1)
            ], 
            "status":num}}

module.exports = {makeABooster}