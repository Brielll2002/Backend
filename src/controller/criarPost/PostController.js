const conn = require('../../conection/conn')

function criarPost(imagem, conteudo, nome_usuario, nome_curso_post, nome_unidade_post, id_user_post, data, turno, callback){
    const sql = 'INSERT INTO post (imagem, conteudo, nome_usuario, nome_curso_post, nome_unidade_post, id_user_post, data, turno) VALUES (?,?,?,?,?,?,?,?)'
        conn.query(sql, [imagem, conteudo, nome_usuario, nome_curso_post, nome_unidade_post, id_user_post, data, turno], (err, results)=>{
            if(err){
                return callback(err, null)
            }
            else{
                return callback(null, results)
            }
        })
}

function mudarQuantidadeDePostEmUnidades(nome_unidade_post, callback){
    const query = 'SELECT * FROM unidade WHERE nome_unidade = ?'
        conn.query(query, [nome_unidade_post], (err, results) => {
            if(err){
                return callback(err, null)
            }
            else if(results.length > 0){
                const Update = 'UPDATE unidade SET qtd_post = qtd_post + 1 WHERE nome_unidade = ?'
                conn.query(Update, [nome_unidade_post], (err)=>{
                    return callback(err, null)
                })
             }
        })
}

function mudarQuantidadeDePostEmCurso(nome_curso_post, callback){
    const query2 = 'SELECT * FROM cursos WHERE nome_curso = ?'
        conn.query(query2, [nome_curso_post], (err, results)=>{
            if(err){
                return callback(err, null)
            }
            if(results.length > 0){
                const Update2 = 'UPDATE cursos SET qtd_post = qtd_post + 1 WHERE nome_curso = ?'
                conn.query(Update2, [ nome_curso_post], (err)=>{
                    return callback(err, null)
                })
            }
        })
}

module.exports = {criarPost, mudarQuantidadeDePostEmUnidades, mudarQuantidadeDePostEmCurso}