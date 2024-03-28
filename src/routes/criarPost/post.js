const express = require('express')
const router = express.Router()
const conn = require('../../conection/conn')
require('dotenv').config()
const checkToken = require('../../token/token')
const resData = new Date()
const data = resData.toISOString().split('T')[0]

router.post('/', checkToken, (req, res)=>{
    const {imagem, conteudo, nome_usuario, nome_curso_post, nome_unidade_post, id_user_post} = req.body

    if(!nome_usuario || !nome_unidade_post || !nome_curso_post || !id_user_post || !conteudo){
        res.status(400).json({
            response: false,
            message: "Dados importante estão faltando para a criação do post !"
        })
    }
    else{
        const sql = 'INSERT INTO post (imagem, conteudo, nome_usuario, nome_curso_post, nome_unidade_post, id_user_post, data) VALUES (?,?,?,?,?,?,?)'

        conn.query(sql, [imagem, conteudo, nome_usuario, nome_curso_post, nome_unidade_post, id_user_post, data], (err)=>{
            if(err){
                console.error(err)
                res.status(400).json({
                    response: false,
                    message: "Erro ao publicar post. Tente novamente mais tarde !"
                })
            }
            else{
                //Mudar a quantidade de post na unidade
                const query = 'SELECT * FROM unidade WHERE nome_unidade = ?'
                conn.query(query, nome_unidade_post, (err, results) => {
                    if(results.length > 0){
                       const Update = 'UPDATE unidade SET qtd_post = qtd_post + 1 WHERE nome_unidade = ?'
                       conn.query(Update, [nome_unidade_post], (err)=>{
                        if(err)console.error(err)
                       })
                    }
                })

                //Mudar a quantidade de post no curso
                const query2 = 'SELECT * FROM cursos WHERE nome_curso = ?'
                conn.query(query2, [nome_curso_post], (err, results)=>{
                    if(results.length > 0){
                        const Update2 = 'UPDATE cursos SET qtd_post = qtd_post + 1 WHERE nome_curso = ?'
                        conn.query(Update2, [ nome_curso_post], (err)=>{
                            if(err)console.error(err)
                        })
                    }
                })

                res.status(200).json({
                    response: true,
                    message: "Post publicado com sucesso !"
                })
            }
        })
    }

})

module.exports = router