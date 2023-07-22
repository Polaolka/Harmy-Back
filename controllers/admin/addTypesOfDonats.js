const { RequestError } = require("../../helpers");

const { Type } = require("../../models/typesOfDonats");


const addTypesOfDonats = async (req, res) => {
    const {typeName} = req.body;

  const type = await Type.findOne({ typeName });

  if (type) {
    throw RequestError(409, "category already existe");
  }

  const result = await Type.create({ typeName });
  const responseData = result.toObject();
  delete responseData.createdAt;
  delete responseData.updatedAt;
  res.status(201).json(responseData);
};

module.exports = addTypesOfDonats;
