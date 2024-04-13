const conn = require('../../conection/conn')

function excluirPost(id, callback){
    const sql = 'DELETE FROM comment WHERE id_post_comentario = ?'
    conn.query(sql, [id], (err, results)=>{
        if(err){
            return callback(err, null)
        }
        else{
            const sql2 = 'DELETE FROM post WHERE id_post = ?'
            conn.query(sql2, [id], (err, results)=>{
                if(err){
                    return callback(err, null)
                }
            })
        }
    })
}

module.exports = {excluirPost}