const express = require("express");
const bodyParser = require("body-parser");
const database = require("./app/models")

const app = express();
const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


database.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

