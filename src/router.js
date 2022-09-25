import { Router } from "express"; // importamso a classe de rotas do express
import indexController from "./app/controller/IndexController.js"; // importamos o nosso controlador da pagina inicial
import usuarioController from "./app/controller/UsuarioController.js"; // importamos o controlador das paginas do usuario

const router = Router() // criamos um objeto de rotas

// criamos uma route que acessa pela URL / que recebe uma método do nosso controlador da pagina inicial
router.get("/" , indexController.index)

// criamos uma route que acessa pela URL /user/create que recebe uma método do nosso controlador de usuario com cadastro
router.get("/user/create" , usuarioController.cadastrar)

// criamos uma route que acessa pela URL /user/create/enviar que recebe uma método do nosso controlador de usuario com criar
router.post("/user/create/enviar" , usuarioController.criar)

// criamos uma route que acessa pela URL /user/list que recebe uma método do nosso controlador de usuario com listar
router.get("/user/list" , usuarioController.listar)

// criamos uma route que acessa pela URL /user/del/:id que recebe uma método do nosso controlador de usuario com deletar e enviamos um id
router.get("/user/del/:id" , usuarioController.deletar)

// criamos uma route que acessa pela URL /user/edit/:id que recebe uma método do nosso controlador de usuario com edit e enviamos um id
router.get("/user/edit/:id" , usuarioController.edit)

// criamos uma route que acessa pela URL /user/editar/:id que recebe uma método do nosso controlador de usuario com editar e enviamos um id
router.post("/user/editar/:id" , usuarioController.editar)

export default router // exportamos esse objeto