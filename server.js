const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("./app/models");
const Role = database.role;
const { authJwt } = require("./app/middlewares");

const studentRouter = require("./app/routers/studentRouter");
const teacherRouter = require("./app/routers/teacherRouter");
const lessonRouter = require("./app/routers/lessonRouter");
const scoreRouter = require("./app/routers/scoreRouter");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Generated database
database.sequelize.sync().then(() => {
  console.log(" re-sync db.");
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "admin",
  });
}

// database.sequelize
//   .sync({ force: true })
//   .then(() => {
//     initial();
//     console.log("Drop and re-sync db successfully");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

//routes
app.use("/students", studentRouter);
app.use("/teachers", teacherRouter);
app.use("/lessons", lessonRouter);
app.use("/assessments", scoreRouter);

require("./app/routers/authRouter")(app);
require("./app/routers/userRouter")(app);

app.use([authJwt.verifyToken], function (req, res, next) {
  res.status(404).send({
    message: "Unable to find the requested resource!",
  });
});
