const CannotCreateError = require("../classes/CannotCreateError.js");
const FieldUndefinedError = require("../classes/FieldUndefinedError.js");
const errorResponse = require("../helper/ErrorResponseHelper.js");
const { getAllClientesEspeciaisService,
   getAllClientesByMedicamentoService,
   getClienteEspecialByIdService,
   createClienteEspecialService,
   updateClienteEspecialService,
   deleteClienteEspecialService,
} = require("../services/ClienteEspService.js");
async function getAllClientesEspeciais(req, res) {
   try {
      const allClientesEsp = await getAllClientesEspeciaisService();
      return res.status(200).json(allClientesEsp);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllClientesByMedicamento(req, res) {
   try {
      const idMedicamento = Number(req.params.idMedicamentos);

      if (!idMedicamento) {
         throw new FieldUndefinedError("Campo idMedicamento não identificado", {
            fields: {
               idMedicamento
            }
         })
      }

      const allClientesEsp = await getAllClientesByMedicamentoService(idMedicamento);
      return res.status(200).json(allClientesEsp);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getClienteEspecialById(req, res) {
   try {
      const id = Number(req.params.id);

      if (!id) {
         throw new FieldUndefinedError("Campo id não identificado", {
            fields: {
               id
            }
         })
      }

      const clienteEsp = await getClienteEspecialByIdService(id);
      return res.status(200).json(clienteEsp);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function createClienteEspecial(req, res) {
   try {
      const { nome_cliente, telefone, medicamentos } = req.body;

      if (!nome_cliente || !telefone || !medicamentos) {
         throw new FieldUndefinedError("Nenhum campo identificado", {
            fields: {
               nome_cliente,
               telefone,
               medicamentos
            }
         });
      }

      const createdClienteEsp = await createClienteEspecialService(nome_cliente, telefone, medicamentos);

      if (!createdClienteEsp) {
         throw new CannotCreateError("Erro ao cadastrar cliente especial", {
            data: {
               nome_cliente,
               telefone,
               medicamentos
            }
         })
      }

      return res.status(201).json({
         status: "success",
         message: "Cliente Especial cadastrado com sucesso!",
         data: createdClienteEsp
      });

   } catch (error) {
      errorResponse(error, res);
   }
}

async function updateClienteEspecial(req, res) {
   try {
      const id = Number(req.params.id);
      const { nome_cliente, telefone, medicamentos } = req.body;

      if (!id || (!nome_cliente && !telefone && !medicamentos)) {
         throw new FieldUndefinedError("Um ou mais campos não identificados", {
            fields: {
               id,
               nome_cliente,
               telefone,
               medicamentos
            },
         });
      }

      const [rowAffected] = await updateClienteEspecialService(id, nome_cliente, telefone, medicamentos);

      if (rowAffected > 0) {
         return res.status(200).json({
            status: "success",
            message: "Informações de cliente alteradas com sucesso!",
         });
      }

   } catch (error) {
      errorResponse(error, res);
   }
}

async function deleteClienteEspecial(req, res) {
   try {
      const id = Number(req.params.id);

      if (!id) {
         throw new FieldUndefinedError("Campo ID não identificado", {
            fields: {
               id,
            },
         });
      }

      const deletedCliente = await deleteClienteEspecialService(id);

      if (deletedCliente > 0) {
         return res.status(200).json({
            status: "success",
            message: "cliente especial removido com sucesso!"
         });
      }

   } catch (error) {
      errorResponse(error, res);
   }
}

module.exports = {
   getAllClientesEspeciais,
   getAllClientesByMedicamento,
   getClienteEspecialById,
   createClienteEspecial,
   updateClienteEspecial,
   deleteClienteEspecial
}
