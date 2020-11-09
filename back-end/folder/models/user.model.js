module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      name: {
        type: Sequelize.STRING, allowNull: false
      },
      email: {
        type: Sequelize.STRING, 
        allowNull: false,
        unique :true,
      },
      password: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      admin: {
        type: Sequelize.BOOLEAN
      }

    });
  
    return User;
  };