const express = require('express')
const router = express.Router()
require('dotenv').config()
const checkToken = require('../../token/token')
const resData = new Date()
const data = resData.toISOString().split('T')[0]
const {criarPost, mudarQuantidadeDePostEmUnidades, mudarQuantidadeDePostEmCurso} = require('../../controller/post/PostController')

router.post('/', checkToken, async (req, res)=>{
    const {imagem, conteudo, nome_usuario, nome_curso_post, nome_unidade_post, id_user_post, turno} = req.body

    if(!nome_usuario || !nome_unidade_post || !nome_curso_post || !id_user_post || !conteudo || !turno){
        res.status(400).json({
            response: false,
            message: "Dados importante estão faltando para a criação do post !"
        })
    }
    else{
        criarPost(imagem, conteudo, nome_usuario, nome_curso_post, nome_unidade_post, id_user_post, data, turno, function(err){
            if(err){
                console.error(err)
                res.status(500).json({
                    response: false,
                    message: "Erro ao publicar post. Tente novamente mais tarde !"
                })
            }
            else{
                try {
                    //Mudar a quantidade de post na unidade
                    mudarQuantidadeDePostEmUnidades(nome_unidade_post, (err, results) => {
                        if(err){console.error(err)}
                    })

                    //Mudar a quantidade de post no curso
                    mudarQuantidadeDePostEmCurso(nome_curso_post, (err, results)=>{
                        if(err){
                            console.error(err)
                        }
                    })

                    res.status(200).json({
                        response: true,
                        message: "Post publicado com sucesso !"
                    })
                } 
                catch (error) {
                    res.status(400).json({
                        response: false,
                        message: "Erro interno. Tente novamente mais tarde ! "
                    })
                }
            }
        })
    }
})

module.exports = router