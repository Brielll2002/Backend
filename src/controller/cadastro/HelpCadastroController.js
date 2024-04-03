const conn = require('../../conection/conn')

function cursosDisponiveis(callback){
    const sql = 'SELECT * FROM cursos'
    conn.query(sql, (err, results)=>{
        if(err){
            return callback(err, null)
        }
        else{
            return callback(null, results)
        }
    })
}

function unidadesDisponiveis(callback){
    const sql = 'SELECT * FROM unidade'
    conn.query(sql, (err, results)=>{
        if(err){
            return callback(err, null)
        }
        else{
            return callback(null, results)
        }
    })
}

module.exports = {cursosDisponiveis, unidadesDisponiveis}