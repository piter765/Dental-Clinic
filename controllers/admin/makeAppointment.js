var mysql = require('mysql');
require("dotenv").config();
var db = mysql.createPool({
    host: process.env.host,
    user: process.env.login,
    password: process.env.pwd,
    port: process.env.port,
    database: process.env.db
});

exports.make = (req,res) => {
    db.getConnection(async (err, connection) => {
      //  if (err) throw (err)
        let t = req.body.starttime

        let timeParts = t.split(":");
        let et =  Number(timeParts[0]) * 60 + Number(timeParts[1]);
        let st = et
        const sqlSearch2 = "SELECT * FROM serviceDB WHERE nick=?"
        const search_query2 = mysql.format(sqlSearch2, [req.body.service])
        await connection.query(search_query2, async (err, result) => {
          //  if (err) throw (err)
            let st = et + Number(result[0].time)
            const sqlSearch = "INSERT INTO visitDB(doctorid, patientid, email, date, starttime, endtime, phone, service) VALUES (?,?,?,?,?,?,?,?)"
            const search_query = mysql.format(sqlSearch, [req.body.doctorid,req.body.patientid,req.body.email,req.body.date,et,st,req.body.phone,req.body.service])
            await connection.query(search_query, async (err, result2) => {
                connection.release()
               // if (err) throw (err)
                res.status(200).send({ message: 'ok' })
            })

        })    
    })
}