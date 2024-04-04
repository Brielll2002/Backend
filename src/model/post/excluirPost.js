const express = require('express')
const router = express.Router()
const checkToken = require('../../token/token')
const {excluirPost} = require('../../controller/post/ExcluirPostController')

router.delete('/:id', checkToken, async (req, res)=>{
    const id = req.params.id
    excluirPost(id, function(err){
        if(err){
            console.error(err)
        }
    })
})

module.exports = router