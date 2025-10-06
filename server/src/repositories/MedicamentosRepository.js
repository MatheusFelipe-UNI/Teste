const { Medicamentos, Laboratorios, sequelize } = require("../models/index.js");

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
async function createMedicamento(medicamentoData) {
   const Newmedicamentos = await Medicamentos.create(medicamentoData);
   return Newmedicamentos
}

// Função para ATUALIZAR um MEDICAMENTO
async function updateMedicamento(id, medicamentoData) {
   const medicamento = await Medicamentos.update(medicamentoData, {
      where: { id: id },
   });
   return medicamento;
}

// Função para ATUALIZAR a situação dos MEDICAMENTOS
async function changeSituacaoMedicamento(id, newStatus) {
   const [rowsAffected] = await Medicamentos.update(
      { situacao: newStatus },
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
