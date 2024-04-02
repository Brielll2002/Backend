const jwt = require('jsonwebtoken')
require('dotenv').config()

function checkToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({
            response: false,
            message: "Acesso negado !"
        })
    }
    else{
        try {
            const secret = jwt.sign('12h', process.env.SECRETKEY)
            jwt.verify(token, secret)
            next()
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = checkToken