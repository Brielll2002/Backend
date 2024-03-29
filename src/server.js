const express = require('express')
const app = express()
const cors = require('cors')
const port = 3100
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())
app.use(express.json())

///////////
//IMPORTS//
///////////
const cadastro = require('./routes/cadastro/cadastro')
const cursosDisponiveis = require('./routes/cadastro/cursosDisponiveis')
const unidadesDisponiveis = require('./routes/cadastro/unidadeDisponiveis')
//
const post = require('./routes/criarPost/post')
//
const login = require('./routes/login/login')
//
const home = require('./routes/home/home')
//
const comentario = require('./routes/comentario/comentario')
//
const buscarComentario = require('./routes/comentario/buscarComentario')
///
const filtro = require('./routes/unidades/filtro')

////////////
//CADASTRO//
////////////
app.use('/register', cadastro)
app.use('/register/cursos', cursosDisponiveis)
app.use('/register/unidades', unidadesDisponiveis)
/////////
//LOGIN//
/////////
app.use('/login', login)
/////////
//POSTS//
/////////
app.use('/post', post)
////////
//HOME//
////////
app.use('/home', home)
//////////////
//COMENTARIO//
//////////////
app.use('/comentario', comentario)
app.use('/comentario/buscar', buscarComentario)
////
app.use('/filtro', filtro)

////////////////////////////////////////////////////////////
//PORTA
app.listen(port, (err)=>{
    if(err)console.error(err)

    console.log(`Aplicação rodando na porta: ${port}.`)
})