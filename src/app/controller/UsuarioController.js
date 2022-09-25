import Usuario from "../model/Usuario.js"; // importamos a classe model Usuario
import db from "../config/database.js" // importamos a pool do banco de dados
import nodemailer from "nodemailer" // importamos o modulo que nos permite enviar emails
import { Base64 } from "js-base64"; // importamos a classe Base64

/*

    A camada de controle é responsável por intermediar as requisições enviadas 
    pelo View com as respostas fornecidas pelo Model, processando os dados que 
    o usuário informou e repassando para outras camadas. 

*/
class UsuarioController { 

    // método que só manda a pagina cadastro.ejs
    cadastrar(req, res) {

        res.render("cadastro") // res.render(arquivo) é para dar como resposta da requisição vamos renderizar o cadastro.ejs

    }

    // método assicrono que cria um usuario no banco de dados e envia um email para pessoa cadastrada
    async criar(req, res) {

        const user = new Usuario() // criamos um nvo usuario
        user.parse(req.body) // passamos o nosso formulario em formato json para o método que vai pegar os valores e setar no objeto

        // fazemos um insert dizemos para o processador ir executar outra coisa enquanto experamos a resposta do banco de dados
        await db.query(`INSERT INTO
        usuario(nome, email, cpf, data_nascimento, senha)
        VALUES ('${user.nome}', '${user.email}', '${user.cpf}', '${user.data_nascimento}', '${user.senha}')`)
            .then(() => { // caso o banco de dados responda que deu tudo certo

                // criamos um mensageiro de email com as especificações a seguir
                const transporter = nodemailer.createTransport({
                    service: 'gmail', // o serviço de email usado será o gmail
                    auth: { // autenticação do mensageiro
                        user: 'insecuredev69@gmail.com', // especificamos o usuario email
                        pass: 'wigjzlruszoycesr' // e qual é a senha de login
                    }
                });

                const mailOptions = { // preparamos um email para enviar
                    from: 'MVC <insecuredev69@gmail.com>', // from é quem está enviando o email
                    to: user.email, // to é quem vai receber esse email no caso usuario
                    subject: 'REGISTRO NO MVC EXAMPLE', // assunto do email
                    text: 'Obrigado por se registrar no MVC example :)' // conteudo do email
                };

                transporter.sendMail(mailOptions) // e mandamos o email
                    .catch((err) => { // caso ocorra um erro no envio, recebemos um objeto de erro

                        console.log("erro no email " + err); // mostramos qual é o erro

                    })

                res.redirect("/user/list") // redirecionamos para URL de lista

            })
            .catch((err) => { // caso ocorra um erro no registro do banco de dados

                console.log("erro no insert " + err); // mostramos qual é o erro  
                res.redirect("/user/create") // redirecionamos de volta para o formulario

            })

    }

    // método assicrono que lista os usuarios no banco de dados
    async listar(req, res) {

        // fazemos um select dizemos para o processador ir executar outra coisa enquanto experamos a resposta do banco de dados
        await db.query(`SELECT id, nome, email, cpf,to_char(data_nascimento , 'DD/MM/YYYY') as data_nascimento
        FROM usuario ORDER BY ID ASC;`)
            .then((tables) => { // caso ocorra corretamente o select iremos pegar o resultado com o paramêtro tables

                // res.render(arquivo , objeto) é para dar como resposta da requisição vamos renderizar o cadastro.ejs e enviar um obejto
                res.render("lista", { usuarios: tables.rows }) // rows serve para fazer que uma tabela se torne um array

            })
            .catch((err) => { // caso ocorra erro no select

                console.log("erro: " + err); // mostrar o erro
                res.render("lista") // renderizar sem o array

            })

    }

    // método assicrono para mostrar o cadastro de edição
    async edit(req , res) {

        // req.params serve para pegar o atributos que foram passados na URL
        const id = Number(Base64.decode(req.params.id)) // como recebemos o id encriptado em base64 precisamos desencriptar

        // fazemos um select dizemos para o processador ir executar outra coisa enquanto experamos a resposta do banco de dados com where
        await db.query(`SELECT nome, email, cpf, to_char(data_nascimento , 'yyyy-MM-dd') as data_nascimento FROM usuario WHERE id = ${id};`)
        .then((tebles) => { // caso ocorra corretamente o select iremos pegar o resultado com o paramêtro tables

            const usuario = tebles.rows[0] // pegamos o primeiro elemento do array e salvamos ele na variável usuario

            // res.render(arquivo , objeto) é para dar como resposta da requisição vamos renderizar o editar.ejs e enviar um obejto usuario e o id
            res.render("editar" , {usuario , id:req.params.id})

        })
        .catch((err) => { // caso ocorra um  erro no select

            console.log("erro select editar " + err); // mostrar o erro
            res.redirect("/user/list") // redireciona de volta pra lista

        })

    }

    // método assicrono para realizar alteração do usuario
    async editar(req , res) {

        // req.params serve para pegar o atributos que foram passados na URL
        const id = Number(Base64.decode(req.params.id)) // como recebemos o id encriptado em base64 precisamos desencriptar

        const user = new Usuario() // criamos um nvo usuario
        user.parse(req.body) // passamos o nosso formulario em formato json para o método que vai pegar os valores e setar no objeto        
        
         // fazemos um update dizemos para o processador ir executar outra coisa enquanto experamos a resposta do banco de dados
        await db.query(`UPDATE usuario
        SET nome='${user.nome}', email='${user.email}', cpf='${user.cpf}', data_nascimento='${user.data_nascimento}', senha='${user.senha}'
        WHERE id = ${id};`)
        .then(() => { // caso ocorra tudo certo no update

            res.redirect("/user/list") // redirecionamos para a lista

        })
        .catch((err) => { // caso ocorra um erro

            console.log("erro no update " + err); // mostrar o erro
            res.redirect(`/user/edit/${req.params.id}`) // redirecia de volta para o cadastro de edição

        })

    }

    // método assicrono para deletar o usuario
    async deletar(req, res) {

        // req.params serve para pegar o atributos que foram passados na URL
        const id = Number(Base64.decode(req.params.id)) // como recebemos o id encriptado em base64 precisamos desencriptar

         // fazemos um delete dizemos para o processador ir executar outra coisa enquanto experamos a resposta do banco de dados
        await db.query(`DELETE FROM usuario
        WHERE id = ${id};`)
            .then(() => res.redirect("/user/list")) // se acontecer tudo certo redireciona para lista 
            .catch((err) => { // caso ocorra um erro

                console.log("erro " + err) // mostrar o erro
                res.redirect("/user/list") // redireicona para a lista

            })

    }

}

export default new UsuarioController() // exportamos um novo objeto controller