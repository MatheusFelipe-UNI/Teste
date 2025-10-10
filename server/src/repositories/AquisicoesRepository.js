    const { Association, where } = require("sequelize");
const { Aquisicoes, Itens_aquisicoes, Medicamentos, Laboratorios, Users, sequelize } = require("../models/index.js");

// Procura todas as Aquisições
async function getAllAquisicoes() {
    const allAquisicoes = await Aquisicoes.findAll({
        attributes: [
            "id",
            "fornecedor",
            "status",
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Aquisicoes.data_solicitacao"), "%d-%m-%Y %H:%i:%s"),
                "data_solicitacao_formatada",
            ],
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Aquisicoes.data_entrega"), "%d-%m-%Y"),
                "data_entrega_formatada",
            ]
        ],
        include: [
            {
                association: "laboratorio",
                attributes: ["nome_laboratorio"]
            },
            {
                association: "user",
                attributes: ["usuario"]
            }
        ],
        order: [
            ['data_solicitacao', 'DESC'],
            ['data_entrega', 'ASC']
        ]
    });
    return allAquisicoes;
}

// Procura as aquisições com base na ID do Medicamento
async function getAllAquisicoesByMedicamentoId(idMedicamento) {
    const allAquisicoes = await Aquisicoes.findAll({
        include: [
            {
                association: "item_aquisicao",
                attributes: ["quantidade_solicitada"],
                required: true,
                include: [{
                    association: "medicamento",
                    attributes: ["nome"],
                    where: { id: idMedicamento }
                }]
            }
        ]
    });
    return allAquisicoes;
}

// Exibe todas as aquisições com status "SOLICITADO"
async function getAllAquisicoesSolicitadas() {
    const aquisicao = await Aquisicoes.findAll({
        attributes: [
            "id",
            "fornecedor",
            "status",
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Aquisicoes.data_solicitacao"), "%d-%m-%Y %H:%i:%s"),
                "data_solicitacao_formatada",
            ],
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Aquisicoes.data_entrega"), "%d-%m-%Y"),
                "data_entrega_formatada",
            ]
        ],
        include: [
            {
                association: "laboratorio",
                attributes: ["nome_laboratorio"]
            },
            {
                association: "user",
                attributes: ["usuario"]
            }
        ],
        order: [
            ['data_solicitacao', 'DESC'],
            ['data_entrega', 'ASC']
        ],
        where: { status: 'SOLICITADO' },
    });
    return aquisicao;
}

// Exibe todas as aquisições com status "ENVIADO"
async function getAllAquisicoesEnviadas() {
    const aquisicao = await Aquisicoes.findAll({
        attributes: [
            "id",
            "fornecedor",
            "status",
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Aquisicoes.data_solicitacao"), "%d-%m-%Y %H:%i:%s"),
                "data_solicitacao_formatada",
            ],
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Aquisicoes.data_entrega"), "%d-%m-%Y"),
                "data_entrega_formatada",
            ]
        ],
        include: [
            {
                association: "laboratorio",
                attributes: ["nome_laboratorio"]
            },
            {
                association: "user",
                attributes: ["usuario"]
            }
        ],
        order: [
            ['data_entrega', 'ASC']
        ],
        where: { status: 'ENVIADO' }
    });
    return aquisicao;
}

// Exibe todas as aquisições com status "ENTREGUE"
async function getAllAquisicoesEntregues() {
    const aquisicao = await Aquisicoes.findAll({
        attributes: [
            "id",
            "fornecedor",
            "status",
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Aquisicoes.data_solicitacao"), "%d-%m-%Y %H:%i:%s"),
                "data_solicitacao_formatada",
            ],
            [
                sequelize.fn("DATE_FORMAT", sequelize.col("Aquisicoes.data_entrega"), "%d-%m-%Y"),
                "data_entrega_formatada",
            ]
        ],
        include: [
            {
                association: "laboratorio",
                attributes: ["nome_laboratorio"]
            },
            {
                association: "user",
                attributes: ["usuario"]
            }
        ],
        order: [
            ['data_entrega', 'DESC']
        ],
        where: { status: 'ENTREGUE' }
    });
    return aquisicao;
}

// Procura a Aquisição conforme sua ID
async function getAquisicaoById(id) {
    const idAquisicao = await Aquisicoes.findByPk(id, {});
    return idAquisicao;
}

// Cria uma nova Aquisição
async function createAquisicao(aquisicaoData, loteMedicamentos) {
    const t = await sequelize.transaction();

    try {
        const formattedStatus = aquisicaoData.status.toUpperCase();
        const newAqui = await Aquisicoes.create({
            fk_id_user: aquisicaoData.fk_id_user,
            fk_id_laboratorio: aquisicaoData.fk_id_laboratorio,
            fornecedor: aquisicaoData.fornecedor,
            status: formattedStatus,
            data_entrega: aquisicaoData.data_entrega
        }, { transaction: t });

        const itensParaCriar = loteMedicamentos.map(item => {
            return {
                ...item,
                fk_id_aquisicao: newAqui.id
            }
        });
        await Itens_aquisicoes.bulkCreate(itensParaCriar, { transaction: t });
        await t.commit();
        return newAqui;

    } catch (error) {
        await t.rollback();
        throw error;
    }
}

//Edita os status da Aquisição
async function changeStatusAquisicao(id, status) {
    const updateFields = {}
    if (status === "SOLICITADO" || status === "ENVIADO" || status === "ENTREGUE") updateFields.status = status;
    const updateAquisicao = await Aquisicoes.update(updateFields, {
        where: { id: id },
    });
    return updateAquisicao;
}

//Exclui a Aquisição
async function deleteAquisicaoById(id) {
    const deleteaquisicao = await Aquisicoes.destroy({
        where: { id: id }
    })
    return deleteaquisicao;
}


module.exports = {
    getAllAquisicoes,
    getAllAquisicoesByMedicamentoId,
    getAllAquisicoesSolicitadas,
    getAllAquisicoesEnviadas,
    getAllAquisicoesEntregues,
    getAquisicaoById,
    createAquisicao,
    changeStatusAquisicao,
    deleteAquisicaoById
}