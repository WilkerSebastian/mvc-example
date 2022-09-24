import { Router } from "express";
import indexController from "./app/controller/IndexController.js";
import usuarioController from "./app/controller/UsuarioController.js";

const router = Router()

router.get("/" , indexController.index)

router.get("/user/create" , usuarioController.cadastrar)
router.post("/user/create/enviar" , usuarioController.criar)
router.get("/user/list" , usuarioController.listar)
router.get("/user/del/:id" , usuarioController.deletar)

export default router