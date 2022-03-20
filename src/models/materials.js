'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Materials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Materials, Session}) {
      // define association here
      Materials.belongsTo(Session)
    }
  }
  Materials.init({
    sessionID: {
     type: DataTypes.UUID,
     primaryKey: true
    },
    name: DataTypes.STRING,
    file: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Materials',
  });
  return Materials;
};