const express = require('express');
const router = express.Router();
const commentsCtrl = require("../controllers/comment.controller.js");
const verify = require("../middleware/user-Id-security");
  
  // Create a new Comment
  router.post("/create", commentsCtrl.create);

  // Modify like on a Comment
  router.put("/create/:id", verify.SavedUser, commentsCtrl.modifyCommentsLikes);

  // Retrieve all comments
  router.get("/all", commentsCtrl.findAll);

  // Retrieve 4 last comments 
  router.get("/all4", commentsCtrl.findTopComment);

   // Count all comment with Topicid
   router.get("/count/:id", commentsCtrl.countAllcomment);

  // Retrieve all published comments
  router.get("/published", commentsCtrl.findAllPublished);

   // Retrieve a single Tutorial with id
   router.get("/:id", commentsCtrl.findOne);

  // Update a Comment with id
  router.put("/:id", commentsCtrl.Commentupdate );

  // Delete a Comment with id
  router.delete("/:id", commentsCtrl.delete);

    module.exports = router
  