const { Fund } = require("../../models/charitableFund");

const getAllFund = async (req, res) => {
  const { fundName } = req.query;

  const searchParams = fundName ? {fundName: { $regex: fundName, $options: "i" }} : {};

  const { page = 1, limit = 1 } = req.query;
  const skip = (page - 1) * limit;
  const count = await Fund.countDocuments(searchParams);
  const result = await Fund.find(
    searchParams,
    "-createdAt -updatedAt"
  ).skip(skip)
    .limit(limit);

  res.status(200).json({ funds: result, total: count });
};

module.exports = getAllFund;