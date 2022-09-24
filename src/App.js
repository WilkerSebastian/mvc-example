import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import path from "path"
import router from "./router.js";

export default class App {

    constructor() {

        this.server = express()
        this.middleware()
        this.router()

    }

    middleware() {

        this.server.use("/base64" , express.static(path.resolve("./node_modules/js-base64")))
        this.server.use("/jquery", express.static(path.resolve("./node_modules/jquery/dist")))
        this.server.use("/popperjs", express.static(path.resolve("./node_modules/@popperjs/core/dist/umd")))
        this.server.use("/bootstrap", express.static(path.resolve("./node_modules/bootstrap/dist")))
        this.server.use("/public", express.static(path.resolve("./src/app/public")))

        this.server.use(expressEjsLayouts)
        this.server.set('views', path.resolve("./src/app/views"));
        this.server.set('view engine', 'ejs');

        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(express.json());

    }

    router() {

        this.server.use(router);

    }

}