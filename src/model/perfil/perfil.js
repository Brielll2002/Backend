const express = require('express')
const router = express.Router()
const conn = require('../../conection/conn')


router.post('/', async (req, res)=>{
    const id = req.body
    const sql = 'SELECT * FROM post WHERE id_user_post = ?'
    const sql2 = 'SELECT * FROM user WHERE id_user = ?'

    let posts;
    conn.query(sql, [id], (err, results)=>{
        if(err){
            console.error(err)
            res.status(400).json({
                responde: false,
                message: "Erro. Dados não encontrados!"
            })
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
                message: "Erro. Dados do perfil não encontrado !"
            })
        }
        else{
            const dados = results.map((dados)=>({
                id_user: dados.id_user,
                nome: dados.nome,
                sobrenome: dados.sobrenome,
                senha: dados.senha,
                amigos: dados.amigo,
                turno: dados.turno,
                matricula: dados.matricula,
                data: dados.data,
                nome_curso: dados.nome_curso,
                nome_unidade:dados.nome_unidade
            }))

            res.status(200).json({
                response: true,
                message: "Perfil completo formado.",
                perfil: dados,
                posts: posts
            })
        }
    })
})