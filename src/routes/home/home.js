const express = require('express')
const router = express.Router()
const conn = require('../../conection/conn')
require('dotenv').config()
const checkToken = require('../../token/token')

router.get('/',checkToken, (req, res)=>{
    const sql = 'SELECT * FROM post'

    conn.query(sql, (err, results) => {
        if(err)console.error(err)

        else if(results.length > 0){
            const post = results.map(post => ({
                id_post: post.id_post,
                data: post.data,
                conteudo: post.conteudo,
                imagem: post.imagem,
                nome_usuario: post.nome_usuario,
                id_user_post: post.id_user_post,
                nome_unidade_post: post.nome_unidade_post,
                nome_curso_post: post.nome_curso_post
            }))

            res.status(200).json({
                response: true,
                posts: post.reverse()
            })
        }
        else{
            res.status(400).json({
                response: false,
                message: "Ainda não existe post !"
            })
        }
    })
})

module.exports = router
