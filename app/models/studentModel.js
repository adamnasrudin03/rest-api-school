module.exports = (sequelize, dataType) => {
    const Student = sequelize.define("student", {
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
  