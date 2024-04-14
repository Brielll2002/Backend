const express = require('express')
const app = express()
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const host = process.env.HOST
let which;

if(host == 'localhost'){
    which = 'localhost.html'
}
else{
    which = 'server.html'
}

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, which));
});

module.exports = app