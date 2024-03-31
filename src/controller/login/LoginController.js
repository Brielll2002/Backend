const conn = require('../../conection/conn')

function pesquisarUsuario(nome, matricula, senha, callback){
    const sql = 'SELECT * FROM user WHERE nome = ? AND matricula = ? AND senha = ?'
        conn.query(sql, [nome, matricula, senha], (err, results)=>{
            if(err){
                return callback(err, null)
            }
            else{
                callback(null,results)
            }
        })
}

module.exports = {pesquisarUsuario}