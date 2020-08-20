module.exports = (sequelize, dataType) => {
    const Courses = sequelize.define("courese", {
      name: {
        type: dataType.STRING,
      },
      total_chapter: {
        type: dataType.INTEGER,
      },
      deskripsi: {
        type: dataType.STRING,
      },
    });
  
    return Courses;
  };
  