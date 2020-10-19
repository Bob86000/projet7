module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/signup", users.signup);
    router.get("/login", users.login);
  
    
  
    app.use('/api/users', router);
  };