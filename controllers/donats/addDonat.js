const { Donat } = require("../../models/donat");

const addDonat = async (req, res) => {
  const { _id: owner } = req.user;

  const { typeName, requestDescription, requestTitle, amountOfFee, socialPage, linkToMono, private24Wallet, anotherWallet, cryptoWallet, unitInfo } = req.body;


  const data = {
    typeName,
    unitInfo,
    requestDescription,
    requestTitle,
    amountOfFee,
    socialPage,
    linkToMono,
    private24Wallet,
    anotherWallet,
    cryptoWallet
  };

  const result = await Donat.create({ ...data, owner });

  const populatedResult = await Donat.findById(result._id).populate("owner", "name")
  .populate("typeName", "typeName")
  .populate("unitInfo", "unitName unitAvatarURL");


  res.status(201).json(populatedResult);
};

module.exports = addDonat;
