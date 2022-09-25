import express from "express"; // importacão dro framework de aplicação web
import expressEjsLayouts from "express-ejs-layouts"; // importando o renderizador de layouts do ejs
import path from "path" // importando path para manipulçao de caminho nos diretorios
import router from "./router.js"; // importanto router que foi onde definimos as routas do servidor

/*

    App é a classe responsavel por configurar qual será as rota
    uada, qual serão os arquivos disponiveis no servidor, qual
    engine de renderização estará utilizando entres outras.

*/
export default class App { // export default para exporta um elemento de um arquivo para outro

    constructor() { // contrutor da classe

        this.server = express() // server será a varaivel que armazena a aplicação 
        this.middleware() // chamamos o método de configuração 
        this.router() // chamamos o método de rotas

    }

    // método middleware responsavel por aplicar as configurações 
    middleware() {

        // definimos os diretorios dos modulos
        this.server.use("/base64" , express.static(path.resolve("./node_modules/js-base64")))
        this.server.use("/jquery", express.static(path.resolve("./node_modules/jquery/dist")))
        this.server.use("/popperjs", express.static(path.resolve("./node_modules/@popperjs/core/dist/umd")))
        this.server.use("/bootstrap", express.static(path.resolve("./node_modules/bootstrap/dist")))

        // definindo o diretorio de arquivos públicos do servidor
        this.server.use("/public", express.static(path.resolve("./src/app/public")))

        // parte de configuração da engine de renderização
        this.server.use(expressEjsLayouts) // definimos que usaremos o layout.ejs será o padrão em todas as paginas
        this.server.set('views', path.resolve("./src/app/views")); // dizemos que nossa camade vizualização será o diretorio views
        this.server.set('view engine', 'ejs'); // definimos que a nossa engine de renderização será ejs

        // parte de configuração de criptografia de requisições do método POST
        this.server.use(express.urlencoded({ extended: true })); // A opção "extended" diz para o express qual biblioteca ele deve utilizar para fazer o parsing do conteúdo das requisições que ele recebe
        this.server.use(express.json()); // dizemos que as nossas requisições sejam recebidas pelo servidor como json 

    }

    // router é método em que definiremos a routa par aservidor
    router() {

        // dizemos que a nossa aplicação usara as routas definidos pelo onjeto que importamos
        this.server.use(router); 

    }

}