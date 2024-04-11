const express = require('express')
const router = express.Router()
const checkToken = require('../../token/token')
const {editarPerfil} = require('../../controller/perfil/EditarPerfilController')

router.put('/:id', checkToken, async(req, res)=>{
    const id = req.params.id
    const {senha, turno, matricula, nome_curso, nome_unidade} = req.body

    if(!senha || !turno || !matricula || !nome_curso || !nome_unidade){
        res.status(400).json({
            response: false,
            alert: "Todos os campos devem ser preenchidos para concluir a atualização. Caso não queria atualizar um campo, coloque seu valor atual."
        })
    }
    else if(matricula.length != 8){
        res.status(400).json({
            response: false,
            message: "A matrícula está incorreta !"
        })
    }
    else{
        editarPerfil(senha, turno, matricula, nome_curso, nome_unidade, id, function(err, results){
            if(err){
                console.error(err)
                res.status(400).json({
                    response: false,
                    message: "Erro interno. Tente novamente mais tarde !"
                })
            }
            else{
                res.status(200).json({
                    response: true,
                    messsage: "Perfil atualizado com sucesso !"
                })
            }
        })
    }
})

module.exports = router