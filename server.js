const express = require('express')
const app = express()
const cors = require('cors')
const port = 3100

app.use(express.urlencoded({
    extended: true
}))
app.use(cors())
app.use(express.json())

//CADASTRO
const cadastro = require('./routes/cadastro/cadastro')
app.use('/register', cadastro)

const cursosDisponiveis = require('./routes/cadastro/cursosDisponiveis')
app.use('/register/cursos', cursosDisponiveis)

const unidadesDisponiveis = require('./routes/cadastro/unidadeDisponiveis')
app.use('/register/unidades', unidadesDisponiveis)

//LOGIN
const login = require('./routes/login/login')
app.use('/login', login)

//POST
const post = require('./routes/criarPost/post')
app.use('/post', post)

//HOME
const home = require('./routes/home/home')
app.use('/home', home)

//|-----------------------------------|
//PORTA
app.listen(port, (err)=>{
    if(err)console.error(err)

    console.log(`Aplicação rodando na porta: ${port}.`)
})