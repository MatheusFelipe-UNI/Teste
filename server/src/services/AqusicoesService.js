const {
    getAllAquisicoes,
    getAllAquisicoesByMedicamentoId,
    getAllAquisicoesSolicitadas,
    getAllAquisicoesEnviadas,
    getAllAquisicoesEntregues,
    getAquisicaoById,
    createAquisicao,
    changeStatusAquisicao,
    deleteAquisicaoById,
} = require("../repositories/AquisicoesRepository.js");
const { Op } = require("sequelize");
const { Aquisicoes, sequelize } = require("../models/index.js");
const ExistsDataError = require("../classes/ExistsDataError.js");

async function getAllAquisicoesService() {
    const allAquisicoes = await getAllAquisicoes()
    return allAquisicoes;
}

async function getAllAquisicoesByMedicamentoIdService(idMedicamento) {
    const allAquisicoes = await getAllAquisicoesByMedicamentoId(idMedicamento);
    return allAquisicoes;
}

async function getAllAquisicoesSolicitadasService() {
    const aquisicao = await getAllAquisicoesSolicitadas();
    return aquisicao;
}

async function getAllAquisicoesEnviadasService() {
    const aquisicao = await getAllAquisicoesEnviadas();
    return aquisicao;
}

async function getAllAquisicoesEntreguesService() {
    const aquisicao = await getAllAquisicoesEntregues();
    return aquisicao;
}

async function getAquisicaoByIdService(id) {
    const idAquisicao = await getAquisicaoById(id);
    return idAquisicao
}

async function createAquisicaoService(aquisicaoData, lote_medicamentos) {
    const novaAquisicao = await createAquisicao(aquisicaoData, lote_medicamentos)
    return novaAquisicao;
}

async function changeStatusAquisicaoService(id, status) {
    const aquisicaoExists = await getAquisicaoById(id);
    if (!aquisicaoExists) {
        throw new ExistsDataError("Esta aquisição não exite")
    }

    const formattedSituacao = status.trim().toUpperCase();
    if (formattedSituacao !== "SOLICITADO" && formattedSituacao !== "ENVIADO" && formattedSituacao !== "ENTREGUE") {
        throw new ExistsDataError("Use 'SOLICITADO', 'ENVIADO' ou 'ENTREGUE'")
    }
    const situacaoAtual = aquisicaoExists.status;
    if (formattedSituacao == situacaoAtual) {
        throw new ExistsDataError(`Esta aquisição já está na situação de: ${formattedSituacao}`);
    }
    const rowAffected = await changeStatusAquisicao(id, formattedSituacao);
    return rowAffected
}

async function deleteAquisicaoByIdService(id) {
    const aquisicaoExists = await getAquisicaoById(id);
    if (!aquisicaoExists) {
        throw new ExistsDataError("Esta aquisição não exite")
    }
    const deleteaquisicao = await deleteAquisicaoById(id);
    return deleteaquisicao;
}

module.exports = {
    getAllAquisicoesService,
    getAllAquisicoesByMedicamentoIdService,
    getAllAquisicoesSolicitadasService,
    getAllAquisicoesEnviadasService,
    getAllAquisicoesEntreguesService,
    getAquisicaoByIdService,
    createAquisicaoService,
    changeStatusAquisicaoService,
    deleteAquisicaoByIdService
}