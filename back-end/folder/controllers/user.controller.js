const bcrypt = require('bcrypt');
var validator = require('validator');
const jwt = require('jsonwebtoken');

const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

/* modele requete pour postman
post http://localhost:8080/api/users/signup

{ "email": "23f@gmail.com",
"password": "1234"}

{ "email": "46@gmail.com",
"password": "14"}


*/
// Create and Save a new user
exports.signup = (req, res) => {
    if (!req.body.email||!req.body.password||!req.body.name) {
      return res.status(400).send({
          message: "Les champs ne sont remplis!"
        });
      }
    else if( req.body.email.length < 3)
    { return res.status(400).send({ message : "mot de passe trop court"})}
    else if (validator.isEmail(req.body.email)) {
      console.log(req.body.name);
    bcrypt.hash(req.body.password, 10) 
    .then(hash=> {
        // Create a user
      const user = {
          name: req.body.name,
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


    User.findOne(({ where: { email: req.body.email} }))
      .then(user => {
        console.log("user trouvé");
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
          }
          console.log(user.id);
          bcrypt.compare(req.body.password, user.password)
            .then(valid => {
              if (!valid) {
                console.log("user trouvé");
                return res.status(401).json({ error: 'password  is not correct !' });
              }
              console.log("token");
               const tokenSalt =  jwt.sign(
                { userId: user.id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' });
                const userSalt = "1897634913779149"+`${user.id}`;

              return res.status(200).json({
                userId: userSalt,
                token: tokenSalt
              });
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

  /* modele requete pour postman
DELETE http://localhost:8080/api/users/1

{ "email": "23@gmail.com",
"password": "1234"}*/

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    User.destroy({
      where: { id: id }
    })
      .then(() => {
        res.status(201).json({ message: "objet supprimé !" });
          })
      .catch(err => {
        res.status(500).send({
          message: "Impossible de supprimer la publication avec un id=" + id
        });
      });
  };
