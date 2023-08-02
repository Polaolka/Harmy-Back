const { Fund } = require("../../models/charitableFund");

const deleteOneFund = async (req, res) => {
  const { id } = req.params;

  const result = await Fund.findById(id);

  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  await Fund.findByIdAndDelete(id);

  res.status(200).json({ message: `Fund id:${id} deleted` });
};

module.exports = deleteOneFund;
