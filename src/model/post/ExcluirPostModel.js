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

function diminuirQuantidadeDePostEmCurso(nome_curso_post, callback){
    const query2 = 'SELECT * FROM cursos WHERE nome_curso = ?'
        conn.query(query2, [nome_curso_post], (err, results)=>{
            if(err){
                return callback(err, null)
            }
            if(results.length > 0){
                const Update2 = 'UPDATE cursos SET qtd_post = qtd_post - 1 WHERE nome_curso = ?'
                conn.query(Update2, [nome_curso_post], (err)=>{
                    return callback(err, null)
                })
            }
        })
}

function diminuirQuantidadeDePostEmUnidades(nome_unidade_post, callback){
    const query = 'SELECT * FROM unidade WHERE nome_unidade = ?'
        conn.query(query, [nome_unidade_post], (err, results) => {
            if(err){
                return callback(err, null)
            }
            else if(results.length > 0){
                const Update = 'UPDATE unidade SET qtd_post = qtd_post - 1 WHERE nome_unidade = ?'
                conn.query(Update, [nome_unidade_post], (err)=>{
                    return callback(err, null)
                })
             }
        })
}

function pegarInfoPost(id_post, callback){
    const sql = 'SELECT * FROM post WHERE id_post = ?'
    conn.query(sql, [id_post], (err, results)=>{
        if(err){
            return callback(err, null)
        }
        else{
            console.log(results)
            return callback(null, results)
        }
    })
}

module.exports = {
    excluirPost,
    diminuirQuantidadeDePostEmCurso,
    diminuirQuantidadeDePostEmUnidades,
    pegarInfoPost
}