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
        if (err) throw (err)
        const sqlSearch = "Select COUNT(role) as 'c' from userDB where role='user'"
        const sqlSearch2 = "Select COUNT(id) as 'c' from visitDB"
        const sqlSearch3 = "SELECT COUNT(id) as 'c' FROM visitDB WHERE date=CURRENT_DATE()"
        const sqlSearch4 = "SELECT doctorDB.name AS 'doctorname',doctorDB.surname AS 'doctorsur', userDB.name , userDB.surname, serviceDB.fullnick, visitDB.starttime FROM visitDB INNER JOIN userDB ON visitDB.patientid = userDB.id INNER JOIN serviceDB ON serviceDB.nick = visitDB.service INNER JOIN doctorDB ON visitDB.doctorid = doctorDB.id WHERE visitDB.date = CURRENT_DATE(); "
        await connection.query(sqlSearch, async (err, result) => {
           // if (err) throw (err)
            send.customers = result[0].c
        }) 
        await connection.query(sqlSearch2, async (err, result) => {
          //  if (err) throw (err)
            send.totalvisits = result[0].c
        })
        await connection.query(sqlSearch3, async (err, result) => {
          //  if (err) throw (err)
            send.todayvisits = result[0].c
        })
        await connection.query(sqlSearch4, async (err, result) => {
          //  connection.release()
            if (err) throw (err)
            send.visits = result
            res.json(send)
        })
    }) 
    
}
