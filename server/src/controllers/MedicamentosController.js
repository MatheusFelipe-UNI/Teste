const CannotCreateError = require("../classes/CannotCreateError.js");
const FieldUndefinedError = require("../classes/FieldUndefinedError.js");
const NotFoundError = require("../classes/NotFoundError.js");
const deleteFile = require("../helper/deleteFileHelper.js");
const errorResponse = require("../helper/ErrorResponseHelper.js");
//importação do service
const {
   getAllMedicamentosService,
   getAllMedicamentosByLaboratorioIdService,
   getMedicamentoByIdService,
   getAllInactiveMedicamentosService,
   getAllMedicamentosForSelectService,
   getAllMedicamentosByFilterService,
   createMedicamentoService,
} = require("../services/MedicamentosService.js")

async function getAllMedicamentos(req, res) {
   try {
      const allMedicamentos = await getAllMedicamentosService();
      return res.status(200).json(allMedicamentos);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllInactiveMedicamentos(req, res) {
   try {
      const allInactiveMedicamentos = await getAllInactiveMedicamentosService ();
      return res.status(200).json(allInactiveMedicamentos);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllMedicamentosByLaboratorioId(req, res) {
   try {
      const idLab = Number(req.params.idLab);

      if (!idLab) {
         throw new FieldUndefinedError("Campo idLab não identificado", {
            fields: {
               idLab,
            },
         });
      }

      const allMedicamentos = await getAllMedicamentosByLaboratorioIdService(idLab);
      return res.status(200).json(allMedicamentos);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllMedicamentosByFilter(req, res) {
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

      const filteredMedicamentos = await getAllMedicamentosByFilterService(req.query);

      return res.status(200).json(filteredMedicamentos);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getMedicamentoById(req, res) {
   try {
      const id = Number(req.params.id);

      if (!id) {
         throw new FieldUndefinedError("Campo ID não identificado", {
            fields: {
               id,
            },
         });
      }

      const medicamento = await getMedicamentoByIdService(id);

      if (!medicamento) {
         throw new NotFoundError("Medicamento não encontrado", {
            fields: {
               id,
            },
         });
      }

      return res.status(200).json(medicamento);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllMedicamentosForSelect(req, res) {
   try {
      const allMedicamentos = await getAllMedicamentosForSelectService();
      return res.status(200).json(allMedicamentos);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function createMedicamento(req, res) {
   try {
      const {
         id,
         fk_id_laboratorio,
         nome_medicamento,
         indicacao_uso,
         categoria,
         quantidade_minima,
      } = req.body;

      const file = req.file;

      if (
         !id ||
         !fk_id_laboratorio ||
         !nome_medicamento ||
         !indicacao_uso ||
         !categoria ||
         (quantidade_minima === undefined || 
          quantidade_minima === null) ||
         !file
      ) {
         throw new FieldUndefinedError("Nenhum campo identificado", {
            dados_passados: {
               ...req.body,
               ...req.file,
            },
         });
      }
      const createdMedicamento = await createMedicamentoService({id, fk_id_laboratorio, nome_medicamento, indicacao_uso, categoria, quantidade_minima,});

      if (!createdMedicamento) {
         throw new CannotCreateError("Erro ao cadastrar Medicamento", {
            medicamentoData: req.body,
            inCreated: createdMedicamento,
         });
      }

      return res.status(201).json({
         status: "success",
         message: "Medicamento Cadastrado com sucesso!",
         data: createdMedicamento,
      });
   } catch (error) {
      if (req.file) {
         await deleteFile(req.file.filename);
      }

      errorResponse(error, res);
   }
}

async function updateMedicamento(req, res) {
   try {
      const id = Number(req.params.id);
      const {
         fk_id_laboratorio,
         nome_medicamento,
         indicacao_uso,
         categoria,
         tipo_unidade,
         quantidade_minima,
      } = req.body;

      const file = req?.file;

      if (
         !id ||
         (!fk_id_laboratorio &&
         !nome_medicamento &&
         !indicacao_uso &&
         !categoria &&
         !tipo_unidade &&
         (quantidade_minima === undefined || 
          quantidade_minima === null))
      ) {
         throw new FieldUndefinedError("Um ou mais campos não identificados", {
            fields: {
               id,
               ...req.body,
               file,
            },
         });
      }

      const [rowAffected] = "service aqui";

      if (rowAffected > 0) {
         return res.status(200).json({
            status: "success",
            message: "Informações de medicamento alterado com sucesso!",
         });
      }
   } catch (error) {
      if (req.file) {
         await deleteFile(req.file.filename);
      }
      errorResponse(error, res);
   }
}

async function changeSituacaoMedicamento(req, res) {
   try {
      const id = Number(req.params.id);
      const { situacao } = req.body;

      if (!id || !situacao) {
         throw new FieldUndefinedError("Um ou mais campos não identificados", {
            fields: {
               id,
               situacao,
            },
         });
      }

      const [rowAffected] = "service aqui";

      if (rowAffected > 0) {
         return res.status(200).json({
            status: "success",
            message: "Situação de medicamento alterada com sucesso!",
         });
      }
   } catch (error) {
      errorResponse(error, res);
   }
}

module.exports = {
   getAllMedicamentos,
   getAllMedicamentosByLaboratorioId,
   getMedicamentoById,
   getAllInactiveMedicamentos,
   getAllMedicamentosForSelect,
   getAllMedicamentosByFilter,
   createMedicamento,
};
/*  
 
   updateMedicamento,
   changeSituacaoMedicamento,
*/