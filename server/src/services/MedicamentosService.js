const { getAllMedicamentos,
   getAllMedicamentosByLaboratorioId,
   getMedicamentoById,
   getAllInactiveMedicamentos,
   getAllMedicamentosForSelect,
   getAllMedicamentosByFilter,
   createMedicamento,
    updateMedicamento,
    changeSituacaoMedicamento,
} = require("../repositories/MedicamentosRepository.js");
const { Op } = require("sequelize");
const { Medicamentos, Laboratorios, sequelize } = require("../models/index.js");
const ExistsDataError = require("../classes/ExistsDataError.js");
const NotFoundError = require("../classes/NotFoundError.js");


async function getAllMedicamentosService() {
   const medicamentos = await getAllMedicamentos();
   return medicamentos;
}

async function getAllMedicamentosByLaboratorioIdService(idLab) {
   const medicamentos = await getAllMedicamentosByLaboratorioId(idLab);
   return medicamentos;
}

async function getMedicamentoByIdService(id) {
   const medicamento = await getMedicamentoById(id);
   return medicamento;
}

async function getAllInactiveMedicamentosService() {
   const medicamento = await getAllInactiveMedicamentos();
   return medicamento;
}

async function getAllMedicamentosForSelectService() {
   const medicamento = await getAllMedicamentosForSelect();
   const formattedMedicamentos = medicamento.map((medicamento) => {
      return {
         medicamentoValue: medicamento.id,
         medicamentoLabel: medicamento.nome,
         laboratorioValue: medicamento.laboratorio.id,
         laboratorioLabel: medicamento.laboratorio.nome_laboratorio,
      };
   });
   return formattedMedicamentos;
}

async function getAllMedicamentosByFilterService(QueryParams = {}) {
   const { orderBy, ...filters } = QueryParams;
   const MedicamentosFilters = ["nome", "indicacao_uso", "categoria", "tipo_unidade", "situacao"];
   const Filterselect = {};

    Object.keys(filters).forEach(key => {
      if (MedicamentosFilters.includes(key)) {
         if (key === 'nome' || key === 'indicacao_uso') {
            Filterselect[key] = { [Op.like]: `%${filters[key]}%` };
         } else {
            Filterselect[key] = { [Op.eq]: filters[key] };
         }
      }
   });

   const Orderselect = [];
   if (orderBy) {
      const [field, direction] = orderBy.split(",")
      if (field && (direction == "ASC" || direction === "DESC")) {
         Orderselect.push([field, direction]);
      }
   } else {
      Orderselect.push(["nome", "ASC"]);
   };

   const queryOptions = {
      where: Filterselect,
      order: Orderselect,
      attributes: [
         "id",
         "fk_id_laboratorio",
         "nome",
         "indicacao_uso",
         "categoria",
         "tipo_unidade",
         "situacao",
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("Medicamentos.created_at"), "%d-%m-%Y %H:%i:%s"),
            "data_criacao",
         ],
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("Medicamentos.updated_at"), "%d-%m-%Y %H:%i:%s"),
            "data_alteracao",
         ],
      ],
      include: {
         model: Laboratorios,
         as: "laboratorio",
         attributes: ["nome_laboratorio"],
      },
      order: [],
   };

   const allMedicamentos = await getAllMedicamentosByFilter(queryOptions);
   return allMedicamentos;
}

async function createMedicamentoService(id, fk_id_laboratorio, nome, indicacao_uso, categoria, tipo_unidade, quantidade_minima, quantidade_total, img, situacao) {

   const idExists = await getMedicamentoById(id);
   if(idExists) {
      throw new ExistsDataError("Existe um medicamento com este ID.","ID_EXISTS", {id})
   }

   const Newmedicamento = await createMedicamento (id, fk_id_laboratorio, nome, indicacao_uso, categoria, tipo_unidade, quantidade_minima, quantidade_total, img, situacao);
   return Newmedicamento;
}

async function updateMedicamentoService(id, fk_id_laboratorio, nome, indicacao_uso, categoria, tipo_unidade, quantidade_minima, img, situacao, quantidade_total) {
   const medicamento = await getMedicamentoById(id);
   if(!medicamento) {
      throw new NotFoundError("O medicamento não existe")
   }
   const updatedMedicamento = await updateMedicamento(id, fk_id_laboratorio, nome, indicacao_uso, categoria, tipo_unidade, quantidade_minima, img, situacao, quantidade_total);
   return updatedMedicamento;
}

async function changeSituacaoMedicamentoService(id, situacao) {
   const medicamento = await getMedicamentoById(id);
   if(!medicamento) {
      throw new NotFoundError("O medicamento não existe")
   }

   const formattedStatus = situacao.trim().toUpperCase();
   if (formattedStatus != 'ATIVO' && formattedStatus != 'INATIVO') {
      throw new ExistsDataError ("Use: ATIVO ou INATIVO");
   }
   const situacaoAtual = medicamento.situacao ? medicamento.situacao.trim().toUpperCase() : 'ATIVO';
      if (situacaoAtual == formattedStatus) {
         throw new ExistsDataError (`O medicamento já está ${formattedStatus}`);
      }
    const rowAffected = await changeSituacaoMedicamento(id, formattedStatus);
      return rowAffected;
} 

module.exports = {
   getAllMedicamentosService,
   getAllMedicamentosByLaboratorioIdService,
   getMedicamentoByIdService,
   getAllInactiveMedicamentosService,
   getAllMedicamentosForSelectService,
   getAllMedicamentosByFilterService,
   createMedicamentoService,
   updateMedicamentoService,
   changeSituacaoMedicamentoService,
};   