module.exports = (sequelize, dataType) => {
  const Score = sequelize.define("assessment", {
    kodeAssessment: {
      type: dataType.STRING,
      unique: true,
    },
    score: {
      type: dataType.DOUBLE,
    },
  });

  return Score;
};
