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
    const id = req.body.login
    db.getConnection(async (err, connection) => {
        const sqlSearch = "Select * from productDB"

        await connection.query(sqlSearch, async (err, result) => {
            connection.release()
           // if (err) throw (err)
            if (result.length != 0) {
                res.json({ result })
            } else {
                res.status(200).send({ message: 'err' })
            }

        })
    })
}