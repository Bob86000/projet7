const bcrypt = require('bcrypt');
var validator = require('validator');

const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;


// Create and Save a new user
exports.signup = (req, res) => {
    if (!req.body.email||!req.body.password) {
      return res.status(400).send({
          message: "Aucun email ou aucun mot de passe saisi!"
        });
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
    .then(() => {
    this.login(req,res);
    })
      .catch(err => {
        return res.status(500).send({
            message:
                err.message || "Une erreur est survenue lors de création du compte."
        });
      });      
    })
    .catch(error => {
    return  res.status(500).json({ error : "erreur survenue lors de la création du mot de passe" });
    });
  }
  else {
   return res.status(400).send({
      message: "l'email saisi utilise un format non valide"
    });
  }
}

// Find a single user with an id
exports.login = (req, res) => {
    const email = req.body.email;
    console.log('login ok');
    console.log(req.body.password);
    console.log(req.body.email);
    console.log(req.body);

  
    User.findOne(({ where: { email: req.body.email} }))
      .then(data => {
        console.log("user trouvé");
        if (!data) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
          }
          bcrypt.compare(req.body.password, data.password)
            .then(valid => {
              if (!valid) {
                return res.status(401).json({ error: 'password  is not correct !' });
              }
              return res.status(200).json({ message : "utilisateur connecté"});
            })
            .catch(error => res.status(500).json({ error }));
      })
      .catch(err => {
        console.log(req.body.password);
        return res.status(500).send({
          message: "password  is not correct" 
        });
      });
  };
