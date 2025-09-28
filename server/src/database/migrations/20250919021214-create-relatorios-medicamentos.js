"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("Relatorios_medicamentos", {
         id: {
            type: Sequelize.DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         fk_id_aquisicao: {
            type: Sequelize.DataTypes.INTEGER(11),
            references: {
               model: "Aquisicoes",
               key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
            allowNull: false,
         },
         situacao: {
            type: Sequelize.DataTypes.ENUM("SOLICITADO", "ENVIADO", "RECEBIDO"),
            allowNull: false
         },
         created_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false
         }
      });
   },

   down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable("Relatorios_medicamentos");
   },
};
