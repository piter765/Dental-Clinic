var express = require('express');
var app = express();
const port = 3000
var path = require('path');
require("dotenv").config()
app.use(express.static('./src/public'))
app.use(express.json());

var patient = require('./routes/patient_router.js');
var admin = require('./routes/admin_router.js');
var doctor = require('./routes/doctor_router.js');

app.use('/patient', patient);
app.use("/admin", admin)
app.use("/doctor", doctor)

app.listen(port, () => {
    console.log(`Server works on port: ${port}`)
})