const conn = require('../../conection/conn')

function filtro(nome_unidade_post,nome_curso_post,turno, callback){
    if (nome_unidade_post && nome_curso_post && turno){
        const sql = 'SELECT * FROM post WHERE nome_unidade_post = ? AND nome_curso_post = ? AND turno = ?'
        conn.query(sql, [nome_unidade_post, nome_curso_post, turno], (err, results)=>{
            if(err){
                return callback(err, null)
            }
            else{
                return callback(null, results)
            }
        })
    }
    else if(nome_unidade_post && !turno && !nome_curso_post){
        const sql = 'SELECT * FROM post WHERE nome_unidade_post = ?'
        conn.query(sql, [nome_unidade_post], (err, results)=>{
            if(err){
                return callback(err, null)
            }
            else{
                return callback(null, results)
            }
        })
    }
    else if (nome_curso_post && !turno && nome_unidade_post){
        const sql = 'SELECT * FROM post WHERE nome_curso_post = ? AND nome_unidade_post = ?'
        conn.query(sql, [nome_curso_post, nome_unidade_post], (err, results)=>{
            if(err){
                return callback(err, null)
            }
            else{
                return callback(null, results)
            }
        })
    }
}

module.exports = {filtro}