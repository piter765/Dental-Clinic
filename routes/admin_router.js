var express = require('express');
var router = express.Router();

const validateToken = require('../validation/validate')
const registerController = require('../controllers/admin/register')
const loginController = require('../controllers/admin/login')
const refreshTokenController = require('../controllers/admin/refreshtoken')
const logoutController = require('../controllers/admin/logout')
const getpanel = require('../controllers/admin/getpanel')
const getclient = require('../controllers/admin/getclient')
const deleteuser = require('../controllers/admin/deleteuser')
const appointments = require('../controllers/admin/loadAppointments')
const cancelappointments = require('../controllers/admin/cancelAppointment')
const makeappointments = require('../controllers/admin/makeAppointment')
const laodInventory = require('../controllers/admin/loadInventory')
const changeInventory = require('../controllers/admin/changeInventory')

router.post("/createuser", registerController.register)
router.post("/login", loginController.login)
router.post("/refreshtoken", validateToken.validateToken, refreshTokenController.refresh)
router.post("/getpanel", validateToken.validateToken, getpanel.get)
router.post("/getcustomers", validateToken.validateToken, getclient.get)
router.post("/deleteuser", validateToken.validateToken, deleteuser.del)
router.post("/appointments", validateToken.validateToken, appointments.load)
router.post("/cancelappointments", validateToken.validateToken, cancelappointments.cancel)
router.post("/makeappointments", validateToken.validateToken, makeappointments.make)
router.post("/loadinventory", validateToken.validateToken, laodInventory.load)
router.post("/changeinventory", validateToken.validateToken, changeInventory.load)
router.delete("/logout", logoutController.logout)

router.get('/appointments', (req, res) => {
    res.sendFile('adminAppointments.html', { root: './src/adminsPanel/' })
})
router.get('/customers', (req, res) => {
    res.sendFile('adminCustomers.html', { root: './src/adminsPanel/' })
})
router.get('/financial', (req, res) => {
    res.sendFile('adminFinancial.html', { root: './src/adminsPanel/' })
})
router.get('/inventory', (req, res) => {
    res.sendFile('adminInventory.html', { root: './src/adminsPanel/' })
})
router.get('/panel', (req, res) => {
    res.sendFile('adminPanel.html', { root: './src/adminsPanel/' })
})

module.exports = router;