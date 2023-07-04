const rares = ({data}) => data.filter((cards) => {
    return (
      (cards.rarity === "rare" || cards.rarity === "mythic") &&
      !cards.collector_number.includes("s") &&
      cards.booster === true
    );
  });

  const uncommons = ({data}) => data.filter((cards) => {
    return (
      cards.rarity === "uncommon" &&
      !cards.collector_number.includes("s") &&
      cards.booster === true
    );
  });

  const commons = ({data}) => data.filter((cards) => {
    return (
      cards.rarity === "common" &&
      !cards.collector_number.includes("s") &&
      cards.booster === true &&
      !(
        cards.type_line === "Basic Land — Plains" ||
        cards.type_line === "Basic Land — Island" ||
        cards.type_line === "Basic Land — Swamp" ||
        cards.type_line === "Basic Land — Mountain" ||
        cards.type_line === "Basic Land — Forest"
      )
    );
  });

  const basic = ({data}) => data.filter((cards) => {
    return (
      (cards.type_line === "Basic Land — Plains" ||
        cards.type_line === "Basic Land — Island" ||
        cards.type_line === "Basic Land — Swamp" ||
        cards.type_line === "Basic Land — Mountain" ||
        cards.type_line === "Basic Land — Forest") &&
      !cards.collector_number.includes("s") &&
      cards.booster === true
    );
  });



  module.exports = {rares, uncommons, commons, basic}