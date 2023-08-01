const { Petition } = require("../../models/petition");

const deleteOnePetition = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Petition.findById(id);

  const areEqual = owner.equals(result.owner);

  if (!areEqual) {
    res
      .status(403)
      .json({ message: "It is possible to delete only own petition" });
    return;
  }

  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  await Petition.findByIdAndDelete(id);

  res.status(200).json({ message: `Petition id:${id} deleted` });
};

module.exports = deleteOnePetition;
