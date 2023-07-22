const { RequestError } = require("../../helpers");

const { Type } = require("../../models/typesOfDonats");


const addTypesOfDonats = async (req, res) => {
    const {typeName} = req.body;

  const type = await Type.findOne({ typeName });

  if (type) {
    throw RequestError(409, "category already existe");
  }


  // const data = {
  //   typeName,
  //   typeOfDonatsAvatarURL
  // };
  const result = await Type.create({ typeName });
  res.status(201).json({result});
};

module.exports = addTypesOfDonats;
