'use strict';
const {
  Model
} = require('sequelize');
// const Penilaian = require('./Penilaian'); 
module.exports = (sequelize, DataTypes) => {
  class CalonPegawai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CalonPegawai.hasOne(models.Penilaian, { foreignKey: 'id_calon' });

    }
  }
  CalonPegawai.init({
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    tgl_lahir: DataTypes.DATE,
    tempat_lahir: DataTypes.STRING,
    pendidikan_terakhir: DataTypes.STRING,
    skills: DataTypes.STRING,
    no_telp: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CalonPegawai',
  });
  return CalonPegawai;
};