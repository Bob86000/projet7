module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("comment", {
      texte: {
        type: Sequelize.STRING
      },
      multimedia: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      },
      title : {
      type: Sequelize.STRING
    }
    });
  
    return Comment;
  };