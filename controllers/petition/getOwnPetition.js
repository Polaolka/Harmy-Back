const { Petition } = require("../../models/petition");

const getOwnPetition = async (req, res) => {
  const { _id } = req.user;

  const count = await Petition.countDocuments({ owner: _id });
  const result = await Petition.find({ owner: _id }, "-createdAt -updatedAt")
    .sort({ createdAt: -1 })
    .populate("owner", "name");

  res.status(200).json({ ownPetition: result, total: count });
};

module.exports = getOwnPetition;