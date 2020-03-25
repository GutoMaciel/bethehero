const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);

// Tipos de parametros
// Query Params: Parâmetros nomeados enviados na rota apos o ? para filtros, paginacao
// Route Params: Parametros utilizados para identificar recursos
// Request Body: Corpo da requisicao utilizado para cirar ou alterar recursos

// metodos http
// GET = buscar ou listar uma informa'cão do backend
// POST: Criar uma informa'cão no back-end
/// PUT: alterar uma informa'cao no back-end
// DELETE" Beletar uma informa'cão no backend

// sql: mysql, sqlite, postgressql, oracle, microsoft
// nosql: mongodb

//entidades. O que são? tudo aquilo que sera salvo no banco de dados.
// ongs
// incidents


// funcionlidades
// ONGS login
// ONGS logout
// ONGS subscribes
// subscribe new incidents
// delete incidents
// index incidents especificos
// index all incidents
// contact ongs

// migrations: uma forma de criar tabelas  e manter um historico das tabelas criadas, alteradas. um controle de versao do banco de dados.

//caso erre em uma tabela no banco de dados, o que deve fazer? 
// roll back usando o comando npx knex migrate:rollback