module.exports = (sequelize, dataType) => {
  const Lesson = sequelize.define("lesson", {
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

  return Lesson;
};
