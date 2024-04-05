const express = require('express')
const router = express.Router()
const checkToken = require('../../token/token')
const {filtro} = require('../../controller/filtro/FiltroController')

router.get('/', checkToken,async (req, res)=>{
    const {nome_unidade_post,nome_curso_post,turno} = req.body

    filtro(nome_unidade_post, nome_curso_post, turno, (err, results)=>{
            if(err){
                console.error(err)
    
                res.status(400).json({
                    response: false,
                    message: 'Ocorreu um erro, por favor tente mais tarde !'
                })
            }
            if(results.length > 0){
                const filtrar = results.map(filtrar =>({
                    id_post: filtrar.id_post,
                    data : filtrar.data,
                    conteudo : filtrar.conteudo,
                    imagem : filtrar.imagem,
                    nome_usuario : filtrar.nome_usuario,
                    id_user_post : filtrar.id_user_post,
                    nome_unidade_post : filtrar.nome_unidade_post,
                    nome_curso_post : filtrar.nome_curso_post,
                    turno: filtrar.turno
                }))
            
                res.status(200).json({
                    response: true,
                    posts: filtrar.reverse()
                })
            }
            else{
                res.status(400).json({
                    response: false,
                    message: "Ainda não há posts com essas características"
                })
            }
        })
    }   
)
module.exports = router
