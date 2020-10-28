const db = require("../models");
const Comment = db.comments;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.description) {
      res.status(400).send({
        message: "can not be empty!"
      });
      return;
    }
    // Create a Tutorial
    const comment = {
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        published: req.body.published ? req.body.published : false,
        likes: req.body.likes,
        dislikes: req.body.dislikes,
        usersLiked: req.body.usersLiked,
        usersDisliked: req.body.usersDisliked,
        userId: req.body.userId,
        topicId: req.body.topicId
      };

      /*{"description": "testcommentpostman1",
        "imageUrl": "testcommentpostman1",
        "published": "true",
        "likes": "0",
        "dislikes": "0",
        "usersLiked": "paultestpostman1",
        "usersDisliked": "jeantestpostman1",
        "userId": "1",
        "topicId": "1"}
        
        {"description": "testcommentpostman2",
        "imageUrl": "testcommentpostman2",
        "published": "true",
        "likes": "0",
        "dislikes": "0",
        "usersLiked": "raoultestpostman2",
        "usersDisliked": "bobtestpostman2",
        "userId": "2",
        "topicId": "2"}
        
        */

    // Save Tutorial in the database
    Comment.create(comment)
    .then(data => {
    res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Tutorial."
    });
  });
};

// Retrieve all Tutorials from the database.
/*exports.findAll = exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Comment.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };*/
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Comment.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Comment.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };


// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Comment.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };