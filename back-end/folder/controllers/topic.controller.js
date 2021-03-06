const db = require("../models");
const Topic = db.topics;
const User = db.users;
const Op = db.Sequelize.Op;
const fs = require('fs');
const decrypt = require('../accessory/decrypt-Id');


// Create and Save a new Topic

exports.create = (req, res) => {

 
   //const actualId = decrypt.decryptId(req.body.topic.userId); 
   const textObject = JSON.parse(req.body.topic);
   const actualId = decrypt.decryptId(textObject.userId); 
    textObject.userId = actualId;
    console.log(JSON.parse(req.body.topic));
    const topic = req.file ?
      {
          ...textObject,
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
          published: false,
          likes: 0,
        dislikes: 0,
        usersLiked : "",
        usersDisliked: ""
      } : { ...textObject,
        published: false,
        likes: 0,
      dislikes: 0,
      usersLiked : "",
      usersDisliked: "" 
      };
      console.log(topic);
         // Save Topic in the database
    Topic.create(topic)
    .then(data => {
    res.send(data);
    })
    .catch(() => { return res.status(500).json({ error: "erreur au niveau du modèle" })} );
};


exports.modifyTopicsLikes = (req, res) => {

      Topic.findOne(({ where: { id: req.params.id} }))
     .then(topic => {
      if (topic == null)
       {
         return res.status(500).send({ message: "Il n'y a aucune publication qui correspond à cette requete" })
       }
        // modify number likes and dislikes
        let likes = topic.likes;
        let dislike = topic.dislikes;

        // transform DB text model in array model 
        let newUsersId = req.body.userId;
        let usersLiked = topic.usersLiked.split(" ");
        let usersDisliked = topic.usersDisliked.split(" ");
        if ( usersLiked[0] ==""){ usersLiked.splice(0,1)}
        if ( usersDisliked[0] ==""){ usersDisliked.splice(0,1)}
        // search if userslikes or usersdislike already exist
        let findUsersLiked = usersLiked.find((user) => user == req.body.userId);
        let findUsersDisliked = usersDisliked.find((user) => user == req.body.userId);
        if (req.body.like == 1 && findUsersLiked === undefined) {
          if ( req.body.like == 1 && findUsersDisliked !== undefined ) {
            return  res.status(500).send({ message: "You already give a dislike if u want give a like then cancel your dislike first" });
          }
          topic.likes++;
          let newLikes = topic.likes;
          usersLiked.push(newUsersId);
          let newUsersLiked = usersLiked.join(" ");
          Topic.update({ likes : newLikes, usersLiked : newUsersLiked }, {
            where: { id: req.params.id  }})
          .then(()=> {
              return  res.status(201).send({ message: 'Les likes de la publication ont été modifié avec succès'});
            })
          .catch(err => {
            return  res.status(500).send({ error : "Echec lors de la modification des likes de la publication"});
            })
        }
        else if (req.body.like == 0) {
            if (findUsersLiked !== undefined) {
            topic.likes--;
            let newLikes = topic.likes;
            let indexToDelete = usersLiked.indexOf(req.body.userId);
            usersLiked.splice(indexToDelete,1);
            let newUsersLiked = usersLiked.join(" ");
            Topic.update({ likes : newLikes, usersLiked : newUsersLiked }, {
              where: { id: req.params.id  }})
            .then(() => {
              return  res.status(201).send({ message: 'Les likes de la publication ont été modifié avec succès'});
              })
            .catch(err => {
              return  res.status(500).send({ error: "Echec lors de la modification des likes de la publication"});
              })
            }
            else if (findUsersDisliked !== undefined) {
              topic.dislikes--;
              let newDislikes = topic.dislikes;
              let indexToDelete = usersDisliked.indexOf(req.body.userId);
              usersDisliked.splice(indexToDelete,1);
              let newUsersDisliked = usersDisliked.join(" ");
              Topic.update({ dislikes : newDislikes, usersDisliked : newUsersDisliked }, { where: { id: req.params.id  }})
              .then(num => {
                return  res.status(201).send({ message: 'Les likes de la publication ont été modifié avec succès'});
              })
            .catch(err => {
              return  res.status(500).send({ error : "Echec lors de la modification des likes de la publication"});
              })
            }
            else { return res.status(500).send({ message: "You try to give 2 like or dislike but it's forbidden"})}
          }
        else if (req.body.like == -1 && findUsersDisliked === undefined) {
          if ( req.body.like == -1 && findUsersLiked !== undefined ) {
            return  res.status(500).send({ message: "You already give a like if u want give a dislike then cancel your dislike first" });
          }
          topic.dislikes++;
          let newDislikes = topic.dislikes;
          usersDisliked.push(newUsersId);
          let newUsersDisliked = usersDisliked.join(" ");
          Topic.update({ dislikes : newDislikes, usersDisliked : newUsersDisliked }, { where: { id: req.params.id  }})
          .then(num => {
            return  res.status(201).send({ message: 'Les likes de la publication ont été modifié avec succès'});
          })
        .catch(err => {
          return  res.status(500).send({ error: "Echec lors de la modification des likes de la publication"});
          })
        }
        else { return res.status(500).send({ message: "Vous essayer d'effectuer deux fois la même action et c'est interdit"})}
      })
  .catch((error) => { return res.status(500).json({ error: "erreur au niveau du modèle" })}) 
  }



// Retrieve all Topics from the database.

exports.findAllTitleTopic = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    if (condition == null) {
      return res.status(500).send({ message : "erreur lors de la requete"})
    }
    Topic.findAll({ where: condition })
      .then(data => {
       return res.send(data);
      })
      .catch(err => {
      return  res.status(500).send({
          message:
            err.message || "Erreur lors de la recherche des publications."
        });
      });
  };



  exports.findAllTopic = (req, res) => {
  

    Topic.findAll({ include: User, order : [ ['id', 'DESC'] ]})
      .then(data => {
      return  res.send(data);
      })
      .catch(err => {
      return  res.status(500).send({
          message:
            err.message || "Erreur lors de la recherche des publications."
        });
      });
  };

  exports.findAllTopTopic = (req, res) => {
  
  
    Topic.findAll({ include: User, order : [ ['likes', 'DESC'] ]})
      .then(data => {
        console.log(data);
      return  res.send(data);
      })
      .catch(err => {
      return  res.status(500).send({
          message:
            err.message || "Erreur lors de la recherche des publications."
        });
      });
  };

// Find a single Topic with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Topic.findByPk(id, { include: User})
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

// Update a Topic by the id in the request
exports.updatefile = (req, res) => {

   const textObject = JSON.parse(req.body.topic);
   const topicId = req.params.id
   const actualId = decrypt.decryptId(textObject.userId); 
   const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    textObject.userId = actualId;
    textObject.imageUrl = imageUrl;
    console.log(JSON.parse(req.body.topic));
    
    Topic.findByPk(topicId)
    .then(data => {
      console.log("hello");
      console.log(data.userId);
      console.log("no hello");
      if (data === null) { return res.status(500).send({ message: "cette page n'existe pas"})}
      
      if ( data.userId == actualId) {
        console.log(data.userId);
        console.log("ok");
  
    Topic.update(textObject, {
      where: { id: data.id}
    })
      .then( () => { 
        res.status(200).json({ message: "objet modifié !" });
        })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Topic with id=" + id
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


  exports.update = (req, res) => {
    
       const id = req.params.id;
       if (id == null) {
        return res.status(500).send({ message : "erreur lors de la requete"})
      }
    
        const topicObject = req.file ?
        {
            ...JSON.parse(req.body.topic),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
      
        Topic.update(topicObject, {
          where: { id: id }
        })
          .then( () => { 
            res.status(200).json({ message: "objet modifié !" });
            })
          .catch(err => {
            res.status(500).send({
              message: "Error updating Topic with id=" + id
            });
          });
      };

// Delete a Topic with the specified id in the request
exports.delete = (req, res) => {

  const actualId= req.query.userId;
  const topicId =  parseInt(req.query.topicId);

    Topic.findByPk(topicId)
    .then(data => {
      console.log("hello");
      console.log(data.userId);
      console.log("no hello");
      console.log(typeof topicId);
      if (data === null) { return res.status(500).send({ message: "cette page n'existe pas"})}
      else if ( data.userId == actualId) {
        console.log(data.userId);
        console.log("ok");

        Topic.destroy({
          where: { id: topicId }
        })
          .then(response => {
           return res.status(201).send({ message: "objet supprimé !" });
          })
          .catch(err => {
            return res.status(505).send({
            message: "Could not delete Topicwith id=" + topicId
            });
          }); 
        }
        else { return res.status(500).send({ message: "problème d'authentification !" })}
    
     
    
    })
    .catch(err => {
     res.status(500).send({
        message: "Erreur lors de la recherche de la publication avec un id = " + topicId
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