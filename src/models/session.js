'use strict';
const {
  Model, Sequelize
} = require('sequelize');
const classes = require('./classes');
const materials = require('./materials');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Session, Classes, Materials}) {
      // define association here
      Session.belongsTo(Classes);
      Session.hasOne(Materials);
    }
  }
  Session.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    start: DataTypes.DATE,
    end: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Session',
  });
  return Session;
};