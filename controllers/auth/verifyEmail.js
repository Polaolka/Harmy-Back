const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const { User } = require("../../models/user");

require("dotenv").config();

const { BASE_URL } = process.env;

const { RequestError } = require("../../helpers");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    // res.json({
    //   message: "User not found",
    // });
    throw RequestError(404, "Not Found");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "240h" });



  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
    token,
  });

  res.cookie("authToken", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "lax",
  });

  res.status(200).send(`
    <html>
      <head>
        <title>Підтвердження електронної пошти</title>
      </head>
      <body>
        <h1>Підтвердження електронної пошти пройшло успішно!</h1>
        <p>Тепер ви можете перейти на сторінку застосунку:</p>
        <a href="#" onclick="redirectToApp()">Перейти на сторінку застосунку</a>
        <script>
        function redirectToApp() {
          fetch("${BASE_URL}/auth/verifyUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", 
          })
            .then((response) => response.json())
            .then((data) => {
              // Після виконання запиту тут можна обробити відповідь сервера
              console.log(data);
              // Перенаправити користувача на сторінку застосунку після успішного залогінення
              window.location.href = "https://andrewsydorenko.github.io/harmy/";
            })
            .catch((error) => {
              console.error("Помилка залогінення:", error);
            });
        }
      </script>
      </body>
    </html>
  `);
};

module.exports = verifyEmail;
