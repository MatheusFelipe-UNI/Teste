"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("Aquisicoes", {
         id: {
            type: Sequelize.DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         fk_id_laboratorio: {
            type: Sequelize.DataTypes.INTEGER(11),
            references: {
               model: "Laboratorios",
               key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            allowNull: false,
         },
         fk_id_user: {
            type: Sequelize.DataTypes.INTEGER(11),
            references: {
               model: "Users",
               key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            allowNull: false,
         },
         fornecedor: {
            type: Sequelize.DataTypes.STRING(180),
            allowNull: false,
         },
         status: {
            type: Sequelize.DataTypes.ENUM("SOLICITADO", "ENVIADO", "ENTREGUE"),
            allowNull: false,
         },
         data_solicitacao: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
         },
         data_entrega: {
            type: Sequelize.DataTypes.DATE,
            allowNull: true,
         },
      });
   },

   down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable("Aquisicoes");
   },
};
