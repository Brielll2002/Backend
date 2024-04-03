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
const cadastro = require('./model/cadastro/cadastro')
const cursosDisponiveis = require('./model/cadastro/cursosDisponiveis')
const unidadesDisponiveis = require('./model/cadastro/unidadeDisponiveis')
//
const post = require('./model/criarPost/post')
//
const login = require('./model/login/login')
//
const home = require('./model/home/home')
//
const comentario = require('./model/comentario/comentario')
const buscarComentario = require('./model/comentario/buscarComentario')
//
const filtro = require('./model/filtro/filtro')
//
const perfil = require('./model/perfil/perfil')

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
//////////
//FILTRO//
//////////
app.use('/filtro', filtro)
//////////
//PERFIL//
//////////
app.use('/perfil', perfil)

////////////////////////////////////////////////////////////
//PORTA
app.listen(port, (err)=>{
    if(err)console.error(err)

    console.log(`Aplicação rodando na porta: ${port}.`)
})