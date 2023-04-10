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

exports.login = (req, res) => {
    const login = req.body.login
    const password = req.body.password
    db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "Select * from userDB where login = ?"
        const search_query = mysql.format(sqlSearch, [login])
        await connection.query(search_query, async (err, result) => {
            connection.release()
            if (result.length == 0) {
                res.json({message:'notexist'})
            }
            else {
                const hashedPassword = result[0].password
                if (await bcrypt.compare(password, hashedPassword)) {
                    const accessToken = token.generateAccessToken ({user: req.body.login})
                    const refreshToken = token.generateRefreshToken ({user: req.body.login})
                    res.json ({message: 'ok', accessToken: accessToken, refreshToken: refreshToken, login:result[0].login, email:result[0].email, name:result[0].name, surname:result[0].surname, id:result[0].id })
                }
                else {
                    res.status(200).send({message:'passwordincorrect'})
                } 
            }
        }) 
    }) 
}