const { User } = require("../../models/user");

const updateUser = async (req, res) => {
  const { _id, name, avatarURL } = req.user;

  const { newName } = req.body;
console.log("newName", newName);
  const userName = newName || name;

  const userAvatar = req.file ? req.file.path : avatarURL;

  const user = await User.findByIdAndUpdate(
    _id,
    { $set: { avatarURL: userAvatar, name: userName } },
    { new: true }
  );

  res
    .status(200)
    .json({ _id: user._id, avatarURL: user.avatarURL, name: user.name });
};

module.exports = updateUser;
