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
   updateMedicamentoService,
   changeSituacaoMedicamentoService,
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
         nome,
         indicacao_uso,
         categoria,
         quantidade_minima,
      } = req.body;

      const file = req.file;

      if (
         !id ||
         !fk_id_laboratorio ||
         !nome ||
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
      
      const medicamentoData = {
        id,
        fk_id_laboratorio,
        nome,
        indicacao_uso,
        categoria,
        quantidade_minima,
        img: file.filename 
      };

      const createdMedicamento = await createMedicamentoService(medicamentoData);

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
      const file = req?.file;
      const updateData = { ...req.body };
      if (file) {
         updateData.img = file.filename;
      }
 
       if (updateData.nome_medicamento) {
          updateData.nome = updateData.nome_medicamento;
          delete updateData.nome_medicamento; 
      }

      if (Object.keys(updateData).length == 0 && !file) {
         throw new FieldUndefinedError("Nenhum campo para atualizar foi fornecido.");
      }

      const [rowAffected] = await updateMedicamentoService(id, updateData);

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
      const { situacao } = { ...req.body };

      if (!situacao) {
         throw new FieldUndefinedError("É obrigatório preencher o campo 'situacao'.");
      }

      const rowAffected = await changeSituacaoMedicamentoService(id, situacao);

      if (rowAffected > 0) {
         return res.status(200).json({
            status: "success",
            message: "Situação de medicamento alterada com sucesso!",
         });
      } else {
         throw new Error("Não foi possível alterar a situação do medicamento.");
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
   updateMedicamento,
   changeSituacaoMedicamento,
};
  