# rest-api-school
rest api with express js, MySQL, JWT Authication

## Project setup
```
npm install

then set up the database in the dbConfig.js file
```
### Run
install nodemon, then 
```
npm run dev
```
Comment the code below, which is located at server.js:
```
database.sequelize.sync().then(() => {
  console.log(" re-sync db.");
});
```
then activate the code below, which was previously commented on. located in server.js :
```
// database.sequelize
//   .sync({ force: true })
//   .then(() => {
//     initial();
//     console.log("Drop and re-sync db successfully");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
```
above function to drop database and add user role in database **then save, after the program is run successfully. Return the code as before in server.js**
