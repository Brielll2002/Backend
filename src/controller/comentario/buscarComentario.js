const express = require('express')
const app = express()
require('dotenv').config()
const {checkToken} = require('../../token/token')
const {buscarComentarios} = require('../../model/comentario/BuscarComentarioModel')

app.get('/:id', checkToken, async (req, res)=>{

    const id_post_comentario = req.params.id

    if(!id_post_comentario){
        res.status(400).json({
            response: false,
            message: "Respostas não encontradas !"
        })
    }
    else{
        buscarComentarios(id_post_comentario, (err, results)=>{
            if(err){
                console.error(err)

                res.status(500).json({
                    response: false,
                    message: "Erro ao procurar respostas. Tente novamente mais tarde !"                
                })
            }
            else{
                if(results.length > 0){
                    const comentarios = results.map((comentario)=>({
                        id_comentario: comentario.id_comentario,
                        conteudo: comentario.conteudo,
                        data: comentario.data,
                        nome: comentario.nome,
                        id_user_comentario: comentario.id_user_comentario,
                        id_post_comentario: comentario.id_post_comentario
                    }))

                    res.status(200).json({
                        response: true,
                        comentarios: comentarios
                    })
                }
                else{
                    res.status(200).json({
                        response: false,
                        message: "Seja o primeiro(a) a comentar !"                
                    })
                }
            }
    })
    }
})

module.exports = app