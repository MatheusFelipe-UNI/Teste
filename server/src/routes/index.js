const { Router } = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const authRouter = require("./AuthRouter.js");
const userRouter = require("./UsersRouter.js");
const medicamentoRouter = require("./MedicamentosRouter.js");
const laboratorioRouter = require("./LaboratoriosRouter.js");
const loteMedicamento = require("./LotesMedicamentosRouter.js");
const aquisicaoMedicamento = require("./AquisicoesRouter.js");
const retiradasMedicamento = require("./RetiradasRouter.js");
const relatorioMedicamento = require("./RelatMedicamentosRouter.js");
const clienteEspecial = require("./ClientesEspRouter.js");

const usersController = require("../controllers/UsersController.js");

const router = Router();

router.use("/auth", authRouter);


router.post("/users", usersController.createUser);


router.use("/users", authMiddleware, userRouter);


router.use("/medicamentos", authMiddleware, medicamentoRouter);
router.use("/laboratorios", authMiddleware, laboratorioRouter);
router.use("/lotes-medicamentos", authMiddleware, loteMedicamento);
router.use("/aquisicoes", authMiddleware, aquisicaoMedicamento);
router.use("/retiradas", authMiddleware, retiradasMedicamento);
router.use("/relatorios", authMiddleware, relatorioMedicamento);
router.use("/clientes-especiais", authMiddleware, clienteEspecial);

module.exports = router;