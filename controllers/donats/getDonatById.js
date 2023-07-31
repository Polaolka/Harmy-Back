const { Donat } = require("../../models/donat");
const { RequestError } = require("../../helpers");

const getDonatById = async (req, res) => {
  const { id } = req.params;

  const result = await Donat.findById(id).populate("owner", "name").populate("typeName", "typeName").populate("unitInfo", "unitName unitAvatarURL" );

  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = getDonatById;
