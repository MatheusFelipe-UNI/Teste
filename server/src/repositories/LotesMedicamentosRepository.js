const { Association } = require("sequelize");
const { Lotes_medicamentos, Medicamentos, sequelize } = require("../models/index.js");
const { Op } = require("sequelize");

async function getAllLotesMedicamentos() {
    const allLotesMedicamentos = await Lotes_medicamentos.findAll({
        attributes: [
            "id",
            "quantidade",
            "data_validade",
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Lotes_medicamentos.data_validade"), "%d-%m-%Y %H:%i:%s"),
                "data_validade",
            ],
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Lotes_medicamentos.created_at"), "%d-%m-%Y %H:%i:%s"),
                "data_criacao",
            ],
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Lotes_medicamentos.updated_at"), "%d-%m-%Y %H:%i:%s"),
                "data_alteracao",
            ]
        ],
        include: [
            {
                association: "medicamento",
                attributes: ["nome"]
            }
        ],
        order: [ //Ordena conforme a ID dos Lotes dos medicamentos (Ordem Crescente)
            ['id', 'ASC']
        ]
    });

    return allLotesMedicamentos;
}

//Filtra os lotes pela ID
async function getLotesMedicamentoById(id) {
    const loteMedicamento = await Lotes_medicamentos.findByPk(id, {
        include: [
            {
                association: "medicamento",
                attributes: ["nome"]
            }
        ]
    })
    return loteMedicamento
}

// Procura os lotes com base na ID do MEDICAMENTO
async function getAllLotesMedicamentosByIdMedicamento(idMedicamento) {
    const loteMedicamento = await Lotes_medicamentos.findAll({
        where: { fk_id_medicamento: idMedicamento },
        include: [
            {
                association: "medicamento",
                attributes: ["nome"]
            }
        ]
    });
    return loteMedicamento
}

// Procura os lotes com base no Filtro Selecionado
async function getAllLotesMedicamentosByFilter(Filterselect = {}, Orderselect = []) {
    const queryOptions = {
        where: Object.keys(Filterselect).length > 0 ? Filterselect : undefined,
        order: Orderselect.length > 0 ? Orderselect : [['id', 'ASC']],
        attributes: [
            "id",
            "quantidade",
            "data_validade",
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Lotes_medicamentos.data_validade"), "%d-%m-%Y %H:%i:%s"),
                "data_validade",
            ],
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Lotes_medicamentos.created_at"), "%d-%m-%Y %H:%i:%s"),
                "data_criacao",
            ],
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Lotes_medicamentos.updated_at"), "%d-%m-%Y %H:%i:%s"),
                "data_alteracao",
            ]
        ],
        include: [
            {
                association: "medicamento",
                attributes: ["nome"]
            }
        ]
    };
    const allLotesMedicamentos = await Lotes_medicamentos.findAll(queryOptions);
    return allLotesMedicamentos;
}

// Cria um novo Lote de medicamentos
async function createLoteMedicamento(loteData) {
    const createdLote = await Lotes_medicamentos.create(loteData)
    return createdLote;
}

//Edita um lote já existente
async function updateLoteMedicamento(id, fk_id_medicamento, quantidade, data_validade){
    const updateFields = {};
    if(fk_id_medicamento !== undefined) updateFields.fk_id_medicamento = fk_id_medicamento;
    if(quantidade !== undefined && quantidade !== "") updateFields.quantidade = quantidade;
    if(data_validade !== undefined && data_validade !== "") updateFields.data_validade = data_validade;
    const updatedData = await Lotes_medicamentos.update(updateFields, {
        where: { id: id},
    });
    return updatedData
}

module.exports = {
    getAllLotesMedicamentos,
    getLotesMedicamentoById,
    getAllLotesMedicamentosByIdMedicamento,
    getAllLotesMedicamentosByFilter,
    createLoteMedicamento,
    updateLoteMedicamento,
}