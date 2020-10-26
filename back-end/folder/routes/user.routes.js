const express = require('express');
const router = express.Router();
const usersCtrl = require("../controllers/user.controller.js");
  
    // Create a new Tutorial
    router.post("/signup", usersCtrl.signup);
    router.post("/login", usersCtrl.login);

    module.exports = router
  