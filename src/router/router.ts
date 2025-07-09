import { count } from "console";
import { Router } from "express";
import { loremIpsum } from "lorem-ipsum";
import { format } from "path";
import mainController from "../controllers/main.controller";
import majorController from "../controllers/major.controller";
import userController from "../controllers/user.controller";
import { checkAuth } from "../middlewares/checkAuth";

const router = Router()

router.get("/", mainController.index)
router.get("/about",mainController.about)
router.get("/bem-vindo/:nome", mainController.bemVindo)
router.get("/hb1", mainController.hb1)
router.get("/hb2", mainController.hb2)
router.get("/hb3", mainController.hb3)
router.get("/hb4", mainController.hb4)
router.get("/lorem/:numero", mainController.lorem)
router.get("/cookie", mainController.testeCookie)

router.get("/majors/", majorController.index)
router.all("/majors/create", checkAuth, majorController.create)
router.get("/majors/read/:id", majorController.read)
router.all("/majors/update/:id", majorController.update)
router.post("/majors/remove/:id", majorController.remove)

router.get("/users/", userController.index)
router.all("/users/create", userController.create)
router.get("/users/read/:id", userController.read)
router.all("/users/update/:id", userController.update)
router.post("/users/remove/:id", userController.remove)
router.all("/users/login", userController.login)
router.get("/users/logout", userController.logout)


export default router