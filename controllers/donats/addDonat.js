const { Donat } = require("../../models/donat");
// const { Unit } = require("../../models/unit");

const addDonat = async (req, res) => {
  const { _id: owner } = req.user;

  const { typeName, donatDescription, amountOfFee, socialPage, linkToMono, private24Wallet, anotherWallet, cryptoWallet, unitInfo } = req.body;


  const data = {
    typeName,
    unitInfo,
    donatDescription,
    amountOfFee,
    socialPage,
    linkToMono,
    private24Wallet,
    anotherWallet,
    cryptoWallet
  };

  const result = await Donat.create({ ...data, owner });

  console.log(result);

  res.status(201).json(result);
};

module.exports = addDonat;
