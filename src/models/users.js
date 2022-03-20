"use strict";
const { Model } = require("sequelize");
// import bcrypt
const { genSaltSync, hashSync } = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users, Classes }) {
      // define association here
      Users.belongsToMany(Classes, { through: "join" });
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        set(value) {
          const salt = genSaltSync(10);
          this.setDataValue("password", hashSync(value, salt));
        },
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};