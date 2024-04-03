const conn = require('../../conection/conn')

function postarComentario(conteudo, data, nome, id_user_comentario, id_post_comentario, callback){
    const sql = 'INSERT INTO comment (conteudo, data, nome, id_user_comentario, id_post_comentario) VALUES (?,?,?,?,?)'
    conn.query(sql, [conteudo, data, nome, id_user_comentario, id_post_comentario], (err, results)=>{
        if(err){
            return callback(err, null)
        }
        else{
            return callback(null, results)
        }
    })
}

module.exports = {postarComentario}