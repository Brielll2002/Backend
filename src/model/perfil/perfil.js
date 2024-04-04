const express = require('express')
const router = express.Router()
const checkToken = require('../../token/token')
const {perfil} = require('../../controller/perfil/PerfilController')


router.get('/:id', checkToken, async (req, res)=>{
    const id = req.params.id
    perfil(id, (err, results)=>{
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
            message: `Seja bem-vindo(a) ao seu perfil, ${results[1][0].nome} !`,
            perfil: results[1][0],
            posts: results[0]
            })
        }
    })
})

module.exports = router