var mysql = require('mysql');
const bcrypt = require("bcrypt")
var db = mysql.createPool({
    host: process.env.host,
    user: process.env.login,
    password: process.env.pwd,
    port: process.env.port,
    database: process.env.db
});
exports.sub = async (req, res) => {
    let login  = req.params.appid;
    res.sendFile('subappo.html', { root: './src/doctorsPanel/' })

}