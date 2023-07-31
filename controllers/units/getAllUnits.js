const { Unit } = require("../../models/unit");

const getAllUnits = async (req, res) => {
    
  const respons = await Unit.find({});

  res.status(200).json(respons);
};
module.exports = getAllUnits;