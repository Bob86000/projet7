const express = require("express");
const router = express.Router();

const topicsCtrl = require("../controllers/topic.controller.js");
  
    // Create a new Tutorial
    router.post("/create", topicsCtrl.create);
  
    // Retrieve all Topics
    router.get("/all", topicsCtrl.findAll);
  
    // Retrieve all published Topics
    router.get("/published", topicsCtrl.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", topicsCtrl.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", topicsCtrl.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", topicsCtrl.delete);
  
    // Delete all Topics
    router.delete("/", topicsCtrl.deleteAll);

    module.exports = router;
  