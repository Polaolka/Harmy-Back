const { Petition } = require("../../models/petition");

const getAllPetition = async (req, res) => {
  const { petitionName } = req.query;

  const searchParams = petitionName ? {petitionName: { $regex: petitionName, $options: "i" }} : {};

  const { page = 1, limit = 1 } = req.query;
  const skip = (page - 1) * limit;
  const count = await Petition.countDocuments(searchParams);
  const result = await Petition.find(
    searchParams,
    "-createdAt -updatedAt"
  ).skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("owner", "name");

  res.status(200).json({ petition: result, total: count });
};

module.exports = getAllPetition;