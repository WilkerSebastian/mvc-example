import Usuario from "../model/Usuario.js";
import db from "../config/config.js"
import nodemailer from "nodemailer"
import { Base64 } from "js-base64";

class UsuarioController {

    cadastrar(req, res) {

        res.render("cadastro")

    }

    async criar(req, res) {

        let user = new Usuario()
        user.parse(req.body)

        await db.query(`INSERT INTO
        usuario(nome, email, cpf, data_nascimento, senha)
        VALUES ('${user.nome}', '${user.email}', '${user.cpf}', '${user.data_nascimento}', '${user.senha}')`)
            .then(() => {

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'insecuredev69@gmail.com',
                        pass: 'wigjzlruszoycesr'
                    }
                });

                const mailOptions = {
                    from: 'MVC <insecuredev69@gmail.com>',
                    to: user.email,
                    subject: 'REGISTRO NO MVC EXAMPLE',
                    text: 'Obrigado por se registrar no MVC example :)'
                };

                transporter.sendMail(mailOptions)
                    .catch((err) => {

                        console.log("erro no email: " + err);

                    })

                res.redirect("/user/list")

            })
            .catch((err) => {

                console.log("erro: " + err);
                res.redirect("/user/create")

            })

    }

    async listar(req, res) {

        await db.query(`SELECT id, nome, email, cpf,to_char(data_nascimento , 'DD/MM/YYYY') as data_nascimento, senha
        FROM usuario ORDER BY ID ASC;`)
            .then((array) => {

                res.render("lista", { usuarios: array.rows })

            })
            .catch((err) => {

                console.log("erro: " + err);
                res.render("lista")

            })

    }

    async deletar(req, res) {

        const id = Number(Base64.decode(req.params.id))

        await db.query(`DELETE FROM usuario
        WHERE id = ${id};`)
            .then(() => res.redirect("/user/list"))
            .catch((err) => {

                console.log("erro " + err)
                res.redirect("/user/list")

            })

    }

}

export default new UsuarioController()