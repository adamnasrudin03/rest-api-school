const express = require("express");
const bodyParser = require("body-parser");
const database = require("./app/models");
const studentRouter = require("./app/routers/studentRouter");

const app = express();

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Generated database
database.sequelize.sync();

//routes
app.use("/students", studentRouter);