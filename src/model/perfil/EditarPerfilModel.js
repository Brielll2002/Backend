const conn = require('../../conection/conn')
const {perfil} = require('./PerfilModel')
const {
    atualizacaoQuantidadeDeUsuarioNaUnidade, 
    atualizacaoQuantidadeDeUsuarioNoCurso
} = require('../cadastro/CadastroModel')

function diminuirQuantidadeDeUsuarioNaUnidade(nome_unidade, callback){
    const query = "SELECT * FROM unidade WHERE nome_unidade = ?"
    conn.query(query, [nome_unidade], (err, results)=>{
        if(err){
            return callback(err, null)
        }
        else{
            if(results.length > 0){
                const Update = "UPDATE unidade SET qtd_user = qtd_user - 1 WHERE nome_unidade = ?"
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

function diminuirQuantidadeDeUsuarioNoCurso(nome_curso, callback){
    const query2 = "SELECT *FROM cursos WHERE nome_curso = ?"
    conn.query(query2, [nome_curso], (err, results)=>{
        if(err){
            return callback(err, null)
        }
        else{
            if(results.length > 0){
                const Update2 = "UPDATE cursos SET qtd_user = qtd_user-1 WHERE nome_curso = ?"
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


function editarPerfil(senha, turno, matricula, nome_curso, nome_unidade,id,callback){
    
    perfil(id, (err, results)=>{
        if(err){
            return callback(err, null)
        }
        const nomeCurso = results[1][0].nome_curso
        const nomeUnidade = results[1][0].nome_unidade

        const sql = 'UPDATE user SET senha = ?, turno = ?, matricula = ?, nome_curso = ?, nome_unidade = ? WHERE id_user = ?'
        conn.query(sql, [senha, turno, matricula, nome_curso, nome_unidade, id], (err, results)=>{

            if(err){
                console.error(err)
                return callback(err, null)
            }
            else{
                if(nomeCurso == nome_curso && nomeUnidade == nome_unidade){

                    return callback(null, null)
                }
                else if(nomeCurso != nome_curso && nomeUnidade == nome_unidade){
                    diminuirQuantidadeDeUsuarioNoCurso(nomeCurso, (err, results)=>{
                        if(err){
                            return callback(err, null)
                        }    
                    })
                    atualizacaoQuantidadeDeUsuarioNoCurso(nome_curso)
    
                        return callback(null, null)
                }
                else if(nomeUnidade != nome_unidade && nomeCurso == nome_curso){
                    diminuirQuantidadeDeUsuarioNaUnidade(nomeUnidade, (err, results)=>{
                        if(err){
                            return callback(err, null)
                        }
                    })
                    atualizacaoQuantidadeDeUsuarioNaUnidade(nome_unidade)
    
                        return callback(null, null)
                }
                else{
                    diminuirQuantidadeDeUsuarioNoCurso(nomeCurso, (err, results)=>{
                        if(err){
                            return callback(err, null)
                        }
                    })
                    atualizacaoQuantidadeDeUsuarioNoCurso(nome_curso)
    
                    diminuirQuantidadeDeUsuarioNaUnidade(nomeUnidade, (err, results)=>{
                        if(err){
                            return callback(err, null)
                        }
                    })
                    atualizacaoQuantidadeDeUsuarioNaUnidade(nome_unidade)
    
                        return callback(null, null)
                }
            
            }
        })
    })

}

module.exports = {editarPerfil}