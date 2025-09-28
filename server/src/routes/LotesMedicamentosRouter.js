const { Router } = require("express");
const lotesMedicamentos = require("../controllers/LotesMedicamentosController.js");

const router = Router();

router
   .route("/")
   .get(lotesMedicamentos.getAllLotesMedicamentos)
   .post(lotesMedicamentos.createLoteMedicamento);

router
   .route("/filter")
   .get(lotesMedicamentos.getAllLotesMedicamentosByFilter);

router
   .route("/medicamentos/:id")
   .get(lotesMedicamentos.getAllLotesMedicamentosByIdMedicamento);

router
   .route("/:id")
   .get(lotesMedicamentos.getLoteMedicamentoById)
   .patch(lotesMedicamentos.updateLoteMedicamento);

module.exports = router;