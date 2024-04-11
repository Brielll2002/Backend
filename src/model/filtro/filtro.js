const express = require('express')
const router = express.Router()
const checkToken = require('../../token/token')
const {filtro} = require('../../controller/filtro/FiltroController')

router.get('/:pg', checkToken,async (req, res)=>{
    const pagina = req.params.pg
    const {nome_unidade_post,nome_curso_post,turno} = req.body

    if((turno && !nome_curso_post) || (turno && !nome_unidade_post) || (nome_curso_post && !nome_unidade_post)){
        res.status(400).json({
            response: false,
            alert: "Para conseguir filtrar deve seguir a ordem: nome_unidade_post -> nome_curso_post -> turno."
        })
    }
    else{
        filtro(nome_unidade_post, nome_curso_post, turno, (err, results)=>{
            if(err){
                console.error(err)
    
                res.status(500).json({
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
            
                let paginas = [];
                const reverse = filtrar.reverse();
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
                        message: "Número de página errada. Verifique e tente novamente !",
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
                    message: "Ainda não há posts com essas características"
                })
            }
        })
    }
    }   
)
module.exports = router
