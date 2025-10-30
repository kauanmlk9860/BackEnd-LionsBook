/*************************************************************************************************
 * OBJETIVO: API referente ao projeto BIBLIOTECA
 * DATA: 30/10/2025
 * AUTOR: Kauan de Assis Leonel Rodrigues
 * VERSÃO: 1.0
 *================================================================================================ 
 * 
 * OBSERVAÇÃO:
 * 
 * ****************** Para configurar e instalar a API, precisamos das seguintes bibliotecas:
 *                      -> express          npm install express --save
 *                      -> cors             npm install cors --save
 *                      -> body-parser      npm install body-parser --save
 * 
 * ****************** Para configurar e Instalar o acesso remoto ao Banco de Dados precisamos:
 *                      -> prisma          npm install prisma --save (conexão com o BD)
 *                      -> prisma/client   npm install @prisma/client --save (Executa scripts no BD)
 * 
 * ******************* Após a instalação do prisma e do prisma/client, devemos:
 * 
 *                     npx prisma init (Inicializar o prisma no projeto)
 * 
 * ******************* Para realizar o sincronismo do prisma com o BD, devemos executar o seguinte comando:
 * 
 *                     npx prisma migrate dev                   
 * 
 *************************************************************************************************/

//Import das bibliotecas para criar a API
const express    = require('express')
const cors       = require('cors')
const bodyParser = require('body-parser')

//Import das controllers para realizar o CRUD de dados
const controllerUsuario         = require('./src/controllers/UsuarioController')
const controllerLivro           = require('./src/controllers/LivroController')
const controllerTipoMovimentacao = require('./src/controllers/TipoMovimentacaoController')
const controllerMovimentacao    = require('./src/controllers/MovimentacaoController')

//Estabelecendo o formato de dados que deverá chegar no body da requisição (POST ou PUT)
const bodyParserJson = bodyParser.json()

//Cria o objeto app para criar a API
const app = express()

//Configuração do cors   
app.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')

    app.use(cors())
    app.use(express.json())
    next()
})

/*************************************************************************************************
 *                                      ENDPOINTS USUÁRIO
 *************************************************************************************************/
// Inserir novo usuário
app.post('/v1/biblioteca/usuario', cors(), bodyParserJson, async function(request, response){
    let contentType = request.headers['content-type']
    let dadosBody   = request.body
    let result      = await new controllerUsuario().criar(request, response)
})

// Listar todos os usuários
app.get('/v1/biblioteca/usuario', cors(), async function(request, response){
    let result = await new controllerUsuario().buscarTodos(request, response)
})

// Buscar um usuário por ID
app.get('/v1/biblioteca/usuario/:id', cors(), async function(request, response){
    let result = await new controllerUsuario().buscarPorId(request, response)
})

// Atualizar um usuário por ID
app.put('/v1/biblioteca/usuario/:id', cors(), bodyParserJson, async function(request, response){
    let result = await new controllerUsuario().atualizar(request, response)
})

// Excluir um usuário por ID
app.delete('/v1/biblioteca/usuario/:id', cors(), async function(request, response){
    let result = await new controllerUsuario().deletar(request, response)
})

/*************************************************************************************************
 *                                      ENDPOINTS LIVRO
 *************************************************************************************************/
// Inserir novo livro
app.post('/v1/biblioteca/livro', cors(), bodyParserJson, async function(request, response){
    let result = await new controllerLivro().criar(request, response)
})

// Listar todos os livros
app.get('/v1/biblioteca/livro', cors(), async function(request, response){
    let result = await new controllerLivro().buscarTodos(request, response)
})

// Buscar livros por título
app.get('/v1/biblioteca/livro/buscar', cors(), async function(request, response){
    let result = await new controllerLivro().buscarPorTitulo(request, response)
})

// Buscar um livro por ID
app.get('/v1/biblioteca/livro/:id', cors(), async function(request, response){
    let result = await new controllerLivro().buscarPorId(request, response)
})

// Atualizar um livro por ID
app.put('/v1/biblioteca/livro/:id', cors(), bodyParserJson, async function(request, response){
    let result = await new controllerLivro().atualizar(request, response)
})

// Excluir um livro por ID
app.delete('/v1/biblioteca/livro/:id', cors(), async function(request, response){
    let result = await new controllerLivro().deletar(request, response)
})

/*************************************************************************************************
 *                                  ENDPOINTS TIPO MOVIMENTAÇÃO
 *************************************************************************************************/
// Inserir novo tipo de movimentação
app.post('/v1/biblioteca/tipo-movimentacao', cors(), bodyParserJson, async function(request, response){
    let result = await new controllerTipoMovimentacao().criar(request, response)
})

// Listar todos os tipos de movimentação
app.get('/v1/biblioteca/tipo-movimentacao', cors(), async function(request, response){
    let result = await new controllerTipoMovimentacao().buscarTodos(request, response)
})

// Buscar um tipo de movimentação por ID
app.get('/v1/biblioteca/tipo-movimentacao/:id', cors(), async function(request, response){
    let result = await new controllerTipoMovimentacao().buscarPorId(request, response)
})

// Atualizar um tipo de movimentação por ID
app.put('/v1/biblioteca/tipo-movimentacao/:id', cors(), bodyParserJson, async function(request, response){
    let result = await new controllerTipoMovimentacao().atualizar(request, response)
})

// Excluir um tipo de movimentação por ID
app.delete('/v1/biblioteca/tipo-movimentacao/:id', cors(), async function(request, response){
    let result = await new controllerTipoMovimentacao().deletar(request, response)
})

/*************************************************************************************************
 *                                      ENDPOINTS MOVIMENTAÇÃO
 *************************************************************************************************/
// Inserir nova movimentação
app.post('/v1/biblioteca/movimentacao', cors(), bodyParserJson, async function(request, response){
    let result = await new controllerMovimentacao().criar(request, response)
})

// Listar todas as movimentações
app.get('/v1/biblioteca/movimentacao', cors(), async function(request, response){
    let result = await new controllerMovimentacao().buscarTodos(request, response)
})

// Buscar movimentações por período
app.get('/v1/biblioteca/movimentacao/periodo', cors(), async function(request, response){
    let result = await new controllerMovimentacao().buscarPorPeriodo(request, response)
})

// Buscar movimentações por usuário
app.get('/v1/biblioteca/movimentacao/usuario/:idUsuario', cors(), async function(request, response){
    let result = await new controllerMovimentacao().buscarPorUsuario(request, response)
})

// Buscar movimentações por livro
app.get('/v1/biblioteca/movimentacao/livro/:idLivro', cors(), async function(request, response){
    let result = await new controllerMovimentacao().buscarPorLivro(request, response)
})

// Buscar uma movimentação por ID
app.get('/v1/biblioteca/movimentacao/:id', cors(), async function(request, response){
    let result = await new controllerMovimentacao().buscarPorId(request, response)
})

// Atualizar uma movimentação por ID
app.put('/v1/biblioteca/movimentacao/:id', cors(), bodyParserJson, async function(request, response){
    let result = await new controllerMovimentacao().atualizar(request, response)
})

// Excluir uma movimentação por ID
app.delete('/v1/biblioteca/movimentacao/:id', cors(), async function(request, response){
    let result = await new controllerMovimentacao().deletar(request, response)
})

/*************************************************************************************************
 *                                      INICIANDO SERVIDOR
 *************************************************************************************************/
const PORT = process.env.PORT || 8080
app.listen(PORT, function(){
    console.log(`API BIBLIOTECA rodando na porta ${PORT}`)
})

module.exports = app
