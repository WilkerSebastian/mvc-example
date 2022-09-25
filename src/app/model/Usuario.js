import crypto from "crypto" // importamos o modulo crypto nos ajuda a encriptar 

/*

    Essa classe é um model responsavel por gerenciar e controlar a forma 
    como os dados se comportam por meio das funções, lógica e regras de negócios estabelecidas. 
    Ele é o detentor dos dados que recebe as informações do Controller, válida se ela está correta 
    ou não e envia a resposta mais adequada. 

*/
export default class Usuario {

    // cronstrutor da classe Usuario
    constructor(id, nome, email, cpf, data_nascimento, senha) {

        this.id = id
        this.nome = nome
        this.email = email
        this.cpf = cpf
        this.data_nascimento = data_nascimento
        this.senha = senha

    }

    // esse método serve para pegar o conteudo de um json e aplicar no 
    parse(json) {

        this.nome = json.nome
        this.email = json.email
        this.cpf = this.adjustmentCPF(json.cpf) // ajustamos o cpf antes de setamos
        this.data_nascimento = json.data_nascimento
        this.senha = this.encryptar(json.senha) // encriptamos a senha do ususario antes de setamos

    }

    adjustmentCPF(cpf) {

        if (cpf.length < 14) { // se o cpf ter um tamanho menor que 14 caracteres

            return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}` // adicionamos os . e - no cpf e retornamos ele

        }

        return cpf // retornamos o cpf

    }

    // função de encripatação
    encryptar(conteudo) {

        let iv = crypto.randomBytes(16) // bytes aletorios para crifra
        let key = '12345678123456781234567812345678'; // criano uma chave

        let cipher = crypto.createCipheriv('aes-256-cbc', key, iv); // criando um crifra usando o algoritimo aes-256-cbc
        let encrypted = cipher.update(conteudo, 'utf-8', 'hex'); // encriptamos o conteudo em forma hexadecimal

        encrypted += cipher.final('hex'); // juntamos a mensagem encriptada com a cifra

        return encrypted // retornando o conteudo encriptado

    }


}