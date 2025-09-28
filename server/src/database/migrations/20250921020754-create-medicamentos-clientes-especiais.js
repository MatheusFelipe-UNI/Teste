"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("Medicamentos_clientes_especiais", {
         id: {
            type: Sequelize.DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         fk_id_cliente_especial: {
            type: Sequelize.DataTypes.INTEGER(11),
            references: {
               model: "Clientes_especiais",
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
      return queryInterface.dropTable("Medicamentos_clientes_especiais");
   },
};
