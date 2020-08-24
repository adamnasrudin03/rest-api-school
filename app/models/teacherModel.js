module.exports = (sequelize, dataType) => {
  const Teacher = sequelize.define("teacher", {
    nip: {
      type: dataType.STRING,
      unique: true,
    },
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
