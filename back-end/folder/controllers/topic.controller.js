const db = require("../models");
const Topic = db.topics;
const Op = db.Sequelize.Op;

// Create and Save a new Topic
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "can not be empty!"
      });
      return;
    }
    // Create a Topic
    const topic = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        usersLiked: req.body.usersLiked,
        usersDisliked: req.body.usersDisliked,
        userId: req.body.userId// il faudra mettre un cryptage sur la valeur de userID
       // commentCount: 0*/
      };

      /*test postman

      {"title": "testpostman1",
        "description": "descriptiontestpostman1",
        "published": "true",
        "userId": "1"}

        {"title": "testpostman2",
        "description": "descriptiontestpostman2",
        "published": "true",
        "userId": "2"}
        
      */

    // Save Topic in the database
    Topic.create(topic)
    .then(data => {
    res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Erreur lors de la creation de la publication."
    });
  });
};

// Retrieve all Topics from the database.
exports.findAll = exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Topic.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Erreur lors de la recherche des publications."
        });
      });
  };

// Find a single Topic with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Topic.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur lors de la recherche de la publication avec un id = " + id
        });
      });
  };

// Update a Topic by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Topic.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "la publicationa  été modifié avec succès."
          });
        } else {
          res.send({
            message: `Echec lors de la modification de la publication avec un id=${id}. La publication n'a peut etre pas été trouvé ou le req.body est vide!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Erreur lors de la modification de la publication avec un id=" + id
        });
      });
  };

// Delete a Topic with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Topic.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "La publication a été supprimer avec succès!"
          });
        } else {
          res.send({
            message: `Impossible de supprimer la publication avec un id=${id}. La publication n'a peut etre pas été trouvé!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Impossible de supprimer la publication avec un id=" + id
        });
      });
  };

// Delete all Topics from the database.
exports.deleteAll = (req, res) => {
    Topic.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Toutes les publications ont été supprimées avec succès!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Des erreurs se sont produites lors de la suppression des publications."
        });
      });
  };

// Find all published Topics
exports.findAllPublished = (req, res) => {
    Topic.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Des erreurs se sont produites lors de la recherche des publications."
        });
      });
  };