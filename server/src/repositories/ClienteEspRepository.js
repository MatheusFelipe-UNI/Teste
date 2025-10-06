const ExistsDataError = require("../classes/ExistsDataError.js");
const { Clientes_especiais, Medicamentos_clientes_especiais, Medicamentos, sequelize } = require("../models/index.js");

// Busca todos os clientes especiais
async function getAllClientesEspeciais() {
    const allClientes = await Clientes_especiais.findAll({
        attributes: [
            "id",
            "nome_cliente",
            "telefone"
        ],
        include: [],
        order: [
            ['id', 'ASC']
        ]
    });
    return allClientes;
}

// Busca todos os clientes com base na ID do medicamento
async function getAllClientesByMedicamento(fk_id_medicamento) {
    const clientesEsp = await Clientes_especiais.findAll({
        attributes: ["id", "nome_cliente", "telefone"],
        include: [{
            association: "cliente_medicamento",
            where: { fk_id_medicamento },
            required: true,
            include: [{
                association: "medicamento",
                attributes: ["id", "nome"]
            }]
        }]
    });
    return clientesEsp;
}

// Busca todos os clientes conforme sua ID
async function getClienteEspecialById(id) {
    const clientesEsp = await Clientes_especiais.findByPk(id, {
        attributes: [
            "id",
            "nome_cliente",
            "telefone"
        ],
        include: [{
            association: "cliente_medicamento",
            attributes: ["id"],
            include: [{
                association: "medicamento",
                attributes: ["nome"]
            }]
        }]
    });
    return clientesEsp;
}


// Cria um novo cliente especial
async function createClienteEspecial(clienteData, idMedicamentos) {
    const t = await sequelize.transaction();

    try {
        
        // Cria o cliente 
        const newClient = await Clientes_especiais.create({
            nome_cliente: clienteData.nome_cliente,
            telefone: clienteData.telefone
        }, { transaction: t });

        // Cria o medicamento(s) associados a este cliente
        const newMed = idMedicamentos.map(medicamentoId => {
            return {
                fk_id_cliente_especial: newClient.id,
                fk_id_medicamento: medicamentoId
            }
        });

        await Medicamentos_clientes_especiais.bulkCreate(newMed, { transaction: t });

        await t.commit();

        const clienteFinal = await Clientes_especiais.findByPk(newClient.id, {
            attributes: ["id", "nome_cliente", "telefone"],
            include: [{
                association: "cliente_medicamento",
                include: [{
                    association: "medicamento",
                    attributes: ["id", "nome",]
                }]
            }]
        });
        return clienteFinal;

    } catch (error) {
        if (t && !t.finished) {
            await t.rollback();
        }
        throw error;
    }
}


// Atualiza um cliente já existente
async function updateClienteEspecial(id, nome_cliente, telefone, idMedicamentos) {
    const t = await sequelize.transaction();

    try {
        
      // Atualiza dados do cliente
        const updateFields = {};
        if (nome_cliente !== undefined && nome_cliente !== "") updateFields.nome_cliente = nome_cliente;
        if (telefone !== undefined && telefone !== "") updateFields.telefone = telefone;
       
  
        if (Object.keys(updateFields).length > 0) {
            await Clientes_especiais.update(updateFields, {
                where: { id },
                transaction: t
            });
        }

        // Atualiza os medicamentos 
        await Medicamentos_clientes_especiais.destroy({
            where: { fk_id_cliente_especial: id },
            transaction: t
        });

        if (idMedicamentos && idMedicamentos.length > 0) {
            const itensParaCriar = idMedicamentos.map(medicamentoId => ({
                fk_id_cliente_especial: id,
                fk_id_medicamento: medicamentoId
            }));

            await Medicamentos_clientes_especiais.bulkCreate(itensParaCriar, { transaction: t });
        }

        await t.commit();
        return [1];

    } catch (error) {
        if (t && !t.finished) {
            await t.rollback();
        }
        throw error;
    }
}


// Deleta o registro de um cliente com base na ID
async function deleteClienteEspecial(id) {
    const t = await sequelize.transaction();

    try {
         await Medicamentos_clientes_especiais.destroy({
            where: { fk_id_cliente_especial: id },
            transaction: t
        })

        const deleteCliente = await Clientes_especiais.destroy({
            where: { id },
            transaction: t
        });

        await t.commit();
        return deleteCliente;
    }
    catch (error) {
        if (t && !t.finished) {
            await t.rollback();
        }
        throw error;
    }
}

module.exports = {
    getAllClientesEspeciais,
    getAllClientesByMedicamento,
    getClienteEspecialById,
    createClienteEspecial,
    updateClienteEspecial,
    deleteClienteEspecial,
}