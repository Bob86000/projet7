const express = require("express");
const router = express.Router();
const topicsCtrl = require("../controllers/topic.controller.js");
const verify = require("../middleware/user-Id-security");
const multer = require('../middleware/multer-config');
  
    // Create a new Topic
    router.post("/create", multer, topicsCtrl.create);

    // Modify like on a Topic
    router.put("/create/:id", verify.SavedUser, topicsCtrl.modifyTopicsLikes);
  
    // Retrieve all Topics
    router.get("/alltitle", topicsCtrl.findAllTitleTopic);

     // Retrieve all Topics
     router.get("/all", topicsCtrl.findAllTopic);

      // Retrieve all Topics
      router.get("/alltop", topicsCtrl.findAllTopTopic);
  
    // Retrieve all published Topics
    router.get("/published", topicsCtrl.findAllPublished);
  
    // Retrieve a single Topic with id
    router.get("/:id", topicsCtrl.findOne);
  
    // Update a Topic with text only
    router.put("/:id", topicsCtrl.update);

     // Update a Topic with file
     router.put("/file/:id", multer, topicsCtrl.updatefile);
  
    // Delete a Topic with id
    router.delete("/:id", topicsCtrl.delete);
  
    // Delete all Topics
    router.delete("/", topicsCtrl.deleteAll);

    module.exports = router;
  