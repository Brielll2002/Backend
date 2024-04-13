const conn = require('../../conection/conn')

function home(callback){
    const sql = 'SELECT * FROM post'
    conn.query(sql, (err, results)=>{
        if(err){
            return callback(err, null)
        }
        else{
            return callback(null, results)
        }
    })
}

module.exports = {home}