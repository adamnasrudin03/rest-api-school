module.exports = (sequelize, dataType) => {
  const Teacher = sequelize.define("teacher", {
    name: {
      type: dataType.STRING,
    },
    gender: {
      type: dataType.STRING,
    },
    address: {
      type: dataType.STRING,
    },
  });

  return Teacher;
};
