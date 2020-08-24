const express = require("express");
const router = express.Router();
const controller = require("../controllers/lessonController");

router.post("/add", controller.addOne);
router.get("/", controller.findAll);
router.get("/:id", controller.findById);
router.put("/update/:id", controller.updateById);
router.delete("/delete/:id", controller.deleteById);

module.exports = router;
