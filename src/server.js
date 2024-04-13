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
const cadastro = require('./controller/cadastro/cadastro')
const cursosDisponiveis = require('./controller/cadastro/cursosDisponiveis')
const unidadesDisponiveis = require('./controller/cadastro/unidadeDisponiveis')
//
const post = require('./controller/post/post')
const delPost = require('./controller/post/excluirPost')
//
const login = require('./controller/login/login')
//
const home = require('./controller/home/home')
//
const comentario = require('./controller/comentario/comentario')
const buscarComentario = require('./controller/comentario/buscarComentario')
//
const filtro = require('./controller/filtro/filtro')
//
const perfil = require('./controller/perfil/perfil')
const editarPerfil = require('./controller/perfil/editarPerfil')

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
app.use('/post/delete', delPost)
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
app.use('/perfil/editar', editarPerfil)

////////////////////////////////////////////////////////////
//PORTA
app.listen(port, (err)=>{
    if(err)console.error(err)

    console.log(`Aplicação rodando na porta: ${port}.`)
})