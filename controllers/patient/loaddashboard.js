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
    const id = req.body.id
    db.getConnection(async (err, connection) => {
     //   if (err) throw (err)
        const sqlSearch = "SELECT visitDB.date, visitDB.id, visitDB.email, userDB.login, userDB.name, userDB.surname, serviceDB.fullnick, visitDB.starttime, visitDB.endtime FROM ((visitDB INNER JOIN userDB ON visitDB.patientid = userDB.id) INNER JOIN serviceDB ON serviceDB.nick = visitDB.service) WHERE userDB.id = ?"
        const search_query = mysql.format(sqlSearch, [id])

        await connection.query(search_query, async (err, result) => {
            connection.release()
         //   if (err) throw (err)
            if (result.length != 0) {
                res.status(200).send({ result })
            } else {
                res.status(200).send({ message: 'any' })
            }

        })
    })
}