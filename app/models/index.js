const dbConfig = require("../configs/dbConfig");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.student = require("./studentModel")(sequelize, Sequelize);
db.teacher = require("./teacherModel")(sequelize, Sequelize);
db.course = require("./coursesModel")(sequelize, Sequelize);
db.score = require("./scoreModel")(sequelize, Sequelize);

db.teacher.hasMany(db.score);
db.score.belongsTo(db.teacher);

db.course.hasMany(db.score);
db.score.belongsTo(db.course);

db.student.hasMany(db.score);
db.score.belongsTo(db.student);

module.exports = db;
