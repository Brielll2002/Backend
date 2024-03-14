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
const cadastro = require('./routes/cadastro')
app.use('/register', cadastro)

//LOGIN
const login = require('./routes/login')
app.use('/login', login)

//POST
const post = require('./routes/post')
app.use('/post', post)

//HOME
const home = require('./routes/home')
app.use('/home', home)

//|-----------------------------------|
//PORTA
app.listen(port, (err)=>{
    if(err)console.error(err)

    console.log(`Aplicação rodando na porta: ${port}.`)
})