const express = require("express");
const router = express.Router();

const { authJwt } = require("../middlewares");
const controller = require("../controllers/teacherController");

router.post("/add", [authJwt.verifyToken, authJwt.isAdmin], controller.addOne);
router.get("/", [authJwt.verifyToken], controller.findAll);
router.get("/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.findById);
router.put(
  "/update/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.updateById
);
router.delete(
  "/delete/:id",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.deleteById
);

module.exports = router;
