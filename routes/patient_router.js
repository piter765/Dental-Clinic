var express = require('express');
var router = express.Router();
const validateToken = require('../validation/validate')
const registerController = require('../controllers/patient/register')
const loginController = require('../controllers/patient/login')
const refreshTokenController = require('../controllers/patient/refreshtoken')
const logoutController = require('../controllers/patient/logout')
const loadDashboard = require('../controllers/patient/loaddashboard')
const cancelAppointmanet = require('../controllers/patient/cancelAppointment')
const makeAppointment = require('../controllers/patient/makeAppointment')

router.post("/createuser", registerController.register)
router.post("/login", loginController.login)
router.post("/refreshtoken", validateToken.validateToken, refreshTokenController.refresh)
router.delete("/logout", logoutController.logout)

router.post('/loadashboard', validateToken.validateToken, loadDashboard.load)
router.post('/cancelappo', validateToken.validateToken, cancelAppointmanet.cancel)
router.post('/makeappo', validateToken.validateToken, makeAppointment.make)

router.get('/panel', (req, res) => {
    res.sendFile('index.html', { root: './src/patientPanel/' })
})
router.get('/info', (req, res) => {
    res.sendFile('info.html', { root: './src/patientPanel/' })
})
module.exports = router;