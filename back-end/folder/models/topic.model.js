module.exports = (sequelize, Sequelize) => {
    const Topic = sequelize.define("topic", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
      /*userID: {
        type: Sequelize.STRING
      }*/
    });
  
    return Topic;
  };