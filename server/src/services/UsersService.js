const { hash } = require("bcrypt");
const ExistsDataError = require("../classes/ExistsDataError.js");
const NotFoundError = require("../classes/NotFoundError.js");
const { removeAllAcentsForString } = require("../utils/DataFormatUtil.js");
const {
   createNewUser,
   findAllUsers,
   findAllDefaultUsers,
   updateUserStatus,
   findUserById,
   findUserByName,
   findUserLoggedById,
} = require("../repositories/UsersRepository.js");

async function getAllUsersService() {
   const users = await findAllUsers();
   return users;
}

async function getAllDefaultUsersService() {
   const defaultUsers = await findAllDefaultUsers();
   return defaultUsers;
}

async function getUserByIdService(idUser) {
   const user = await findUserById(Number(idUser));
   return user;
}

async function getUserLoggedByIdService(idUser) {
   const user = await findUserLoggedById(idUser);
   return user;
}

async function createUserService(userInfo) {
   const { usuario, senha, nivel_acesso } = userInfo; // Corrigido para receber 'senha'
   const formattedUser = removeAllAcentsForString(usuario);
   const existsUser = await findUserByName(formattedUser);
   const trimPassword = String(senha).trim(); // Corrigido para usar 'senha'

   if(existsUser) {
      throw new ExistsDataError("Usuário já existe", "USER_EXISTS", {
         user_informado: formattedUser,
         user_existente: existsUser.usuario
      })
   }

   const hashedPassword = await hash(trimPassword, 10);
   const createdUser = await createNewUser({
      usuario: String(formattedUser).trim(),
      senha: hashedPassword,
      nivel_acesso,
      status: "ATIVO",
   });
   return createdUser;
}

async function changeStatusUserService(idUser, newStatus) {
   const formattedStatus = newStatus.toUpperCase();
   const user = await getUserByIdService(idUser);

   if(!user) {
      throw new NotFoundError("Usuário não cadastrado!");
   }

   const currStatus = user.status.toUpperCase();

   if (formattedStatus !== "ATIVO" && formattedStatus !== "INATIVO") {
      throw new ExistsDataError("Status inexistente", "STATUS_UNKNOWN", {
         status_passado: newStatus,
         status_esperado: ["ATIVO", "INATIVO"],
      });
   }
   if (currStatus === formattedStatus) {
      throw new ExistsDataError(`O Usuário já está ${newStatus.toUpperCase()}`, "STATUS_EQUAL", {
         status_passado: newStatus,
         status_atual: currStatus,
      });
   }

   const updatedUser = await updateUserStatus(idUser, newStatus);
   return updatedUser;
}

module.exports = {
   getAllUsersService,
   getAllDefaultUsersService,
   getUserByIdService,
   getUserLoggedByIdService,
   createUserService,
   changeStatusUserService,
};
