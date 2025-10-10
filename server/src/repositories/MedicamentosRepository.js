const { Where } = require("sequelize/lib/utils");
const { Medicamentos, Laboratorios, sequelize } = require("../models/index.js");
const NotFoundError = require("../classes/NotFoundError.js");

// Busca Todos os medicamentos cadastrados
async function getAllMedicamentos() {
   const allMedicamentos = await Medicamentos.findAll({
      attributes: [
         "id",
         "fk_id_laboratorio",
         "nome",
         "indicacao_uso",
         "categoria",
         "tipo_unidade",
         "quantidade_minima",
         "img",
         "situacao",
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("Medicamentos.created_at"), "%d-%m-%Y %H:%i:%s"),
            "data_criacao",
         ],
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("Medicamentos.updated_at"), "%d-%m-%Y %H:%i:%s"),
            "data_alteracao",
         ]
      ],
      include: {
         model: Laboratorios,
         as: "laboratorio",
         attributes: ["nome_laboratorio"]
      },
      order :[ //Ordena conforme a situação do medicamento (ATIVOS primeiro)
         ['situacao','ASC']
      ]
   });

   return allMedicamentos;
}

// Busca todos os medicamentos com base na ID do LABORATÓRIO
async function getAllMedicamentosByLaboratorioId(idLab) {
   const allMedicamentos = await Medicamentos.findAll({
      where: { fk_id_laboratorio: idLab },
      include: {
         model: Laboratorios,
         as: "laboratorio",
         attributes: ["nome_laboratorio"]
      }
   });

   return allMedicamentos;
}

// Busca todos os medicamentos com base na ID do MEDICAMENTO
async function getMedicamentoById(id) {
   const medicamento = await Medicamentos.findByPk(id, {
      include: {
         model: Laboratorios,
         as: "laboratorio",
         attributes: ["nome_laboratorio"]
      }
   });
   return medicamento;
}



// Busca todos os medicamentos Inativos
async function getAllInactiveMedicamentos() {
   const medicamento = await Medicamentos.findAll({
      attributes: [
         "id",
         "fk_id_laboratorio",
         "nome",
         "indicacao_uso",
         "categoria",
         "tipo_unidade",
         "img",
         "situacao",
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("Medicamentos.created_at"), "%d-%m-%Y %H:%i:%s"),
            "data_criacao",
         ],
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("Medicamentos.updated_at"), "%d-%m-%Y %H:%i:%s"),
            "data_alteracao",
         ]
      ],
      where: {
         situacao: 'INATIVO'
      },
      include: {
         model: Laboratorios,
         as: "laboratorio",
         attributes: ["nome_laboratorio"]
      }
   });

   return medicamento;
}

// busca os medicamentos conforme o SELECT
async function getAllMedicamentosForSelect() {
   const medicamento = await Medicamentos.findAll({
      attributes: [
         "id",
         "fk_id_laboratorio",
         "nome",
      ],
      include: {
         model: Laboratorios,
         as: "laboratorio",
         attributes: ["nome_laboratorio"]
      }
   });

   return medicamento;
}

// busca os medicamentos conforme os FILTROS selecionados pelo usuário
async function getAllMedicamentosByFilter (Parameters) {
     const allMedicamentos = await Medicamentos.findAll(Parameters)
   return allMedicamentos;
}

// Função para a criação de um NOVO MEDICAMENTO
async function createMedicamento(id, fk_id_laboratorio, nome, indicacao_uso, categoria, tipo_unidade, quantidade_minima, quantidade_total, img, situacao) {
   const Newmedicamentos = await Medicamentos.create({id, fk_id_laboratorio, nome, indicacao_uso, categoria, tipo_unidade, quantidade_minima, quantidade_total, img, situacao, })
   return Newmedicamentos
}


// Função para ATUALIZAR um MEDICAMENTO
async function updateMedicamento(id, fk_id_laboratorio, nome, indicacao_uso, categoria, tipo_unidade, quantidade_minima, quantidade_total, img, situacao) {
   const updateFields = {}
   if (fk_id_laboratorio !== undefined) updateFields.fk_id_laboratorio = fk_id_laboratorio;
   if (nome !== undefined && nome !== "") updateFields.nome = nome;
   if (indicacao_uso !== undefined && indicacao_uso !== "") updateFields.indicacao_uso = indicacao_uso;
   if (categoria !== undefined && categoria !== "") updateFields.categoria = categoria;
   if (tipo_unidade !== undefined && tipo_unidade !=="") updateFields.tipo_unidade = tipo_unidade;
   if (quantidade_minima !== undefined) updateFields.quantidade_minima = quantidade_minima;
   if (quantidade_total !== undefined) updateFields.quantidade_total = quantidade_total;
   if (img !== undefined) updateFields.img = img;
   if (situacao !== undefined) updateFields.situacao = situacao;
   const medicamento = await Medicamentos.update(updateFields, { 
      where: { id: id }
   });
   return medicamento;
}

// Função para ATUALIZAR a situação dos MEDICAMENTOS
async function changeSituacaoMedicamento(id, situacao) {
   const [rowsAffected] = await Medicamentos.update(
        { situacao: situacao },
        { where: { id: id } }
   );
   return rowsAffected; 
}

module.exports = {
   getAllMedicamentos,
   getAllMedicamentosByLaboratorioId,
   getMedicamentoById,
   getAllInactiveMedicamentos,
   getAllMedicamentosForSelect,
   getAllMedicamentosByFilter,
   createMedicamento,
   updateMedicamento,
   changeSituacaoMedicamento
}