const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()
const {checkToken} = require('../../token/token')
const resData = new Date()
const data = resData.toISOString().split('T')[0]
const {postarComentario} = require('../../model/comentario/ComentarioModel')
const {buscarComentarios} = require('../../model/comentario/BuscarComentarioModel')

app.post('/', checkToken, async (req, res)=>{
    const {conteudo, nome, id_user_comentario, id_post_comentario} = req.body

    if(!conteudo || !nome || !id_user_comentario || !id_post_comentario){
        res.status(400).json({
            response: false,
            message: "Dados importante estão faltando para a criação da resposta !"
        })
    }
    else{
        postarComentario(conteudo, data, nome, id_user_comentario, id_post_comentario, (err, results)=>{
            if(err){
                console.error(err)

                res.status(500).json({
                    response: false,
                    message: "Erro ao publiucar comentário. Tente novamente mais tarde !"
                })
            }
            else{
                res.status(200).json({
                    response: true,
                    message: "Resposta publicada com sucesso !"
                })
            }
        })
    }

})

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