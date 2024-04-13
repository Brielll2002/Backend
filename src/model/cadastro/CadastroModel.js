const conn = require('../../conection/conn')

function verificarExistenciaUsuario(nome, sobrenome, callback){
    const sql = 'SELECT * FROM user WHERE nome = ? AND sobrenome = ?'
    conn.query(sql, [nome, sobrenome], (err, results)=>{
        if(err){
            return callback(err, null)
        }
        else{
            return callback(null, results)
        }
    })
}

function inserirUsuarioNoBancoDeDados(nome, sobrenome, senha, turno, matricula, data, nome_curso, nome_unidade, callback){
    const sql = 'INSERT INTO user (nome, sobrenome, senha, amigos, turno, matricula, data, nome_curso, nome_unidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    conn.query(sql, [nome, sobrenome, senha, 0, turno, matricula, data, nome_curso, nome_unidade], (err, results)=>{
        if(err){
            return callback(err, null)
        }
        else{
            return callback(null, results)
        }
    })
}

function atualizacaoQuantidadeDeUsuarioNaUnidade(nome_unidade, callback){
    const query = "SELECT * FROM unidade WHERE nome_unidade = ?"
    conn.query(query, [nome_unidade], (err, results)=>{
        if(err){
            return callback(err, null)
        }
        else{
            if(results.length > 0){
                const Update = "UPDATE unidade SET qtd_user = qtd_user + 1 WHERE nome_unidade = ?"
                conn.query(Update,[nome_unidade],(err)=>{
                    if(err){return callback(err, null)}
                })
            }
            else{
                const createUpdate = "INSERT INTO unidade (nome_unidade, qtd_user, qtd_post) VALUES (?, ?, ?)"
                conn.query(createUpdate, [nome_unidade, 1, 0], (err)=>{
                    if(err){return callback(err, null)}
                })
            }
        }
    })
}

function atualizacaoQuantidadeDeUsuarioNoCurso(nome_curso, callback){
    const query2 = "SELECT *FROM cursos WHERE nome_curso = ?"
    conn.query(query2, [nome_curso], (err, results)=>{
        if(err){
            return callback(err, null)
        }
        else{
            if(results.length > 0){
                const Update2 = "UPDATE cursos SET qtd_user = qtd_user+1 WHERE nome_curso = ?"
                conn.query(Update2,[nome_curso], (err)=>{
                    if(err){return callback(err, null)}
                })
            }
            else{
                const createUpdate2 = "INSERT INTO cursos (nome_curso, qtd_user, qtd_post) VALUES (?, ?, ?)"
                conn.query(createUpdate2, [nome_curso, 1, 0], (err)=>{
                    if(err){return callback(err, null)}
                })
            }
        }
    })
}

module.exports = {verificarExistenciaUsuario, inserirUsuarioNoBancoDeDados, atualizacaoQuantidadeDeUsuarioNaUnidade, atualizacaoQuantidadeDeUsuarioNoCurso}