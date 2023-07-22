const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");

const updateUser = require("./updateUser");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail")
const verifyUser = require("./verifyUser");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateUser,
  verifyEmail,
  resendVerifyEmail, 
  verifyUser
};
