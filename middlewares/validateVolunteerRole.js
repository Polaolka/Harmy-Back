const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { RequestError } = require("../helpers");
const { User } = require("../models/user");

const validateVolunteerRole = async (req, res, next) => {
  let { authToken } = req.cookies;
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  authToken = authToken || token;
  
  if (bearer !== "Bearer" && !authToken) {
    return next(RequestError(401, "Authentication required."));
  }

  if (!authToken) {
    return next(RequestError(401, "Invalid token."));
  }

  try {
    const { id } = jwt.verify(authToken, SECRET_KEY);
    const user = await User.findById(id);
    
    if (!user || !user.token || user.token !== authToken ) {
      return next(RequestError(401, "Invalid token."));
    }
    
    req.user = user;
    // Перевірка ролі та відповідь клієнту
    if (user.role === "admin" || user.role === "volunteer") {
      next();
    } else {
      res.status(403).json({ error: "Access forbidden." });
    }
  } catch (err) {
    return next(RequestError(401, "Invalid token."));
  }
};

module.exports = validateVolunteerRole;
