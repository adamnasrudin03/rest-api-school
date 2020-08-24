module.exports = (sequelize, dataType) => {
  const Student = sequelize.define("student", {
    npm: {
      type: dataType.STRING,
      unique: true,
    },
    name: {
      type: dataType.STRING,
    },
    gender: {
      type: dataType.STRING,
    },
    class: {
      type: dataType.STRING,
    },
    address: {
      type: dataType.STRING,
    },
  });

  return Student;
};
