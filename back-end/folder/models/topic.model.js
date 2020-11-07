module.exports = (sequelize, Sequelize) => {
    const Topic = sequelize.define("topic", {
      title: {
        type: Sequelize.STRING, allowNull: false
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.TEXT
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