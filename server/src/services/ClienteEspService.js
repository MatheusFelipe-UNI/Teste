const {
    getAllClientesEspeciais,
    getAllClientesByMedicamento,
    getClienteEspecialById,
    createClienteEspecial,
    updateClienteEspecial,
    deleteClienteEspecial,
} = require("../repositories/ClienteEspRepository.js");
const { Op } = require("sequelize");
const { Clientes_especiais, Medicamentos, sequelize } = require("../models/index.js");
const ExistsDataError = require("../classes/ExistsDataError.js");

async function getAllClientesEspeciaisService() {
    const allClientesEsp = await getAllClientesEspeciais()
    return allClientesEsp;
}

async function getAllClientesByMedicamentoService(fk_id_medicamento) {
    const clienteEsp = await getAllClientesByMedicamento(fk_id_medicamento)
    return clienteEsp;
}

async function getClienteEspecialByIdService(id) {
    const clientesEsp = await getClienteEspecialById(id)
    return clientesEsp;
}

async function createClienteEspecialService(nome_cliente, telefone, medicamentos) {

    const medicamentosInvalidos = await Medicamentos.findAll({
        where: {
            id: medicamentos,
            categoria: { [Op.ne]: "CONVENIO" }
        }
    });

    if (medicamentosInvalidos.length > 0) {
        throw new ExistsDataError("Apenas medicamentos com a categoria 'CONVÊNIO' podem ser associados a clientes especiais.");
    }

    const clienteData = { nome_cliente, telefone }
    const createdClienteEsp = await createClienteEspecial(clienteData, medicamentos)
    return createdClienteEsp;
}


async function updateClienteEspecialService(id, nome_cliente, telefone, medicamentos) {

    const existsCliente = await Clientes_especiais.findByPk(id, {
    attributes: ['id', 'nome_cliente', 'telefone']
    });

    if (!existsCliente) {
        throw new ExistsDataError("Cliente não encontrado");
    }

    const medicamentosInvalidos = await Medicamentos.findAll({
        where: {
            id: medicamentos,
            categoria: { [Op.ne]: "CONVENIO" }
        }
    });

    if (medicamentosInvalidos.length > 0) {
        throw new ExistsDataError("Apenas medicamentos com a categoria 'CONVÊNIO' podem ser associados a clientes especiais.");
    }

    const updatedData = await updateClienteEspecial(id, nome_cliente, telefone, medicamentos)
    return updatedData;
}

async function deleteClienteEspecialService(id) {
    const deleteClient = await deleteClienteEspecial(id);
    return deleteClient;
}

module.exports = {
    getAllClientesEspeciaisService,
    getAllClientesByMedicamentoService,
    getClienteEspecialByIdService,
    createClienteEspecialService,
    updateClienteEspecialService,
    deleteClienteEspecialService,
}