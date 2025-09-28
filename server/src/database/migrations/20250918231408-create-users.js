"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("Users", {
         id: {
            type: Sequelize.DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         usuario: {
            type: Sequelize.DataTypes.STRING(45),
            allowNull: false,
         },
         senha: {
            type: Sequelize.DataTypes.STRING(220),
            allowNull: false,
         },
         nivel_acesso: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
         },
         status: {
            type: Sequelize.DataTypes.ENUM("ATIVO", "INATIVO"),
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
      return queryInterface.dropTable("Users");
   },
};
