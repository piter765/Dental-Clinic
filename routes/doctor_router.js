var express = require('express');
var router = express.Router();

const validateToken = require('../validation/validate')
const registerController = require('../controllers/doctor/register')
const loginController = require('../controllers/doctor/login')
const refreshTokenController = require('../controllers/doctor/refreshtoken')
const logoutController = require('../controllers/doctor/logout')
const getpanel = require('../controllers/doctor/getpanel')
const appointments = require('../controllers/doctor/loadAppointments')
const laodInventory = require('../controllers/admin/loadInventory')
const changeInventory = require('../controllers/doctor/changeInventory')
const submitappo = require('../controllers/doctor/submitappointment')
const addsubmitappo = require('../controllers/doctor/addsub')
const reports = require('../controllers/doctor/reports')

router.post("/createuser", registerController.register)
router.post("/login", loginController.login)
router.post("/refreshtoken", validateToken.validateToken, refreshTokenController.refresh)
router.post("/getpanel", validateToken.validateToken, getpanel.get)
router.post("/appointments", validateToken.validateToken, appointments.load)
router.post("/changeinventory", validateToken.validateToken, changeInventory.load)
router.post("/loadinventory", validateToken.validateToken, laodInventory.load)
router.get("/submitappointment/:appid",  submitappo.sub)
router.post("/addsubmitappo", validateToken.validateToken, addsubmitappo.sub)
router.post("/reports", validateToken.validateToken, reports.load)
router.delete("/logout", logoutController.logout)


router.get('/appointments', (req, res) => {
    res.sendFile('doctorsAppointments.html', { root: './src/doctorsPanel/' })
})
router.get('/inventory', (req, res) => {
    res.sendFile('doctorsInventory.html', { root: './src/doctorsPanel/' })
})
router.get('/panel', (req, res) => {
    res.sendFile('doctorsPanel.html', { root: './src/doctorsPanel/' })
})
router.get('/reports', (req, res) => {
    res.sendFile('doctorsReports.html', { root: './src/doctorsPanel/' })
})

module.exports = router;