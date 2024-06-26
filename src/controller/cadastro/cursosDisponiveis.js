const express = require('express')
const app = express()
const {cursosDisponiveis} = require('../../model/cadastro/HelpCadastroModel')

app.get('/', async (req, res)=>{
    cursosDisponiveis(function(err, results){
        if(err){
            console.error(err)

            res.status(500).json({
                response: false,
                message: "Ocorreu um erro, tente novamente mais tarde !"
            })
        }
        else if(results.length == 0){
            res.status(200).json({
                response: true,
                message: "Ainda não há curso cadastrado, adicione o seu curso !"
            })
        }
        else{
            const cursos = results.map(cursos => ({
                id_curso: cursos.id_curso,
                nome_curso: cursos.nome_curso
            }))

            res.status(200).json({
                response: true,
                cursos: cursos
            })
        }
    })
})

module.exports = app