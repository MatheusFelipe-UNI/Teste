const { getAllMedicamentos,
   getAllMedicamentosByLaboratorioId,
   getMedicamentoById,
   getAllInactiveMedicamentos,
   getAllMedicamentosForSelect,
   getAllMedicamentosByFilter,
   createMedicamento,
    getMedicamentoByName,
} = require("../repositories/MedicamentosRepository.js");
const { Op } = require("sequelize");
const { Medicamentos, Laboratorios, sequelize } = require("../models/index.js");
const ExistsDataError = require("../classes/ExistsDataError.js");


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

async function createMedicamentoService(medicamentoData) {
   const { id, nome } = medicamentoData

   const idExists = await getMedicamentoById(id);
   if(idExists) {
      throw new ExistsDataError("Existe um medicamento com este ID.","ID_EXISTS", {id})
   }

   const Newmedicamento = await createMedicamento (medicamentoData);
   return Newmedicamento;
}

module.exports = {
   getAllMedicamentosService,
   getAllMedicamentosByLaboratorioIdService,
   getMedicamentoByIdService,
   getAllInactiveMedicamentosService,
   getAllMedicamentosForSelectService,
   getAllMedicamentosByFilterService,
   createMedicamentoService,
};