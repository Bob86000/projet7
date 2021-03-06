const db = require("../models");
const Comment = db.comments;
const User = db.users;
const Op = db.Sequelize.Op;
const fs = require('fs');
const decrypt = require('../accessory/decrypt-Id');

// Create and Save a new Comment
exports.create = (req, res) => {

      // un champs userId supplémentaire doit etre apporté dans la requete
      console.log(decrypt.decryptId);
      console.log(req.body.comment);
   //const actualId = decrypt.decryptId(req.body.comment.userId); 
   const commentObject = JSON.parse(req.body.comment);
   const actualId = decrypt.decryptId(commentObject.userId); 
   commentObject.userId = actualId;
   console.log(commentObject);
    const comment = req.file ?
      {
          ...commentObject,
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
          published: false,
          likes: 0,
        dislikes: 0,
        usersLiked : "",
        usersDisliked: ""
      } : { ...commentObject,
        published: false,
        likes: 0,
      dislikes: 0,
      usersLiked : "",
      usersDisliked: "" 
      };

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

exports.modifyCommentsLikes = (req, res) => {

  Comment.findOne(({ where: { id: req.params.id} }))
     .then(comment => {
       if (comment == null)
       {
         return res.status(500).send({ message: "Il n'y a aucun commentaire qui correspond à cette requete" })
       }
        // modify number likes and dislikes
        let likes = comment.likes;
        let dislike = comment.dislikes;
        

        // transform DB text model in array model 

        let newUsersId = req.body.userId;
        let usersLiked = comment.usersLiked.split(" ");
        let usersDisliked = comment.usersDisliked.split(" ");
        if ( usersLiked[0] ==""){ usersLiked.splice(0,1)}
        if ( usersDisliked[0] ==""){ usersDisliked.splice(0,1)}
        // search if userslikes or usersdislike already exist
        let findUsersLiked = usersLiked.find((user) => user == req.body.userId);
        let findUsersDisliked = usersDisliked.find((user) => user == req.body.userId);
        if (req.body.like == 1 && findUsersLiked === undefined) {
          if ( req.body.like == 1 && findUsersDisliked !== undefined ) {
            return  res.status(500).send({ message: "You already give a dislike if u want give a like then cancel your dislike first" });
          }
          comment.likes++;
          let newLikes = comment.likes;
          usersLiked.push(newUsersId);
          let newUsersLiked = usersLiked.join(" ");
          Comment.update({ likes : newLikes, usersLiked : newUsersLiked }, {
            where: { id: req.params.id  }
          })
          .then((update) => {
            return  res.status(201).send({ message: 'Les likes des commentaires ont été modifié avec succès'});
          }) 
          .catch(err => {
            return  res.status(500).send({ error: "Echec lors de la modification des likes de la publication"});
            })
        }
        else if (req.body.like == 0) {
            if (findUsersLiked !== undefined) {
              comment.likes--;
            let newLikes = comment.likes;
            let indexToDelete = usersLiked.indexOf(req.body.userId);
            usersLiked.splice(indexToDelete,1);
            let newUsersLiked = usersLiked.join(" ");
            Comment.update({ likes : newLikes, usersLiked : newUsersLiked }, {
              where: { id: req.params.id  }
            })
            .then((update) => {
              return  res.status(201).send({ message: 'Les likes des commentaires ont été modifié avec succès'});
            }) 
            .catch(err => {
              return  res.status(500).send({ error: "Echec lors de la modification des likes de la publication"});
              })
            }
            else if (findUsersDisliked !== undefined) {
              comment.dislikes--;
              let newDislikes = comment.dislikes;
              let indexToDelete = usersDisliked.indexOf(req.body.userId);
              usersDisliked.splice(indexToDelete,1);
              let newUsersDisliked = usersDisliked.join(" ");
              Comment.update({ dislikes : newDislikes, usersDisliked : newUsersDisliked }, { where: { id: req.params.id  }})
              .then(() => {
                return  res.status(201).send({ message: 'Les likes des commentaires ont été modifié avec succès'});
              }) 
            .catch(err => {
              return  res.status(500).send({ error: "Echec lors de la modification des likes des commentaires"});
              })
            }
            else { return res.status(500).send({ message: "you try to give 2 like or dislike and it's forbidden"})}
          }
        else if (req.body.like == -1 && findUsersDisliked === undefined) {
          if ( req.body.like == -1 && findUsersLiked !== undefined ) {
            return  res.status(500).send({ message: "You already give a like if u want give a dislike then cancel your dislike first" });
          }
          comment.dislikes++;
          let newDislikes = comment.dislikes;
          usersDisliked.push(newUsersId);
          let newUsersDisliked = usersDisliked.join(" ");
          Comment.update({ dislikes : newDislikes, usersDisliked : newUsersDisliked }, { where: { id: req.params.id  }})
          .then(() => {
              return  res.status(201).send({ message: "like success." });
          }) 
        .catch(err => {
          return  res.status(500).send({ error: "Echec lors de la modification des likes des commentaires"});
          })
        }
        else { return res.status(500).send({ message: "you try to give 2 like or dislike and it's forbidden"})}
      })
  .catch((error) => { return res.status(500).json({ error: "erreur au niveau du modèle" })})
  }


// Retrieve all Tutorials from the database.

exports.findAll = (req, res) => {
    const description = req.query.description;
    var condition = description ? { description: { [Op.like]: `%${description}%` } } : null;
    if (condition == null) {
      return res.status(500).send({ message : "erreur lors de la requete"})
    }
  
    Comment.findAll({ where: condition })
      .then(data => {
      return  res.send(data);
      })
      .catch(err => {
      return  res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

  exports.findTopComment = (req, res) => {
  
    Comment.findAll({order : [ ['likes', 'DESC'] ], limit: 4})
      .then(data => {
      return  res.send(data);
      })
      .catch(err => {
      return  res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

// Find a single Topic with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log(id);

  Comment.findByPk(id)
    .then(data => {
      if (data === null) { return res.status(500).send({ message: "cette page n'existe pas"})}
      return res.send(data);
    
    })
    .catch(err => {
    return  res.status(500).send({
        message: "Erreur lors de la recherche de la publication avec un id = " + id
      });
    });
};
exports.updatefile = (req, res) => {
  
     const commentObject = JSON.parse(req.body.comment);
     const commentId = req.params.id;
     const actualId = decrypt.decryptId(commentObject.userId); 
     const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      commentObject.userId = actualId;
      commentObject.imageUrl = imageUrl;
      
      Comment.findByPk(commentId)
      .then(data => {
        console.log("hello");
        console.log(data.userId);
        console.log("no hello");
        if (data === null) { return res.status(500).send({ message: "cette page n'existe pas"})}
        
        if ( data.userId == actualId) {
          console.log(data.userId);
          console.log("ok");
    
      Comment.update(commentObject, {
        where: { id: data.id}
      })
        .then( () => { 
          res.status(200).json({ message: "objet modifié !" });
          })
        .catch(err => {
          res.status(500).send({
            message: "Error updating comment with id=sssssssssss" + id
          });
        });
    };})
    .catch(err => {
      return  res.status(500).send({
          message:
            err.message || "Erreur lors de la recherche des publications."
        });
      });
    }

// Update a Tutorial by the id in the request
exports.Commentupdate = (req, res) => {
    const id = req.params.id;
    if (id === null) { return res.status(500).send({ message: "erreur lors de la requete"})}


    const commentObject = req.file ?
    {
        ...JSON.parse(req.body.comment),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    Comment.update(commentObject, {
      where: { id: id }
    })
      .then( () => { 
      return  res.status(200).json({ message: "objet modifié !" });
        })
      .catch(err => {
      return  res.status(500).send({
          message: "Error updating comment with id=" + id
        });
      });
  };

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

  const actualId= req.query.userId;
  const commentId =  req.query.commentId;

    Comment.findByPk(commentId)
    .then(data => {
      console.log("hello");
      console.log(data.userId);
      console.log("no hello");
      if (data === null) { return res.status(500).send({ message: "cette page n'existe pas"})}
      
      if ( data.userId == actualId) {
        console.log(data.userId);
        console.log("ok");

        Comment.destroy({
          where: { id: data.id}
        })
          .then(response => {
          return  res.status(201).send({ message: "objet supprimé !" });
          })
          .catch(err => {
            return  res.status(505).send({
              message: "Could not delete Comment with id=" + commentId
            });
          });

      }
      else { return res.status(500).send({ message: "problème d'authentification !" })}
    
    })
    .catch(err => {
    return  res.status(500).send({
        message: "Erreur lors de la recherche de la publication avec un id = " + commentId
      });
    });
  
    
  };


// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Comment.findAll({ where: { published: true } })
      .then(data => {
        return res.send(data);
      })
      .catch(err => {
        return  res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };


 exports.countAllcomment = (req, res) => {
    const topicId = req.params.id;
    console.log(topicId);
    Comment.findAndCountAll({ include: User, where: { topicId: {[Op.like]:topicId }}})
      .then(data => {
        let newData = {}
        newData.rows = data.rows;
        newData.count = (data.count).toString();
        return res.status(200).send(newData);
      })
      .catch(() => {
      return res.status(500).send({ message : "Des erreurs se sont produites lors de la recherche des publications."
        });
      });
  }; 