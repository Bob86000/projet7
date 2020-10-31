const express = require("express");
const router = express.Router();
const topicsCtrl = require("../controllers/topic.controller.js");
const verify = require("../middleware/user-Id-security");
const multer = require('../middleware/multer-config');
  
    // Create a new Tutorial
    router.post("/create", multer, topicsCtrl.create);

    // Modify like on a tutorial
    router.put("/create/:id", verify.SavedUser, topicsCtrl.modifyTopicsLikes);
  
    // Retrieve all Topics
    router.get("/alltitle", topicsCtrl.findAllTitleTopic);

     // Retrieve all Topics
     router.get("/all", topicsCtrl.findAllTopic);

      // Retrieve all Topics
      router.get("/alltop", topicsCtrl.findAllTopTopic);
  
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
  