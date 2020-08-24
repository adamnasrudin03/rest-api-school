const express = require("express");
const bodyParser = require("body-parser");
const database = require("./app/models");
const studentRouter = require("./app/routers/studentRouter");
const teacherRouter = require("./app/routers/teacherRouter");
const lessonRouter = require("./app/routers/lessonRouter");
const scoreRouter = require("./app/routers/scoreRouter");

const app = express();

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Generated database
database.sequelize.sync().then(() => {
  console.log(" re-sync db.");
});

// database.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

//routes
app.use("/students", studentRouter);
app.use("/teachers", teacherRouter);
app.use("/lessons", lessonRouter);
app.use("/assessments", scoreRouter);