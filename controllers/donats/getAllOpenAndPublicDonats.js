const { Donat } = require("../../models/donat");

const getAllDonats = async (req, res) => {

  const { page = 1, limit = 1 } = req.query;
  const skip = (page - 1) * limit;
  const count = await Donat.countDocuments({isOpen: true, isPublic: true});
  const result = await Donat.find({isOpen: true, isPublic: true}, "-createdAt -updatedAt")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("owner", "name").populate("typeName", "typeName").populate("unitInfo", "unitName unitAvatarURL");

  res.status(200).json({ donats: result, total: count });
};

module.exports = getAllDonats;