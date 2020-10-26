module.exports = {
    HOST: "localhost",
    USER: "noroot",
    PASSWORD: "aze123--",
    DB: "elevage",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };