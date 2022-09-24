CREATE TABLE IF NOT EXISTS public.usuario
(
    id serial primary key,
    nome character varying(200) COLLATE pg_catalog."default" NOT NULL,
    email character varying(200) COLLATE pg_catalog."default" NOT NULL,
    cpf character varying(14) COLLATE pg_catalog."default" NOT NULL,
    data_nascimento date NOT NULL,
    senha character varying(200) COLLATE pg_catalog."default" NOT NULL,
)