const express = require('express')
const router = express.Router()
require('dotenv').config()
const checkToken = require('../../token/token')
const {home} = require('../../controller/home/HomeController')

router.get('/',checkToken, async (req, res)=>{
    home((err, results) => {
        if(err){
            console.error(err)
            res.status(400).json({
                response: false,
                message: "Erro interno. Tente novamente mais tarde !"
            })
        }
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
