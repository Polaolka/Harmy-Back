const { Unit } = require("../../models/unit");
const { RequestError } = require("../../helpers");

const getByUnitName = async (req, res) => {
  const { unitName } = req.query;

  if (!unitName) {
    throw RequestError(400, "Name parameter is required");
  }

//   const words = name
//     .split(" ")
//     .map((word) => `(?=.*${word})`)
//     .join("");

  const regex = new RegExp(`^${unitName}`, "i");

  const response = await Unit.find({ unitName: regex }, "-createdAt -updatedAt");

  res.status(200).json(response);

  if (!response) {
    throw RequestError(404, "Not found");
  }
};

module.exports = getByUnitName;