const { Op } = require("sequelize");
const { Users, sequelize } = require("../models/index.js");

async function findAllUsers() {
   const users = await Users.findAll();
   return users;
}

// Busca por usuários com nível de acesso inferior ao de Administrador
async function findAllDefaultUsers() {
   const users = await Users.findAll({
      attributes: [
         "id",
         "usuario",
         "nivel_acesso",
         "status",
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("users.created_at"), "%d-%m-%Y %H:%i:%s"),
            "data_criacao",
         ],
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("users.updated_at"), "%d-%m-%Y %H:%i:%s"),
            "data_alteracao",
         ],
         
      ],
      where: {
         nivel_acesso: {
            [Op.gt]: 1
         }
      }
   });

   return users;
}

async function findUserById(idUser) {
   const user = await Users.findByPk(idUser, {
      attributes: {
         exclude: ["senha"]
      }
   })

   return user;
}

async function findUserLoggedById(idUser) {
   const user = await Users.findByPk(idUser, {
      attributes: [
         "usuario",
         "nivel_acesso",
         "status"
      ]
   });

   return user;
}

async function findUserByName(userName) {
   const user = await Users.findOne({
      where: {
         usuario: userName
      }
   });

   return user;
}

async function createNewUser(userData) {
   const createdUser = await Users.create(userData);
   return createdUser;
}

async function updateUserStatus(idUser, newStatus) {
   const updatedUser = await Users.update({
      status: newStatus
   }, {
      where: {
         id: idUser
      }
   });

   return updatedUser;
}

async function findAndCountAllUsers() {
   const { count } = await Users.findAndCountAll();
   return { total_users: count }
}

async function findAndCountAllActiveUsers() {
   const { count } = await Users.findAndCountAll({
      where: {
         status: "ativo"
      }
   })
   return { total_users: count };
}

module.exports = {
   findAllUsers,
   findAllDefaultUsers,
   findUserById,
   findUserLoggedById,
   findUserByName,
   createNewUser,
   updateUserStatus,
   findAndCountAllUsers,
   findAndCountAllActiveUsers
}
