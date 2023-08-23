'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CalonPegawai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CalonPegawai.init({
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    tgl_lahir: DataTypes.DATE,
    tempat_lahir: DataTypes.STRING,
    pendidikan_terakhir: DataTypes.STRING,
    skills: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'CalonPegawai',
  });
  return CalonPegawai;
};