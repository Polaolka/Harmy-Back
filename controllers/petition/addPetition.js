const { Petition } = require("../../models/petition");

const addPetition = async (req, res) => {
  const { _id: owner } = req.user;

  const {
    petitionName,
    petitionDescr,
    petitionLink
  } = req.body;

  const data = {
    petitionName,
    petitionDescr,
    petitionLink
  };

  const responce = await Petition.create({ ...data, owner });
  console.log(responce);

  res.status(201).json(responce);
};

module.exports = addPetition;
