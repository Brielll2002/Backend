const express = require('express')
const router = express.Router()
const resData = new Date()
const data = resData.toISOString().split('T')[0]
const conn = require('../../conection/conn')

router.post('/', async (req, res)=>{
    const {nome, sobrenome, senha, confirmSenha, turno, matricula, nome_curso, nome_unidade} = req.body

    if(!nome){
        res.status(400).json({
            response:false,
            message:"Preencha todos os campos !"
        })
    }
    else if(!sobrenome){
        res.status(400).json({
            response:false,
            message:"Preencha todos os campos !"
        })
    }
    else if(!senha){
        res.status(400).json({
            response:false,
            message:"Preencha todos os campos !"
        })
    }
    else if(!confirmSenha){
        res.status(400).json({
            response:false,
            message:"Preencha todos os campos !"
        })
    }
    else if(!turno){
        res.status(400).json({
            response:false,
            message:"Preencha todos os campos !"
        })
    }
    else if(!matricula){
        res.status(400).json({
            response:false,
            message:"Preencha todos os campos !"
        })
    }
    else if(!nome_curso){
        res.status(400).json({
            response:false,
            message:"Preencha todos os campos !"
        })
    }
    else if(!nome_unidade){
        res.status(400).json({
            response:false,
            message:"Preencha todos os campos !"
        })
    }
    else if(senha !== confirmSenha){
        res.status(400).json({
            response:false,
            message:"Senha e confirmação devem ser iguais !"
        })
    }
    else{
        const sql = 'SELECT * FROM user WHERE nome = ? and sobrenome = ?'
        conn.query(sql, [nome, sobrenome], (err, results)=>{
            if(err){
                console.log(err)

                res.status(400).json({
                    response: false,
                    message: 'Ocorreu um erro, por favor tente mais tarde !'
                })
            }
            else if(results.length > 0){
                res.status(400).json({
                    response: false,
                    message: 'Usuário já existente !'
                })
            }
            else{
                const sql = 'INSERT INTO user (nome, sobrenome, senha, amigos, turno, matricula, data, nome_curso, nome_unidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
                conn.query(sql, [nome, sobrenome, senha, 0, turno, matricula, data, nome_curso, nome_unidade], (err, results)=>{
                    if(err){
                        console.error(err)
        
                        res.status(400).json({
                            response: false,
                            message: 'Ocorreu um erro, por favor tente mais tarde !'
                        })
                    }
                    else{
                        //mudar a quantidade de usuário na unidade
                        const query = "SELECT * FROM unidade WHERE nome_unidade = ?"
                        conn.query(query, [nome_unidade], (err, results)=>{
                            if(results.length > 0){
                                const Update = "UPDATE unidade SET qtd_user = qtd_user + 1 WHERE nome_unidade = ?"
                                conn.query(Update,[nome_unidade],(err)=>{
                                    if(err){console.error(err)}
                                })
                            }
                            else{
                                const createUpdate = "INSERT INTO unidade (nome_unidade, qtd_user, qtd_post) VALUES (?, ?, ?)"
                                conn.query(createUpdate, [nome_unidade, 1, 0], (err)=>{
                                    if(err)console.error(err)
                                })
                            }
                        })
                        //mudar a quantidade de usuário no curso
                        const query2 = "SELECT *FROM cursos WHERE nome_curso = ?"
                        conn.query(query2, [nome_curso], (err, results)=>{
                            if(results.length > 0){
                                const Update2 = "UPDATE cursos SET qtd_user = qtd_user+1 WHERE nome_curso = ?"
                                conn.query(Update2,[nome_curso], (err)=>{
                                    console.error(err)
                                })
                            }
                            else{
                                const createUpdate2 = "INSERT INTO cursos (nome_curso, qtd_user, qtd_post) VALUES (?, ?, ?)"
                                conn.query(createUpdate2, [nome_curso, 1, 0], (err)=>{
                                    if(err)console.error(err)
                                })
                            }
                        })
                        //resposta na API
                        res.status(200).json({
                            response:true,
                            message: `Cadastro realizado com sucesso. Seja bem-vindo(a), ${nome} !`
                        })
                    }
                })
            }
        })
    }
})

module.exports = router
