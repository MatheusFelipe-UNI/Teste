const { Router } = require("express");
const aquisicoesController = require("../controllers/AquisicoesController.js");

const router = Router();

router
   .route("/")
   .get(aquisicoesController.getAllAquisicoes)
   .post(aquisicoesController.createAquisicao)

router
   .route("/status/solicitado")
   .get(aquisicoesController.getAllAquisicoesSolicitadas)

router
   .route("/status/enviado")
   .get(aquisicoesController.getAllAquisicoesEnviadas)

router
   .route("/status/entregue")
   .get(aquisicoesController.getAllAquisicoesEntregues)

router
   .route("/:id/status")
   .patch(aquisicoesController.changeStatusAquisicao)

router
   .route("/:id")
   .get(aquisicoesController.getAquisicaoById)
   .delete(aquisicoesController.deleteAquisicaoById)

module.exports = router;