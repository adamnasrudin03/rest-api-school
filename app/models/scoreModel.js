module.exports = (sequelize, dataType) => {
  const Score = sequelize.define("assessment", {
    score: {
      type: dataType.DOUBLE,
    },
  });

  return Score;
};
