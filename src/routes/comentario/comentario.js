const express = require('express')
const router = express.Router()
const conn = require('../../conection/conn')
require('dotenv').config()
const checkToken = require('../../token/token')
const resData = new Date()
const data = resData.toISOString().split('T')[0]

router.post('/', checkToken, async (req, res)=>{
    const {conteudo, nome, id_user_comentario, id_post_comentario} = req.body

    if(!conteudo || !nome || !id_user_comentario || !id_post_comentario){
        res.status(400).json({
            response: false,
            message: "Dados importante estão faltando para a criação da resposta !"
        })
    }
    else{
        const sql = 'INSERT INTO comment (conteudo, data, nome, id_user_comentario, id_post_comentario) VALUES (?,?,?,?,?)'

        conn.query(sql, [conteudo, data, nome, id_user_comentario, id_post_comentario], (err, results)=>{
            if(err){
                console.error(err)

                res.status(400).json({
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

module.exports = router