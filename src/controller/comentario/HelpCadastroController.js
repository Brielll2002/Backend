const conn = require('../../conection/conn')

function buscarComentarios(id_post_comentario, callback){
    const sql = 'SELECT * FROM comment WHERE id_post_comentario = ?'
    conn.query(sql, [id_post_comentario], (err, results)=>{
        if(err){
            return callback(err, null)
        }
        else{
            return(callback(null, err))
        }
    })
}

module.exports = {buscarComentarios}