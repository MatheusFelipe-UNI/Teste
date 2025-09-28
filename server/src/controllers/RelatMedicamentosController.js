const CannotCreateError = require("../classes/CannotCreateError.js");
const FieldUndefinedError = require("../classes/FieldUndefinedError.js");
const NotFoundError = require("../classes/NotFoundError.js");
const errorResponse = require("../helper/ErrorResponseHelper.js");

async function getAllRelatorios(req, res) {
   try {
      const allRelatorios = "serviceaqui";
      return res.status(200).json(allRelatorios);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllRelatoriosByFilter(req, res) {
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
      
      const filteredRelatorios = "serviceaqui";

      return res.status(200).json(filteredRelatorios);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getRelatorioById(req, res) {
   try {
      const id = Number(req.params.id);

      if (!id) {
         throw new FieldUndefinedError("Campo ID não identificado", {
            fields: {
               id,
            },
         });
      }

      const relatorio = "serviceaqui";

      if(!relatorio) {
         throw new NotFoundError("informação de relatório não encontrada", {
            fields: {
               id
            }
         })
      }

   } catch (error) {
      errorResponse(error, res);
   }
}

async function createRelatorio(req, res) {
   try {
      const { fk_id_aquisicao, situacao } = req.body;

      if(!fk_id_aquisicao || !situacao) {
         throw new FieldUndefinedError("Nenhum campo identificado", {
            dados_passados: {
               fk_id_aquisicao,
               situacao
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
   getAllRelatorios,
   getAllRelatoriosByFilter,
   getRelatorioById,
   createRelatorio
}