const { Router } = require("express");
const clientesEspController = require("../controllers/ClientesEspController.js");

const router = Router();

router
   .route("/")
   .get(clientesEspController.getAllClientesEspeciais)
   .post(clientesEspController.createClienteEspecial)

router
   .route("/medicamentos/:idMedicamentos")
   .get(clientesEspController.getAllClientesByMedicamento)

router
   .route("/:id")
   .get(clientesEspController.getClienteEspecialById)
   .patch(clientesEspController.updateClienteEspecial)
   .delete(clientesEspController.deleteClienteEspecial)

module.exports = router;