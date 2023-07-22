const { User } = require("../../models/user");

const { RequestError } = require("../../helpers");

const updateRole = async (req, res) => {
  const { id, role } = req.body;
  const result =await User.findByIdAndUpdate(id, { role }, { new: true, select: '_id name email role' });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(result);

};

module.exports = updateRole;
