var mysql = require('mysql');
const bcrypt = require("bcrypt")
var db = mysql.createPool({
    host: process.env.host,
    user: process.env.login,
    password: process.env.pwd,
    port: process.env.port,
    database: process.env.db
});
exports.register = async (req, res) => {
    const login = req.body.login;
  //  console.log(login)
    const role = 'admin'
    const email = req.body.email
    const name = req.body.name
    const surname = req.body.surname
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    db.getConnection(async (err, connection) => {
     //   if (err) throw (err)
        const sqlSearch = "SELECT * FROM userDB WHERE login = ?"
        const search_query = mysql.format(sqlSearch, [login])
        const sqlInsert = "INSERT INTO userDB(login,password,role,email,name, surname) VALUES (?,?,?,?,?,?)"
        const insert_query = mysql.format(sqlInsert, [login, hashedPassword, role, email, name, surname])

        connection.query(search_query, async (err, result) => {
          //  if (err) throw (err)
            if (result.length != 0) {
                connection.release()
              res.status(200).send({message:'notok'})
            }
            else {
                await connection.query(insert_query, (err, result) => {
                    connection.release()
                 //   if (err) throw (err)
                    res.status(200).send({message:'ok'})
                })
            }
        })
    })
}