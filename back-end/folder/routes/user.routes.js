const express = require('express');
const router = express.Router();
const usersCtrl = require("../controllers/user.controller.js");
  
    // Create a new User
    router.post("/signup", usersCtrl.signup);

    // Connect a User
     
    router.post("/login", usersCtrl.login);

    // Delete a User with id
    router.delete("/:id", usersCtrl.delete);
  

    module.exports = router
  