const { Unit } = require("../../models/unit");

const addUnit = async (req, res) => {
  const { _id: owner } = req.user;
console.log(owner);
  const {
    body: { unitName },
    file,
  } = req;

  const unitAvatarURL = file
    ? file.path
    : "https://res.cloudinary.com/dj5smkin6/image/upload/v1690797240/Logo_AFU_muedwl.png";

  const data = {
    unitName,
    unitAvatarURL,
  };

  const responce = await Unit.create({ ...data, owner });
  console.log(responce);

  res.status(201).json(responce);
};

module.exports = addUnit;
