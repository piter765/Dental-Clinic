var mysql = require('mysql');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const token = require("../../jwt/generateToken")
require("dotenv").config();
var db = mysql.createPool({
    host: process.env.host,
    user: process.env.login,
    password: process.env.pwd,
    port: process.env.port,
    database: process.env.db
});

exports.del = (req, res) => {
    db.getConnection(async (err, connection) => {
       // if (err) throw (err)
        let id = req.body.id
        const sqlSearch = "Delete from userDB where id=?"
        const search_query = mysql.format(sqlSearch, [id])
        await connection.query(search_query, async (err, result) => {
            connection.release()
            res.json({message:"ok"})
        }) 
    }) 
}