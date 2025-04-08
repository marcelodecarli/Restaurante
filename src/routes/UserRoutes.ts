import { Router } from "express";
import { UserController } from "../controller/UserController";

const router = Router()

router.post("./register", UserController.register.bind)
router.post("./login", UserController.login.bind)

export default router;