const {
    getAllLotesMedicamentos,
    getLotesMedicamentoById,
    getAllLotesMedicamentosByIdMedicamento,
    getAllLotesMedicamentosByFilter,
    createLoteMedicamento,
    updateLoteMedicamento,
} = require("../repositories/LotesMedicamentosRepository.js");
const { Op } = require("sequelize");
const { LotesMedicamentos, sequelize } = require("../models/index.js");
const ExistsDataError = require("../classes/ExistsDataError.js");


async function getAllLotesMedicamentosService() {
    const allLotesMedicamentos = await getAllLotesMedicamentos()
    return allLotesMedicamentos;
}

async function getLotesMedicamentosByIdService(id) {
    const loteMedicamentos = await getLotesMedicamentoById(id)
    return loteMedicamentos;
}

async function getAllLotesMedicamentosByIdMedicamentoService(idMedicamento) {
    const loteMedicamento = await getAllLotesMedicamentosByIdMedicamento(idMedicamento)
    return loteMedicamento;
}

async function getAllLotesMedicamentosByFilterService(QueryParams = {}) {
    const { orderBy, ...filters } = QueryParams;

    const LotesFilters = ["fk_id_medicamento", "quantidade", "data_validade", "vencendo", "estoque_baixo", "vencidos"];
    const Filterselect = {};

    if (filters && Object.keys(filters).length > 0) {
        Object.keys(filters).forEach(key => {
            if (LotesFilters.includes(key)) {
                // Filtra por quantidade exata
                if (key === 'fk_id_medicamento' || key === 'quantidade') {
                    Filterselect[key] = { [Op.eq]: Number(filters[key]) };

                    // Filtra por data exata
                } else if (key === 'data_validade') {
                    Filterselect[key] = { [Op.eq]: filters[key] };
                }

                // Filtra por Lotes próximos a vencer
                else if (key === 'vencendo') {
                    const hoje = new Date();
                    const dataFim = new Date();
                    dataFim.setDate(hoje.getDate() + Number(filters[key]));

                    Filterselect.data_validade = {
                        [Op.between]: [hoje, dataFim]
                    };
                }

                // Filtra por Lotes vencidos
                else if (key === 'vencidos') {
                    if (filters[key] === 'true' || filters[key] === true) {
                        Filterselect.data_validade = {
                            [Op.lt]: new Date()
                        };
                    }
                }

                // Filtra por medicamentos próximo de acabar o estoque
                else if (key === 'estoque_baixo') {
                    if (filters[key] === 'true' || filters[key] === true) {
                        Filterselect.quantidade = {
                            [Op.lte]: 10
                        };
                    }
                }
            }
        });
    }

    const Orderselect = [];
    if (orderBy) {
        const [field, direction] = orderBy.split(",");
        if (field && (direction === "ASC" || direction === "DESC" || direction === "asc" || direction === "desc")) {
            const formattedDirection = direction.toUpperCase();
            Orderselect.push([field, formattedDirection]);
        }
    } else {
        Orderselect.push(["id", "ASC"]);
    };

    const allLotes = await getAllLotesMedicamentosByFilter(Filterselect, Orderselect);
    return allLotes;
}

async function createdLoteMedicamentoService(loteData) {
    const createdLote = await createLoteMedicamento(loteData)
    return createdLote;
}

async function updateLoteMedicamentoService(id, fk_id_medicamento, quantidade, data_validade) {
    const existingLote = await getLotesMedicamentoById(id);
    if(!existingLote){
        throw new ExistsDataError("Não existe nenhum lote com esta ID")
    }
    const updatedLote = await updateLoteMedicamento(id,fk_id_medicamento,quantidade,data_validade)
    return updatedLote;
}

module.exports = {
    getAllLotesMedicamentosService,
    getLotesMedicamentosByIdService,
    getAllLotesMedicamentosByIdMedicamentoService,
    getAllLotesMedicamentosByFilterService,
    createdLoteMedicamentoService,
    updateLoteMedicamentoService,
}

