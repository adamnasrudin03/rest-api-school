module.exports = (sequelize, dataType) => {
  const Lesson = sequelize.define("lesson", {
    kodeLesson: {
      type: dataType.STRING,
      unique: true,
    },
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
