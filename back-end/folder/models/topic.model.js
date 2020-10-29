module.exports = (sequelize, Sequelize) => {
    const Topic = sequelize.define("topic", {
      title: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      },
      likes: {
        type: Sequelize.INTEGER
      },
      dislikes: {
        type: Sequelize.INTEGER
      },
      usersLiked: {
        type: Sequelize.TEXT
      },
      usersDisliked: {
        type: Sequelize.TEXT
      }
    });
  
    return Topic;
  };