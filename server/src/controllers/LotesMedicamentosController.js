const CannotCreateError = require("../classes/CannotCreateError.js");
const FieldUndefinedError = require("../classes/FieldUndefinedError.js");
const NotFoundError = require("../classes/NotFoundError.js");
const errorResponse = require("../helper/ErrorResponseHelper.js");
const { getAllLotesMedicamentosService,
   getLotesMedicamentosByIdService,
   getAllLotesMedicamentosByIdMedicamentoService,
   getAllLotesMedicamentosByFilterService,
   createdLoteMedicamentoService,
   updateLoteMedicamentoService,
} = require("../services/LotesMedicamentosService.js");

async function getAllLotesMedicamentos(req, res) {
   try {
      const allLotesMedica = await getAllLotesMedicamentosService();
      return res.status(200).json(allLotesMedica);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllLotesMedicamentosByIdMedicamento(req, res) {
   try {
      const idMedicamento = Number(req.params.id);

      if (!idMedicamento) {
         throw new FieldUndefinedError("Campo idMedicamento não identificado", {
            fields: {
               idMedicamento,
            },
         });
      }

      const allLotesMedica = await getAllLotesMedicamentosByIdMedicamentoService(idMedicamento);
      return res.status(200).json(allLotesMedica);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllLotesMedicamentosByFilter(req, res) {
   try {
      const { orderBy, ...filterOptions } = req.query;

      if (!orderBy && Object.keys(filterOptions).length === 0) {
         throw new FieldUndefinedError("Um ou mais campos não identificados", {
            fields: {
               orderBy,
               filterOptions,
            },
         });
      }

      const filteredLotesMedica = await getAllLotesMedicamentosByFilterService(req.query);

      return res.status(200).json(filteredLotesMedica);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getLoteMedicamentoById(req, res) {
   try {
      const id = Number(req.params.id);

      if (!id) {
         throw new FieldUndefinedError("Campo ID não identificado", {
            fields: {
               id,
            },
         });
      }

      const loteMedicamento = await getLotesMedicamentosByIdService(id);
      if (!loteMedicamento) {
         throw new NotFoundError("Lote de medicamento não encontrado", {
            fields: {
               id,
            },
         });
      }

      return res.status(200).json(loteMedicamento);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function createLoteMedicamento(req, res) {
   try {
      const {
         fk_id_medicamento,
         quantidade,
         data_validade
      } = req.body;

      if (!fk_id_medicamento ||
         (quantidade === undefined || quantidade === null) ||
         !data_validade
      ) {
         throw new FieldUndefinedError("Nenhum campo identificado", {
            dados_passados: {
               fk_id_medicamento,
               quantidade,
               data_validade
            }
         });
      }

      const createdLoteMedicamento = await createdLoteMedicamentoService({fk_id_medicamento, quantidade, data_validade});

      if (!createdLoteMedicamento) {
         throw new CannotCreateError("Erro ao cadastrar Lote de Medicamento", {
            loteData: req.body,
            inCreated: createdLoteMedicamento
         })
      }

      return res.status(201).json({
         status: "success",
         message: "Lote de medicamento cadastrado com sucesso!",
         data: createdLoteMedicamento
      })

   } catch (error) {
      errorResponse(error, res);
   }
}

async function updateLoteMedicamento(req, res) {
   try {
      const id = Number(req.params.id);
      const {
         fk_id_medicamento,
         quantidade,
         data_validade
      } = req.body;

      if (!id || (
         !fk_id_medicamento &&
         (quantidade === undefined || quantidade === null) &&
         !data_validade
      )) {
         throw new FieldUndefinedError("Um ou mais campos não identificados", {
            dados_passados: {
               fk_id_medicamento,
               quantidade,
               data_validade
            }
         });
      }

      const [rowAffected] = await updateLoteMedicamentoService(id, fk_id_medicamento, quantidade, data_validade);
      if (rowAffected > 0) {
         return res.status(200).json({
            status: "success",
            message: "Informações de Lote de Medicamento alterado com sucesso!"
         });
      }

   } catch (error) {
      errorResponse(error, res);
   }
}

module.exports = {
   getAllLotesMedicamentos,
   getAllLotesMedicamentosByIdMedicamento,
   getAllLotesMedicamentosByFilter,
   getLoteMedicamentoById,
   createLoteMedicamento,
   updateLoteMedicamento
}
