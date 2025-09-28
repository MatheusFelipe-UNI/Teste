"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("Itens_retiradas", {
         id: {
            type: Sequelize.DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         fk_id_retirada: {
            type: Sequelize.DataTypes.INTEGER(11),
            references: {
               model: "Retiradas",
               key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            allowNull: false,
         },
         fk_id_medicamento: {
            type: Sequelize.DataTypes.INTEGER(11),
            references: {
               model: "Medicamentos",
               key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            allowNull: false,
         },
         quantidade_solicitada: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
         },
         created_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
         },
      });
   },

   down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable("Itens_retiradas");
   },
};
