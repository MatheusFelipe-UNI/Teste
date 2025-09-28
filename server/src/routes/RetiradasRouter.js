const { Router } = require("express");
const retiradasController = require("../controllers/RetiradasController.js");

const router = Router();

router
   .route("/")
   .get(retiradasController.getAllRetiradas)
   .post(retiradasController.createRetirada)

router
   .route("/filter")
   .get(retiradasController.getAllRetiradasByFilter)

router
   .route("/:id")
   .get(retiradasController.getRetiradaById)

module.exports = router;