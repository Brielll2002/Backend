const express = require('express')
const app = express()
const cors = require('cors')
const port = 3100
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

///////////
//IMPORTS//
///////////
const notFound = require('../src/notFound/notFound')
//
const cadastro = require('./controller/cadastro/cadastro')
const cursosDisponiveis = require('./controller/cadastro/cursosDisponiveis')
const unidadesDisponiveis = require('./controller/cadastro/unidadeDisponiveis')
//
const post = require('./controller/post/post')
//
const login = require('./controller/login/login')
//
const home = require('./controller/home/home')
//
const comentario = require('./controller/comentario/comentario')
//
const filtro = require('./controller/filtro/filtro')
//
const perfil = require('./controller/perfil/perfil')


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
//////////
//FILTRO//
//////////
app.use('/filtro', filtro)
//////////
//PERFIL//
//////////
app.use('/perfil', perfil)
/////////////
//NOT FOUND//
/////////////
app.use('/', notFound)

////////////////////////////////////////////////////////////
//PORTA
app.listen(port, (err)=>{
    if(err)console.error(err)

    console.log(`Aplicação rodando na porta: ${port}.`)
})