const { Router } = require("express");
const usersController = require("../controllers/UsersController.js");

const router = Router();

router
   .route("/")
   .get(usersController.getAllUsers);


router
   .route("/logged")
   .get(usersController.getUserLoggedById)

router
   .route("/default-users")
   .get(usersController.getAllDefaultUsers)

router
   .route("/default-users/:idUser")
   .patch(usersController.changeStatusUser)

router
   .route("/:id")
   .get(usersController.getUserById)

module.exports = router;