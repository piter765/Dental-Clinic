var mysql = require('mysql');
require("dotenv").config();
var db = mysql.createPool({
    host: process.env.host,
    user: process.env.login,
    password: process.env.pwd,
    port: process.env.port,
    database: process.env.db
});
exports.cancel = (req, res) => {
    const appo_id = req.body.id
    const sqlSearch = "DELETE FROM visitDB WHERE id=?"
    const search_query = mysql.format(sqlSearch, [appo_id])
    db.getConnection(async (err, connection) => {
       await connection.query(search_query, async (err, result) => {
        connection.release()
       // if (err) throw (err)
        res.status(200).send({message:'canceled'})
       })
    })
}