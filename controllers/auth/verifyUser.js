const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { User } = require("../../models/user");

const verifyUser = async (req, res) => {

  const { authToken } = req.cookies;

  if (!authToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(authToken, SECRET_KEY);
    const user = await User.findById(decodedToken.id);
  console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  console.log("Verification successful");
    res.status(200).json({
      message: "Verification successful",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        avatarURL: user.avatarURL,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = verifyUser;