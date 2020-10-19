const bcrypt = require('bcrypt');
var validator = require('validator');

const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;


// Create and Save a new user
exports.signup = (req, res) => {
    if (!req.body.email||!req.body.password) {
        res.status(400).send({
          message: "no mail or no password!"
        });
        return;
      }
    else if (validator.isEmail(req.body.email)) {
    bcrypt.hash(req.body.password, 10) 
    .then(hash=> {
        // Create a user
      const user = {
          email: req.body.email,
          password: hash
      };
      console.log(user);
      // Save user in the database
    User.create(user)
    .then(data => {
    res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the user."
    });
  });      
        
  })
    .catch(error => {
      res.status(500).json({ error : "bcrypt not working" });
    });
  }
  else {
    res.status(400).send({
      message: "email is not correct"
    });
    return;
  }

}

// Retrieve all users from the database.

// Find a single user with an id
exports.login = (req, res) => {
    const email = req.body.email;
    console.log('login ok');
  
    User.findOne(({ where: { email: email } }))
      .then(data => {
        console.log("user trouvé");
        if (!data) {
          console.log(req.body.email);
          console.log(data);
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
          }
          bcrypt.compare(req.body.password, data.password)
            .then(valid => {
              console.log("bcrypt se lance");
              if (!valid) {
                console.log('mdp incorrecte');
                return res.status(401).json({ error: 'password  is not correct !' });
              }
              console.log('mdp vérifié');
              res.status(200).json({ message : "jswon"});
            })
            .catch(error => res.status(500).json({ error }));
        res.send(data);
      })
      .catch(err => {
        console.log(req.body.password);
                console.log(data);
        res.status(500).send({
          message: "password  is not correct" 
        });
      });
  };


// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  
};
