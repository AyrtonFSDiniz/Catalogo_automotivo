const { Sequelize, DataTypes } = require("sequelize");
const database = require("../database");

const Carros = database.sequelize.define(
  "carros",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    marca: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ano: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    cilindrada: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    potencia: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    peso: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    numerocilindros: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    imagem: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    aceleracao: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    torque: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  },
  {
    freezeTabName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Carros;
