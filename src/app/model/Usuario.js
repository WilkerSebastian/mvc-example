import crypto from "crypto"

export default class Usuario {

    constructor(id, nome, email, cpf, data_nascimento, senha) {

        this.id = id
        this.nome = nome
        this.email = email
        this.cpf = cpf
        this.data_nascimento = data_nascimento
        this.senha = senha

    }

    parse(json) {

        this.nome = json.nome
        this.email = json.email
        this.cpf = json.cpf
        this.data_nascimento = json.data_nascimento
        this.senha = this.encryptar(json.senha)

    }

    encryptar(conteudo) {

        let iv = crypto.randomBytes(16)
        let key = '12345678123456781234567812345678';

        let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
        let encrypted = cipher.update(conteudo , 'utf-8', 'hex');

        encrypted += cipher.final('hex');

        return encrypted

    }


}