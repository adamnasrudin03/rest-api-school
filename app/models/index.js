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
db.lesson = require("./lessonModel")(sequelize, Sequelize);
db.score = require("./scoreModel")(sequelize, Sequelize);

db.user = require("./userModel")(sequelize, Sequelize);
db.role = require("./roleModel")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin"];

db.teacher.hasMany(db.score);
db.score.belongsTo(db.teacher);

db.lesson.hasMany(db.score);
db.score.belongsTo(db.lesson);

db.student.hasMany(db.score);
db.score.belongsTo(db.student);

module.exports = db;
