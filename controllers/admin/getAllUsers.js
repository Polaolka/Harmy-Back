const { User } = require("../../models/user");

const getAllUsers = async (req, res) => {
  const response = await User.find({}).sort({ name: 1 });

  const sortResponse = response.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  res.status(200).json(sortResponse);
};

module.exports = getAllUsers;
