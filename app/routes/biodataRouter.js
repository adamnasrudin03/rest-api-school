module.exports = app => {
    const biodatas = require("../controllers/biodataController");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", biodatas.create);
  
    // Retrieve all Tutorials
    router.get("/", biodatas.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", biodatas.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", biodatas.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", biodatas.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", biodatas.delete);
  
    // Delete all Tutorials
    router.delete("/", biodatas.deleteAll);
  
    app.use('/api/biodatas', router);
  };