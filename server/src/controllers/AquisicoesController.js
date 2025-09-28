const CannotCreateError = require("../classes/CannotCreateError.js");
const FieldUndefinedError = require("../classes/FieldUndefinedError.js");
const NotFoundError = require("../classes/NotFoundError.js");
const errorResponse = require("../helper/ErrorResponseHelper.js");

async function getAllAquisicoes(req, res) {
   try {
      const allAquisicoes = "service aqui";
      return res.status(200).json(allAquisicoes);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllAquisicoesByMedicamentoId(req, res) {
   try {
      const idMedicamento = Number(req.params.idMedicamento);

      if(!idMedicamento) {
         throw new FieldUndefinedError("Campo idMedicamento não identificado", {
            fields: {
               idMedicamento
            }
         })
      }

      const allAquisicoes = "service aqui";
      return res.status(200).json(allAquisicoes);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllAquisicoesSolicitadas(req, res) {
   try {
      const allAquisicoesSolicitadas = "service aqui";
      return res.status(200).json(allAquisicoesSolicitadas);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllAquisicoesEnviadas(req, res) {
   try {
      const allAquisicoesEnviadas = "service aqui";
      return res.status(200).json(allAquisicoesEnviadas);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllAquisicoesEntregues(req, res) {
   try {
      const allAquisicoesEntregues = "service aqui";
      return res.status(200).json(allAquisicoesEntregues);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAquisicaoById(req, res) {
   try {
      const id = Number(req.params.id);

      if(!id) {
         throw new FieldUndefinedError("Campo id não identificado", {
            fields: {
               id
            }
         })
      }

      const aquisicao = "service aqui";

      if(!aquisicao) {
         throw new NotFoundError("Aquisição não encontrada", {
            fields: {
               id
            }
         })
      }

      return res.status(200).json(aquisicao)

   } catch (error) {
      errorResponse(error, res);
   }
}

async function createAquisicao(req, res) {
   try {
      /* 
         lote_medicamentos => array contendo as informações da tabela itens_aquisicoes
      */
      const {
         fk_id_user,
         fk_id_laboratorio,
         fornecedor,
         lote_medicamentos
      } = req.body;

      if(!fk_id_user || !fk_id_laboratorio || !fornecedor || !lote_medicamentos) {
         throw new FieldUndefinedError("Nenhum campo identificado", {
            dados_passados: {
               fk_id_user,
               fk_id_laboratorio,
               fornecedor,
               lote_medicamentos
            }
         })
      }

      const createdAquisicao = "service aqui";

      if(!createdAquisicao) {
         throw new CannotCreateError("Erro ao cadastrar solicitação de aquisição", {
            data: {
               aquisicao_info: {
                  fk_id_user,
                  fk_id_laboratorio,
                  fornecedor
               },
               aquisicao_medicamentos: lote_medicamentos
            }
         })
      }

      return res.status(201).json({
         status: "success",
         message: "Aquisição cadastrada com sucesso!",
         data: createdAquisicao
      })

   } catch (error) {
      errorResponse(error, res);
   }
}

async function changeStatusAquisicao(req, res) {
   try {
      const id = Number(req.params.id);
      const { status } = req.body;

      if(!id || !status) {
         throw new FieldUndefinedError("Um ou mais campos não identificados", {
            fields: {
               id,
               status
            },
         });         
      }

      const [rowAffected] = "service aqui";

      if(rowAffected > 0) {
         return res.status(200).json({
            status: "success",
            message: "Status de solicitação alterada com sucesso"
         })
      }
      
   } catch (error) {
      errorResponse(error, res);
   }
}

async function deleteAquisicaoById(req, res) {
   try {
      const id = Number(req.params.id);

      if (!id) {
         throw new FieldUndefinedError("Campo ID não identificado", {
            fields: {
               id,
            },
         });
      }
      
      const deletedAquisicao = "service aqui";

      if(deletedAquisicao > 0) {
         return res.status(200).json({
            status: "success",
            message: "solicitação de Aquisição removida com sucesso!"
         });
      }

   } catch (error) {
      errorResponse(error, res);
   }
}

module.exports = {
   getAllAquisicoes,
   getAllAquisicoesSolicitadas,
   getAllAquisicoesEnviadas,
   getAllAquisicoesEntregues,
   getAllAquisicoesByMedicamentoId,
   getAquisicaoById,
   createAquisicao,
   changeStatusAquisicao,
   deleteAquisicaoById
}