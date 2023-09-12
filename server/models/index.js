const { Sequelize } = require("sequelize");
const initModels = require("./init-models.js");
const config = require("../config/config.js");

const db = initModels(
  new Sequelize(
    config.env.DB_DBNAME,
    config.env.DB_USER,
    config.env.DB_PASSWORD,
    {
      host: config.env.DB_HOST,
      dialect: config.env.DB_DRIVER,
    }
  )
);

module.exports = {
  db,
  sequelize: db.sequelize,
};
