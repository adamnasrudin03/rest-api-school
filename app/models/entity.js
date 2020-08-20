module.exports = (sequelize, Sequelize) => {
    const biodata = sequelize.define("biodata", {
      name: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return biodata;
  };