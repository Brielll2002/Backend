const conn = require('../../conection/conn')

function perfil(id, callback){
    const sql = 'SELECT * FROM post WHERE id_user_post = ?'
    conn.query(sql, [id], (err, results)=>{
        if(err){
            return callback(err, null)
        }
        else{
            const posts = results.map((post)=>({
                id_post: post.id_post,
                data: post.data,
                conteudo: post.conteudo,
                imagem: post.imagem,
                nome_usuario: post.nome_usuario,
                id_user_post: post.id_user_post,
                nome_unidade_post: post.nome_unidade_post,
                nome_curso_post: post.nome_curso_post
            }))

            const sql2 = 'SELECT * FROM user WHERE id_user = ?'
            conn.query(sql2, [id], (err, results)=>{
                if(err){
                    return callback(err, null)
                }
                else if(results.length == 0){
                    const res = [posts, results]
                    return callback(null, res)
                }
                else{
                    const dados = results.map((dados)=>({
                        id_user: dados.id_user,
                        nome: dados.nome,
                        sobrenome: dados.sobrenome,
                        amigos: dados.amigo,
                        turno: dados.turno,
                        matricula: dados.matricula,
                        data: dados.data,
                        nome_curso: dados.nome_curso,
                        nome_unidade:dados.nome_unidade
                    }))
        
                    const res = [posts, dados]
                    return callback(null, res)
                }
            })
        }
    })
}

module.exports = {perfil}