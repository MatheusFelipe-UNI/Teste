"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("Lotes_medicamentos", {
         id: {
            type: Sequelize.DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
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
         quantidade: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
         },
         data_validade: {
            type: Sequelize.DataTypes.DATEONLY,
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
      return queryInterface.dropTable("Lotes_medicamentos");
   },
};
