const { sequelize } = require("../models/index.js");

async function dbConnectionTest() {
   try {
      await sequelize.authenticate();
      console.log("conexão estabelecida");
   } catch (error) {
      console.log(error);
      console.log("Erro ao tentar se conectar ao database");
   }
}

module.exports = {
   dbConnectionTest
}