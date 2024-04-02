const express = require('express')
const router = express.Router()
const conn = require('../../conection/conn')
require('dotenv').config()
const checkToken = require('../../token/token')

router.post('/', checkToken, async (req, res)=>{

    const {id_post_comentario} = req.body

    if(!id_post_comentario){
        res.status(400).json({
            response: false,
            message: "Respostas não encontradas !"
        })
    }
    else{
        const sql = 'SELECT * FROM comment WHERE id_post_comentario = ?'

        conn.query(sql, [id_post_comentario], (err, results)=>{
            if(err){
                console.error(err)

                res.status(400).json({
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
                        respostas: comentarios
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

module.exports = router