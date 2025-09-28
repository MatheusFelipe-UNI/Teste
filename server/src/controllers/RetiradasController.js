const CannotCreateError = require("../classes/CannotCreateError.js");
const FieldUndefinedError = require("../classes/FieldUndefinedError.js");
const NotFoundError = require("../classes/NotFoundError.js");
const errorResponse = require("../helper/ErrorResponseHelper.js");

async function getAllRetiradas(req, res) {
   try {
      const allRetiradas = "serviceaqui";
      return res.status(200).json(allRetiradas);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllRetiradasByFilter(req, res) {
   try {
      const { orderBy, filterOptions } = req.query;

      if (!orderBy && !filterOptions) {
         throw new FieldUndefinedError("Um ou mais campos não identificados", {
            fields: {
               orderBy,
               filterOptions,
            },
         });
      }
      
      const filteredRetiradas = "serviceaqui";

      return res.status(200).json(filteredRetiradas);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getRetiradaById(req, res) {
   try {
      const id = Number(req.params.id);

      if (!id) {
         throw new FieldUndefinedError("Campo ID não identificado", {
            fields: {
               id,
            },
         });
      }

      const retirada = "serviceaqui";

      if(!retirada) {
         throw new NotFoundError("Retirada não encontrada", {
            fields: {
               id
            }
         })
      }

   } catch (error) {
      errorResponse(error, res);
   }
}

async function createRetirada(req, res) {
   try {
      const { fk_id_user, medicamentos_retirados } = req.body;

      if(!fk_id_user || !medicamentos_retirados) {
         throw new FieldUndefinedError("Nenhum campo identificado", {
            dados_passados: {
               fk_id_user,
               medicamentos_retirados
            },
         });         
      }

      const createdRetirada = "serviceaqui";

      if(!createdRetirada) {
         throw new CannotCreateError("Erro ao cadastrar Retirada", {
            retiradaData: req.body,
            inCreated: createdRetirada,
         });         
      }

   } catch (error) {
      errorResponse(error, res);
   }   
}

module.exports = {
   getAllRetiradas,
   getAllRetiradasByFilter,
   getRetiradaById,
   createRetirada
}