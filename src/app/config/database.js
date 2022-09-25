import pg from "pg"; // importamos o modulo postgres

// exportamos uma pool de banco dados 
export default new pg.Pool({

    // configurando o acesso ao banco de dados
    user: "postgres",  // definindo o usuario do banco de dados
    host: "localhost", // definindo qual ip de acesso ao servidor do postgresSQL
    database: "postgres", // definindo qual banco de dados será usado
    password: "postgres", // definindo a senha do banco de dados
    port: 5432 // definindo a porta de acesso que por padrão dos postgresSQL é 5432

})