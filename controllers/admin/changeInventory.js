var mysql = require('mysql');
require("dotenv").config();
var db = mysql.createPool({
    host: process.env.host,
    user: process.env.login,
    password: process.env.pwd,
    port: process.env.port,
    database: process.env.db
});
exports.load = (req, res) => {
    let quant = req.body.quantity
    let id = req.body.id
    db.getConnection(async (err, connection) => {
        //if (err) throw (err)
        const sqlSearch = "UPDATE productDB SET quantity=? WHERE id=?"
        const search_query = mysql.format(sqlSearch, [quant, id])
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