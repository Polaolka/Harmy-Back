const { Fund } = require("../../models/charitableFund");

const addFund = async (req, res) => {
  const {
    body: { fundName, fundLink },
    file,
  } = req;

  const fundImgURL = file
  ? file.path
  : "https://res.cloudinary.com/dj5smkin6/image/upload/v1690955576/donate_kls686.jpg";
  
  const data = {
    fundName,
    fundLink,
    fundImgURL
  };

  const responce = await Fund.create(data);

  res.status(201).json(responce);
};

module.exports = addFund;
