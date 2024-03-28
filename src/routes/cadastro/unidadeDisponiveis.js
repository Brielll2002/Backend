const express =require('express')
const router = express.Router()
const conn = require('../../conection/conn') 

router.get('/', async (req, res)=>{

    const sql = 'SELECT * FROM unidade'

    conn.query(sql, (err, results)=>{
        if(err){
            console.error(err)

            res.status(400).json({
                response: false,
                message: "Ocorreu um erro, tente novamente mais tarde !"
            })
        }
        else if(results.length == 0){
            res.status(200).json({
                response: true,
                message: "Ainda não há unidade cadastrada, adicione a sua unidade !"
            })
        }
        else{
            const unidades = results.map(unidade => ({
                id_unidade: unidade.id_unidade,
                nome_unidade: unidade.nome_unidade
            }))

            res.status(200).json({
                response: true,
                unidades: unidades
            })
        }
    })

})

module.exports = router