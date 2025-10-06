const CannotCreateError = require("../classes/CannotCreateError.js");
const FieldUndefinedError = require("../classes/FieldUndefinedError.js");
const NotFoundError = require("../classes/NotFoundError.js");
const errorResponse = require("../helper/ErrorResponseHelper.js");
//importação do service
const {
   getAllLaboratoriosService,
   getLaboratorioByIdService,
   getAllLaboratoriosForSelectService,
   createLaboratorioService,
   updateLaboratorioService
} = require("../services/LaboratoriosService.js")

async function getAllLaboratorios(req, res) {
   try {
      const allLaboratorios = await getAllLaboratoriosService()
      return res.status(200).json(allLaboratorios);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getLaboratorioById(req, res) {
   try {
      const id = Number(req.params.id);

      if(!id) {
         throw new FieldUndefinedError("Campo ID não identificado", {
            fields: {
               id
            }
         })
      };

      const laboratorio = await getLaboratorioByIdService(id)

      if(!laboratorio) {
         throw new NotFoundError("Laboratório não encontrado", {
            fields: {
               id
            }
         })
      }

      return res.status(200).json(laboratorio)

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllLaboratoriosForSelect(req, res) {
   try {
      const allLaboratorios = await getAllLaboratoriosForSelectService();
      return res.status(200).json(allLaboratorios);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function createLaboratorio(req, res) {
   try {
      const {
         nome_laboratorio,
         cnpj, 
         endereco
      } = req.body;

      if(!nome_laboratorio || !cnpj || !endereco) {
         throw new FieldUndefinedError("Nenhum campo identificado", {
            dados_passados: {
               nome_laboratorio,
               cnpj,
               endereco
            }
         });
      }

      const createdLaboratorio = await createLaboratorioService({nome_laboratorio, cnpj, endereco});

      if(!createdLaboratorio) {
         throw new CannotCreateError("Erro ao cadastrar Laboratório", {
            laboratorioData: req.body,
            inCreated: createdLaboratorio
         })
      }

      return res.status(201).json({
         status: "success",
         message: "Laboratório cadastrado com sucesso!",
         data: createdLaboratorio
      })

   } catch (error) {
      errorResponse(error, res);
   }
}

async function updateLaboratorio(req, res) {
   try {
      const id = Number(req.params.id);
      const {
         nome_laboratorio,
         cnpj, 
         endereco
      } = req.body;

      if(!id || (!nome_laboratorio && !cnpj && !endereco)) {
         throw new FieldUndefinedError("Nenhum campo identificado", {
            fields: {
               id,
               nome_laboratorio,
               cnpj,
               endereco
            }
         })
      }

      const [rowAffected] = await updateLaboratorioService(id, nome_laboratorio, cnpj, endereco)

      if(rowAffected > 0) {
         return res.status(200).json({
            status: "success",
            message: "Informações de Laboratório alterado com sucesso!",
         });
      }


   } catch (error) {
      errorResponse(error, res);
   }
}

module.exports = {
   getAllLaboratorios,
   getLaboratorioById,
   getAllLaboratoriosForSelect,
   createLaboratorio,
   updateLaboratorio
   }
   /*
  
   

  
   */