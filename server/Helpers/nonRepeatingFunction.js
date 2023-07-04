const nonRepeating = (array, numCardstoSelect) => {
    let arrayCopy = [...array];
    let newArray = [];
    for (let index = 0; index < numCardstoSelect; index++) {
      let randNum = Math.floor(Math.random() * arrayCopy.length);
      let splicedItem = arrayCopy.splice(randNum, 1)[0];
      newArray.push(splicedItem);
    }
    return newArray;
  }

  // https://medium.com/@will.software.engineer/generate-an-array-of-unique-non-repeating-elements-in-javascript-992b585da29a


module.exports = {nonRepeating}