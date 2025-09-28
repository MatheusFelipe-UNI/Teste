"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("Laboratorios", {
         id: {
            type: Sequelize.DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         nome_laboratorio: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false,
         },
         cnpj: {
            type: Sequelize.DataTypes.STRING(18),
            allowNull: false,
         },
         endereco: {
            type: Sequelize.DataTypes.STRING(200),
            allowNull: false,
         },
         created_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
         },
         updated_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
         },
      });
   },

   down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable("Laboratorios");
   },
};
