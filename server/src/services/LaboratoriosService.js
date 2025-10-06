const { getAllLaboratorios,
    getLaboratorioById,
    getAllLaboratoriosForSelect,
    createLaboratorio,
    updateLaboratorio
} = require ("../repositories/LaboratoriosRepository.js");
const { Op } = require("sequelize");
const {Laboratorios, sequelize } = require("../models/index.js");
const ExistsDataError = require("../classes/ExistsDataError.js");
const NotFoundError = require("../classes/NotFoundError.js");


async function getAllLaboratoriosService() {
    const allLaboratorios = await getAllLaboratorios ()
    return allLaboratorios;
}

async function getLaboratorioByIdService (id) {
    const laboratorio = await getLaboratorioById (id)
    return laboratorio;
}

async function getAllLaboratoriosForSelectService() {
    const laboratorio = await getAllLaboratoriosForSelect()
    const formattedLaboratorio = laboratorio.map((laboratorio) => {
        return {
        laboratorioValue: laboratorio.id,
        laboratorioLabel: laboratorio.nome_laboratorio,
        laboratorioCnpjlabel: laboratorio.cnpj,
        laboratorioEndrecolabel: laboratorio.endereco   
        };
    });
    return formattedLaboratorio;
}

async function createLaboratorioService(laboratorioData) {
    const { nome_laboratorio, cnpj, endereco } = laboratorioData;
    
    const existingLaboratorio = await Laboratorios.findOne ({
        where: {cnpj: cnpj}
    });

    if (existingLaboratorio) {
        throw new ExistsDataError ("Já existe um laboratório com este CNJP",{
            fields: {
                cnpj: cnpj
            }
        });   
    }
    const createdLaboratorio = await createLaboratorio({nome_laboratorio, cnpj, endereco})
    return createdLaboratorio;
}

async function updateLaboratorioService(id, nome_laboratorio, cnpj, endereco) {

    const laboratorio = await getLaboratorioById(id);
    if(!laboratorio){
        throw new ExistsDataError("O laboratório não existe")
    }

    if (cnpj && cnpj !== laboratorio.cnpj) {
        const laboratorioSameCnpj = await Laboratorios.findOne({
            where: {
                cnpj: cnpj,
                id: { [Op.ne]: id}
            }
        });
    if (laboratorioSameCnpj) {
        throw new ExistsDataError("Outro laboratório já utiliza este CNPJ",{
            fields: {
                cnpj: cnpj
                },
                conflictingId: laboratorioSameCnpj.id
            });
        }
    }


    const updatedData = await updateLaboratorio(id, nome_laboratorio, cnpj, endereco)
    return updatedData;
}

module.exports = {
   getAllLaboratoriosService,
   getLaboratorioByIdService,
   getAllLaboratoriosForSelectService,
   createLaboratorioService,
    updateLaboratorioService
}