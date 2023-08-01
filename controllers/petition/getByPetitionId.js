const { Petition } = require("../../models/petition");
const { RequestError } = require("../../helpers");

const getByPetitionName = async (req, res) => {
  const { id } = req.params;

  const response = await Petition.findById(id).select("-createdAt -updatedAt").populate("owner", "name");

  res.status(200).json(response);

  if (!response) {
    throw RequestError(404, "Not found");
  }
};

module.exports = getByPetitionName;