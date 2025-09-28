const FieldUndefinedError = require("../classes/FieldUndefinedError.js");
const errorResponse = require("../helper/ErrorResponseHelper.js");
const { loginService } = require("../services/AuthService.js");

async function login(req, res) {
   try {
      const { userName, senha } = req.body;

      if(!userName || !senha) {
         throw new FieldUndefinedError("Um ou mais campos não identificados", {
            fields: {
               userName,
               senha
            }
         })
      }

      const loginInfo = await loginService(userName, senha);

      return res.status(200).json(loginInfo);
      

   } catch (error) {
      errorResponse(error, res);
   }
}

module.exports = { login };