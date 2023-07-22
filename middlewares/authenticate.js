const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const { RequestError } = require("../helpers");

const { User } = require("../models/user");

const authenticate = async (req, res, next) => {

  let { authToken } = req.cookies;
  console.log(req.cookies);

  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");
  authToken = authToken || token ;
  

  if (bearer !== "Bearer" && !authToken) {
    next(RequestError(401));
  }

  if (!authToken) {
    return next(RequestError(401, "Authentication required."));
  }

  try {
    const { id } = jwt.verify(authToken, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== authToken ) {
      return next(RequestError(401, "Invalid token."));
    }
    req.user = user;
    next();
  } catch (err) {
    return next(RequestError(401, "Invalid token."));
  }
};

module.exports = authenticate;
