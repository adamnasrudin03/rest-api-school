module.exports = (sequelize, dataType) => {
  const Courses = sequelize.define("courese", {
    name: {
      type: dataType.STRING,
    },
    total_chapter: {
      type: dataType.INTEGER,
    },
    description: {
      type: dataType.STRING,
    },
  });

  return Courses;
};
