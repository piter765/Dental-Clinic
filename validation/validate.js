const jwt = require("jsonwebtoken");
var express = require('express');
var app = express();
const port = 3000
var path = require('path');
function validateToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader.split(" ")[1]
    if (token == null)
        res.sendStatus(400).send("Token not present")
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.status(403).send("Token invalid")
        }
        else {
            req.user = user
            next() 
        }
    })
} 
exports.validateToken = validateToken