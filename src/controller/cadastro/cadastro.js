const express = require('express')
const app = express()
app.use(express.json())
const resData = new Date()
const data = resData.toISOString().split('T')[0]
const {verificarExistenciaUsuario, inserirUsuarioNoBancoDeDados, atualizacaoQuantidadeDeUsuarioNaUnidade, atualizacaoQuantidadeDeUsuarioNoCurso} = require('../../model/cadastro/CadastroModel')

app.post('/', async (req, res)=>{
    const {nome, sobrenome, senha, confirmSenha, turno, matricula, nome_curso, nome_unidade} = req.body

    if(!nome){
        res.status(400).json({
            response:false,
            message:"Preencha o campo 'nome' !"
        })
    }
    else if(!sobrenome){
        res.status(400).json({
            response:false,
            message:"Preencha o campo 'sobrenome' !"
        })
    }
    else if(!senha){
        res.status(400).json({
            response:false,
            message:"Preencha o campo 'senha' !"
        })
    }
    else if(!confirmSenha){
        res.status(400).json({
            response:false,
            message:"Preencha o campo 'confirmação de senha' !"
        })
    }
    else if(!turno){
        res.status(400).json({
            response:false,
            message:"Preencha o campo 'turno' !"
        })
    }
    else if(!matricula){
        res.status(400).json({
            response:false,
            message:"Preencha o campo 'matrícula' !"
        })
    }
    else if(matricula.length != 8){
        res.status(400).json({
            response:false,
            message:"A matrícula está errada !"
        })
    }
    else if(!nome_curso){
        res.status(400).json({
            response:false,
            message:"Preencha o campo 'nome do curso' !"
        })
    }
    else if(!nome_unidade){
        res.status(400).json({
            response:false,
            message:"Preencha o campo 'nome da unidade' !"
        })
    }
    else if(senha !== confirmSenha){
        res.status(400).json({
            response:false,
            message:"Senha e confirmação devem ser iguais !"
        })
    }
    else{
        verificarExistenciaUsuario(nome, sobrenome,function(err, results){
            if(err){
                console.error(err)

                res.status(500).json({
                    response: false,
                    message: 'Ocorreu um erro, por favor tente novamente mais tarde !'
                })
            }
            else if(results.length > 0){
                res.status(400).json({
                    response: false,
                    message: 'Usuário já existente !'
                })
            }
            else{
                inserirUsuarioNoBancoDeDados(nome, sobrenome, senha, turno, matricula, data, nome_curso, nome_unidade, function(err, results){
                    if(err){
                        console.error(err)
        
                        res.status(400).json({
                            response: false,
                            message: 'Ocorreu um erro, por favor tente mais tarde !'
                        })
                    }
                    else{
                        //mudar a quantidade de usuário na unidade
                        atualizacaoQuantidadeDeUsuarioNaUnidade(nome_unidade,function(err, results){
                            if(err)console.error(err)
                        })
                        //mudar a quantidade de usuário no curso
                        atualizacaoQuantidadeDeUsuarioNoCurso(nome_curso,function(err, results){
                            if(err)console.error(err)
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

module.exports = app
