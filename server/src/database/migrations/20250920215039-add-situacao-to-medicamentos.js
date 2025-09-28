'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn("Medicamentos", "situacao", {
        type: Sequelize.ENUM("ATIVO", "INATIVO"),
        allowNull: false,
        defaultValue: "ATIVO",
        after: "categoria"
      });
   },

   down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn("Medicamentos", "situacao");
   },
};
