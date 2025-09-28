const { Router } = require("express");
const laboratoriosController = require("../controllers/LaboratoriosController.js");

const router = Router();

router
   .route("/")
   .get(laboratoriosController.getAllLaboratorios)
   .post(laboratoriosController.createLaboratorio)

router
   .route("/select-options")
   .get(laboratoriosController.getAllLaboratoriosForSelect)

router
   .route("/:id")
   .get(laboratoriosController.getLaboratorioById)
   .post(laboratoriosController.updateLaboratorio)

module.exports = router;