const { Donat } = require("../../models/donat");

const getOwnRequest = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 1 } = req.query;
  const skip = (page - 1) * limit;
  const count = await Donat.countDocuments({ owner: _id });
  const result = await Donat.find({ owner: _id }, "-createdAt -updatedAt")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("owner", "name").populate("typeName", "typeName").populate("unitInfo", "unitName unitAvatarURL" );

  res.status(200).json({ ownDonat: result, total: count });
};

module.exports = getOwnRequest;