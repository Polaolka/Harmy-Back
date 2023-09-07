const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY, FRONTEND_URL } = process.env;

const googleAuth = async(req, res)=> {
    const {_id: id} = req.user;
    const payload = {id};

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET_KEY, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY, { expiresIn: "7d" });
    await User.findByIdAndUpdate(id, { accessToken, refreshToken });

    res.redirect(`${FRONTEND_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`);
}

module.exports = googleAuth;

