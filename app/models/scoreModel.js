module.exports = (sequelize, dataType) => {
    const Score = sequelize.define("score", {
      nilai: {
        type: dataType.INTEGER,
      },
    });
  
    return Score;
  };
  