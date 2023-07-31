const { Unit } = require("../../models/unit");

const getAllUnits = async (req, res) => {
    
  const respons = await Unit.find({}).select("-owner");

  res.status(200).json(respons);
};
module.exports = getAllUnits;