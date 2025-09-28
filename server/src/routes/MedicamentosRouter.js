const { Router } = require("express");
const uploadAndMoveFile = require("../utils/MulterUtil.js");
const middlewareMulter = require("../middlewares/multerMiddleware.js");
const medicamentosController = require("../controllers/MedicamentosController.js");

const router = Router();

router
   .route("/")
   .get(medicamentosController.getAllMedicamentos)
   .post(uploadAndMoveFile.single("image"), medicamentosController.createMedicamento, middlewareMulter)
 
router
   .route("/select-options")
   .get(medicamentosController.getAllMedicamentosForSelect)
 
router
   .route("/filter")
   .get(medicamentosController.getAllMedicamentosByFilter)

router
   .route("/situacao/inativo")
   .get(medicamentosController.getAllInactiveMedicamentos)
   
router
   .route("/laboratorios/:idLab")
   .get(medicamentosController.getAllMedicamentosByLaboratorioId)
/*
router
   .route("/:id/situacao")
   .patch(medicamentosController.changeSituacaoMedicamento)
*/
router
   .route("/:id")
   .get(medicamentosController.getMedicamentoById)
/*
   .patch(
      uploadAndMoveFile.single("image"), 
      medicamentosController.updateMedicamento, 
      middlewareMulter
   )
*/

module.exports = router;