const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user");

require("dotenv").config();

const { RequestError, sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, "Email already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = "https://res.cloudinary.com/dj5smkin6/image/upload/v1689277252/Screenshot_15_rfh3yi.jpg";
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEm = {
    to: email,
    subject: "Verify Email",
    html: `<a target="_blank" href="${BASE_URL}/auth/verify/${verificationToken}">Click verify email</a>`,
  };


  await sendEmail(verifyEm);
  
  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
};

module.exports = register;
