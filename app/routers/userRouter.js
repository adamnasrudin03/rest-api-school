const { authJwt } = require("../middlewares");
const controller = require("../controllers/userController");

module.exports = function (app) {

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.put("/users/update/:id", [authJwt.verifyToken], controller.updateById);
  app.get("/users/:id", [authJwt.verifyToken], controller.findById);
  app.delete("/users/delete/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteById);
};
