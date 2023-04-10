const jwt = require("jsonwebtoken")
const token = require("../../jwt/generateToken")
exports.logout = (req, res) => {
    refreshTokens = token.returnTokensarray()
    refreshTokens = refreshTokens.filter((c) => c != req.body.token)
    res.json({message:'ok'})
}