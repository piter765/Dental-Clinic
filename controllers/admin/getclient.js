var mysql = require('mysql');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();
var db = mysql.createPool({
    host: process.env.host,
    user: process.env.login,
    password: process.env.pwd,
    port: process.env.port,
    database: process.env.db
});

exports.get = (req, res) => {
    const login = req.body.login
    let send = {}
    db.getConnection(async (err, connection) => {
      //  if (err) throw (err)
        const sqlSearch = "Select * from userDB"
            await connection.query(sqlSearch, async (err, result) => {
            connection.release()
            res.json(result)
        })
    }) 
    
}
