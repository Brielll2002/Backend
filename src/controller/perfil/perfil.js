const express = require('express')
const app = express()
app.use(express.json())
const {checkToken} = require('../../token/token')
const {perfil} = require('../../model/perfil/PerfilModel')
const {editarPerfil} = require('../../model/perfil/EditarPerfilModel')

app.get('/:id', checkToken, async (req, res)=>{
    const id = req.params.id
    perfil(id, (err, results)=>{
        if(err){
            console.error(err)
            res.status(500).json({
                response: false,
                message: "Erro interno. Tente novamente mais tarde !"
            })
        }
        else{
            res.status(200).json({
            response: true,
            message: `Seja bem-vindo(a) ao seu perfil, ${results[1][0].nome} !`,
            perfil: results[1][0],
            posts: results[0].reverse()
            })
        }
    })
})

app.put('/:id', checkToken, async(req, res)=>{
    const id = req.params.id
    const {senha, turno, matricula, nome_curso, nome_unidade} = req.body

    if(!senha || !turno || !matricula || !nome_curso || !nome_unidade){
        res.status(400).json({
            response: false,
            alert: "Todos os campos devem ser preenchidos para concluir a atualização. Caso não queria atualizar um campo, coloque seu valor atual."
        })
    }
    else if(matricula.length != 8){
        res.status(400).json({
            response: false,
            message: "A matrícula está incorreta !"
        })
    }
    else{
        editarPerfil(senha, turno, matricula, nome_curso, nome_unidade, id, function(err, results){
            if(err){
                console.error(err)
                res.status(500).json({
                    response: false,
                    message: "Erro interno. Tente novamente mais tarde !"
                })
            }
            else{
                res.status(200).json({
                    response: true,
                    messsage: "Perfil atualizado com sucesso !"
                })
            }
        })
    }
})

module.exports = app