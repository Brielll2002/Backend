const express = require('express')
const router = express.Router()
const checkToken = require('../../token/token')
const {excluirPost} = require('../../model/post/ExcluirPostModel')

router.delete('/:id', checkToken, async (req, res)=>{
    const id = req.params.id
    excluirPost(id, function(err){
        if(err){
            console.error(err)
            res.status(500).json({
                response: false,
                message: "Erro interno. Tente novamente mais tarde !"
            })
        }
    })
})

module.exports = router