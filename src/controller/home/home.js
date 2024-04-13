const express = require('express')
const router = express.Router()
require('dotenv').config()
const checkToken = require('../../token/token')
const {home} = require('../../model/home/HomeModel')

router.get('/:pg',checkToken, async (req, res)=>{

    const pagina = req.params.pg

    home((err, results) => {
        if(err){
            console.error(err)
            res.status(500).json({
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

            let paginas = [];
            const reverse = post.reverse();
            let arr = [];
            let count = 0;
            const base = 4;

            for(let c = 0; c < reverse.length; c++){
                if(c == (count + base)){
                    paginas.push(arr)
                    count = c
                    arr=[]
                }
                else{
                    arr.push(reverse[c])
                }
            }

            if(Number(pagina) < 1 || Number(pagina) > paginas.length){
                res.status(400).json({
                    response: false,
                    alert: "Número de página errada. Verifique e tente novamente !",
                    primeriapag: paginas.length > 0 ? 1 : 0,
                    qtdpag: paginas.length
                })
            }
            else{
                res.status(200).json({
                    response: true,
                    qtdpag: paginas.length,
                    pagatual: Number(pagina),
                    posts: paginas[Number(pagina)-1]
                })
            }
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
