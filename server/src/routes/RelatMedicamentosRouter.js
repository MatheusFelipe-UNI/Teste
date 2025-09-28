const { Router } = require("express");
const relatMedicamentosController = require("../controllers/RelatMedicamentosController.js");

const router = Router();

router
   .route("/")
   .get(relatMedicamentosController.getAllRelatorios)
   .post(relatMedicamentosController.createRelatorio)

router
   .route("/filter")
   .get(relatMedicamentosController.getAllRelatoriosByFilter)

router
   .route("/:id")
   .get(relatMedicamentosController.getRelatorioById)

module.exports = router;