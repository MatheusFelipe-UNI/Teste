"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("Medicamentos", {
         id: {
            type: Sequelize.DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: false,
            allowNull: false,
         },
         fk_id_laboratorio: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            references: {
               model: "Laboratorios",
               key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
         },
         nome: {
            type: Sequelize.DataTypes.STRING(500),
            allowNull: false,
         },
         indicacao_uso: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
         },
         categoria: {
            type: Sequelize.DataTypes.ENUM("CONVENIO", "POPULAR"),
            allowNull: false,
         },
         tipo_unidade: {
            type: Sequelize.DataTypes.STRING(50),
            defaultValue: "CAIXAS",
            allowNull: false
         },
         quantidade_minima: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
         },
         quantidade_total: {
            type: Sequelize.DataTypes.INTEGER(11),
            defaultValue: 0,
            allowNull: false,
         },
         img: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
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
      return queryInterface.dropTable("Medicamentos");
   },
};
