const { Type } = require("../../models/typesOfDonats");

const getTypesOfDonats= async (req, res) => {
  const response = await Type.find({}).select("-createdAt -updatedAt").sort({ typeName: 1 });

  res.status(200).json(response);
};

module.exports = getTypesOfDonats;
