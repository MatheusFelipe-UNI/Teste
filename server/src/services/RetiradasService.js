const {
    createRetirada,
    getAllRetiradas,
    getAllRetiradasByFilter,
    getRetiradaById,
} = require("../repositories/RetiradasRepository.js");
const { Op } = require("sequelize");
const { Itens_retiradas, Retiradas, Medicamentos, sequelize } = require("../models/index.js");
const ExistsDataError = require("../classes/ExistsDataError.js");


async function createdRetiradaService(medicamentos_retirados, retiradaData) {
    for (const retirados of medicamentos_retirados) {
            const medicamentos = await Medicamentos.findByPk(retirados.medicamentoID);

        if(!medicamentos){
            throw new ExistsDataError("O medicamento informado não existe")
        }

        if (medicamentos.situacao !== "ATIVO") {
            throw new ExistsDataError ("O medicamento informado encontra-se desativado")
        }

        if (retirados.quantidade_solicitada > medicamentos.quantidade_total) {
            throw new ExistsDataError ("Não há estoque suficiente do medicamento solicitado")
        }
        
    }
    const novaRetirada = await createRetirada(medicamentos_retirados, retiradaData)
    return novaRetirada;
}  

async function getAllRetiradasService(){
    const retirada = await getAllRetiradas()
    return retirada;
}

async function getAllRetiradasByFilterService(QueryParams = {}) {
     const { orderBy, ...filters } = QueryParams;

    const RetiradasFilters = ["id", "data_retirada", "fk_id_user"];
    const FilterSelect = {};


    if (filters && Object.keys(filters).length > 0) {
        Object.keys(filters).forEach(key => {
            if(RetiradasFilters.includes(key)) {

                //Filtra com base na ID 
                if (key == 'id') {
                    FilterSelect[key] = { [Op.eq]: Number(filters[key]) };
                }
                //Filtra com base na data da retirada
                else if (key === 'data_retirada') {
                    FilterSelect[key] = { [Op.eq]: filters[key] };
                }
                //Filtra com base na ID do USUÁRIO
                else if (key === 'fk_id_user') {
                    FilterSelect[key] = { [Op.eq]: filters[key] };
                }
            }
        });
    }
    const OrderSelect = [];
    if (orderBy) {
        const [field, direction] = orderBy.split(",");
        if (field && (direction === "ASC" || direction === "DESC" || direction === "asc" || direction === "desc")) {
            const formattedDirection = direction.toUpperCase();
            OrderSelect.push([field, formattedDirection]);
        }
    } else {
        OrderSelect.push(["id", "ASC"]);
    }
    const retiradas = await getAllRetiradasByFilter(FilterSelect, OrderSelect);
    return retiradas;
}

async function getRetiradaByIdService(id) {
    const idretiradas = await getRetiradaById(id)
    return idretiradas;
}

module.exports = {
    createdRetiradaService,
    getAllRetiradasService,
    getAllRetiradasByFilterService,
    getRetiradaByIdService,
}