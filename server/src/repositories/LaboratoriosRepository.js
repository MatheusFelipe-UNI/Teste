const { Laboratorios, sequelize } = require("../models/index.js");

//Busca todos os laboratórios
async function getAllLaboratorios() {
    const allLaboratorios = await Laboratorios.findAll({
        attributes: [
            "id",
            "nome_laboratorio",
            "cnpj",
            "endereco",
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Laboratorios.created_at"), "%d-%m-%Y %H:%i:%s"),
                "data_criacao",
            ],
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Laboratorios.updated_at"), "%d-%m-%Y %H:%i:%s"),
                "data_alteracao",
            ]
        ],
        order: [ //Ordena conforme a ID do laboratório (Ordem Crescente)
            ['id', 'ASC']
        ]
    });

    return allLaboratorios;
}

//Filtra os laboratórios pela ID
async function getLaboratorioById(id) {
    const laboratorio = await Laboratorios.findByPk(id, {})
    return laboratorio
}

async function getAllLaboratoriosForSelect() {
    const laboratorio = await Laboratorios.findAll({
         attributes: [
            "id",
            "nome_laboratorio",
            "cnpj",
            "endereco",
         ]
    })
    return laboratorio
}

async function createLaboratorio(LaboratorioData) {
    const createdLaboratorio = await Laboratorios.create(LaboratorioData);
    return createdLaboratorio;
}

async function updateLaboratorio(id, nome_laboratorio, cnpj, endereco) {
    const updateFields = {};
    if (nome_laboratorio !== undefined) updateFields.nome_laboratorio = nome_laboratorio;
    if (cnpj !== undefined) updateFields.cnpj = cnpj;
    if (endereco !== undefined) updateFields.endereco = endereco;
    const laboratorio = await Laboratorios.update (updateFields, {
        where: { id: id},
    });
    return laboratorio;
}

module.exports = {
    getAllLaboratorios,
    getLaboratorioById,
    getAllLaboratoriosForSelect,
    createLaboratorio,
    updateLaboratorio
}
