'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penilaian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Penilaian.init({
    id_calon: DataTypes.INTEGER,
    pendidikan: DataTypes.INTEGER,
    pengalaman: DataTypes.INTEGER,
    wawancara: DataTypes.INTEGER,
    keahlian: DataTypes.INTEGER,
    usia: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Penilaian',
  });
  return Penilaian;
};