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
    let visitid = req.body.id
    let desc = req.body.desc
    let zuz = req.body.zuz
    db.getConnection(async (err, connection) => {
        const sqlSearch = "INSERT INTO submitedvisitdb(visitid,description,usedinventory) VALUES (?,?,?)"
        const search_query = mysql.format(sqlSearch, [visitid, desc, zuz])
        await connection.query(search_query, async (err, result) => {
            connection.release()
            if (err){
                res.json({ message: 'err' })
            }else{
                res.json({ message: 'ok' })
            }
        })
    })
}