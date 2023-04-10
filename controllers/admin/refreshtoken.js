const jwt = require("jsonwebtoken");
const token = require("../../jwt/generateToken")
exports.refresh = (req, res) => {
    refreshTokens = token.returnTokensarray()
    if (!refreshTokens.includes(req.body.token))
        res.status(400).send("Refresh Token Invalid")
    refreshTokens = refreshTokens.filter((c) => c != req.body.token)

    const accessToken = token.generateAccessToken({ user: req.body.login })
    const refreshToken = token.generateRefreshToken({ user: req.body.login })

    res.json({ accessToken: accessToken, refreshToken: refreshToken })
}
