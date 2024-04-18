const express = require('express')
const app = express()
app.use(express.json())
const {gerarToken} = require('../../token/token')
require('dotenv').config()
const {pesquisarUsuario} = require('../../model/login/LoginModel')


app.post('/', async (req, res)=>{
    const {nome, matricula, senha} = req.body

    if(!nome || !matricula || !senha){
        res.status(400).json({
            response: false,
            message: "Preencha todos os campos !"
        })
    }
    else if(matricula.length != 8){
        res.status(400).json({
            response: false,
            message: "A matrícla está incorreta !"
        })
    }
    else{
        pesquisarUsuario(nome, matricula, senha, function(err, results){
            if(err){
                console.error(err)
                res.status(500).json({
                    response: false,
                    message: "Erro interno. Tente novamente mais tarde !"
                })
            }
            else if(results && results.length > 0){
                const token =  gerarToken(results[0].id)
                
                res.status(200).json({
                    response: true,
                    message: "Login realizado com sucesso !",
                    user: {
                        id: results[0].id_user,
                        nome: results[0].nome,
                        sobrenome: results[0].sobrenome,
                        amigos: results[0].amigos,
                        turno: results[0].turno,
                        matricula: results[0].matricula,
                        data: results[0].data,
                        curso: results[0].nome_curso,
                        unidade: results[0].nome_unidade
                    },
                    key: {
                        token: token
                    }
                })
            }
            else{
                res.status(400).json({
                    response: false,
                    message: "Conta não existente. Faça seu cadastro e tente novamente !"
                })
            }
        })
    }  
})

module.exports = app