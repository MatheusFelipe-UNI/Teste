const CannotCreateError = require("../classes/CannotCreateError.js");
const FieldUndefinedError = require("../classes/FieldUndefinedError.js");
const NotFoundError = require("../classes/NotFoundError.js");
const errorResponse = require("../helper/ErrorResponseHelper.js");
const { createdRetiradaService,
   getAllRetiradasService,
   getAllRetiradasByFilterService,
   getRetiradaByIdService
} = require("../services/RetiradasService.js");

async function getAllRetiradas(req, res) {
   try {
      const allRetiradas = await getAllRetiradasService();
      return res.status(200).json(allRetiradas);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllRetiradasByFilter(req, res) {
   try {
      const { orderBy, filterOptions } = req.query;

      if (!orderBy && Object.keys(filterOptions).length === 0) {
         throw new FieldUndefinedError("Um ou mais campos não identificados", {
            fields: {
               orderBy,
               filterOptions,
            },
         });
      }

      const filteredRetiradas = await getAllRetiradasByFilterService(req.query);

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

      const retirada = await getRetiradaByIdService(id);

      if (!retirada) {
         throw new NotFoundError("Retirada não encontrada", {
            fields: {
               id
            }
         })
      }
      return res.status(200).json(retirada);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function createRetirada(req, res) {
   try {
      const fk_id_user = req.userInfo.id;
      const { medicamentos_retirados } = req.body;

      if (!medicamentos_retirados) {
         throw new FieldUndefinedError("Nenhum campo identificado", {
            dados_passados: {
               medicamentos_retirados
            },
         });
      }

      const retiradaData = {
         fk_id_user: fk_id_user,
         data_retirada: new Date()
      }

      const createdRetirada = await createdRetiradaService(medicamentos_retirados, retiradaData);

      if (!createdRetirada) {
         throw new CannotCreateError("Erro ao cadastrar Retirada", {
            retiradaData: req.body,
            inCreated: createdRetirada,
         });
      }

      return res.status(201).json({
         success: true,
         message: "Retirada criada com sucesso",
         data: createdRetirada
      });

   } catch (error) {
      errorResponse(error, res);
   }
}

module.exports = {
   getAllRetiradas,
   createRetirada,
   getAllRetiradasByFilter,
   getRetiradaById
}
