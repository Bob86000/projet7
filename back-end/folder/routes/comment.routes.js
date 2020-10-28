const express = require('express');
const router = express.Router();
const commentsCtrl = require("../controllers/comment.controller.js");
  
  // Create a new Comment
  router.post("/create", commentsCtrl.create);
  
  // Retrieve all comments
 // router.get("/", commentsCtrl.findAll);

  // Retrieve all published comments
  router.get("/published", commentsCtrl.findAllPublished);

  // Retrieve a single Comment with id
  // router.get("/:id", commentsCtrl.findOne);

  // Update a Comment with id
  router.put("/:id", commentsCtrl.update);

  // Delete a Comment with id
  router.delete("/:id", commentsCtrl.delete);

    module.exports = router
  