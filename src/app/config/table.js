import db from "./database.js";

console.log("criando tabela...");

db.query(`

CREATE TABLE IF NOT EXISTS public.usuario
(
    id serial primary key,
    nome character varying(200) COLLATE pg_catalog."default" NOT NULL,
    email character varying(200) COLLATE pg_catalog."default" NOT NULL,
    cpf character varying(14) COLLATE pg_catalog."default" NOT NULL,
    data_nascimento date NOT NULL,
    senha character varying(200) COLLATE pg_catalog."default" NOT NULL
)

`)
.then(() => console.log("tabela criada com sucesso!"))
.catch(err => console.log("erro ao criar a tabela " + err))