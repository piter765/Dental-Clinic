const jwt = require("jsonwebtoken");
require("dotenv").config();
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60m" })
}

let refreshTokens = []
function returnTokens(){
    return refreshTokens
}
function generateRefreshToken(user) {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "70m" })
    refreshTokens.push(refreshToken)
    return refreshToken
}
exports.generateAccessToken = generateAccessToken
exports.generateRefreshToken = generateRefreshToken
exports.returnTokensarray = returnTokens