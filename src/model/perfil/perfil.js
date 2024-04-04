const express = require('express')
const router = express.Router()
const conn = require('../../conection/conn')
const checkToken = require('../../token/token')


router.get('/:id', checkToken, async (req, res)=>{
    const id = req.params.id
    const sql = 'SELECT * FROM post WHERE id_user_post = ?'
    const sql2 = 'SELECT * FROM user WHERE id_user = ?'

    let posts;
    conn.query(sql, [id], (err, results)=>{
        if(err){
            console.error(err)
        }
        else{
            posts = results.map((post)=>({
                id_post: post.id_post,
                data: post.data,
                conteudo: post.conteudo,
                imagem: post.imagem,
                nome_usuario: post.nome_usuario,
                id_user_post: post.id_user_post,
                nome_unidade_post: post.nome_unidade_post,
                nome_curso_post: post.nome_curso_post
            }))
        }
    })
    conn.query(sql2, [id], (err, results)=>{
        if(err){
            console.error(err)
            res.status(400).json({
                response: false,
                message: "Erro interno. Tente novamente mais tarde !"
            })
        }
        else if(results.length == 0){
            res.status(400).json({
                response: false,
                message: "Dados do perfil não encontrados !"
            })
        }
        else{
            const dados = results.map((dados)=>({
                id_user: dados.id_user,
                nome: dados.nome,
                sobrenome: dados.sobrenome,
                amigos: dados.amigo,
                turno: dados.turno,
                matricula: dados.matricula,
                data: dados.data,
                nome_curso: dados.nome_curso,
                nome_unidade:dados.nome_unidade
            }))

            res.status(200).json({
                response: true,
                message: `Seja bem-vindo(a) ao seu perfil, ${dados[0].nome} !`,
                perfil: dados[0],
                posts: posts
            })
        }
    })
})

module.exports = router