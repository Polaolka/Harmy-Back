const { Donat } = require("../../models/donat");

const { RequestError } = require("../../helpers");

const addDonatsReport = async (req, res) => {
  const { _id: userId } = req.user;
  const { id: reqId } = req.params;

  const donatData = await Donat.findById(reqId);

  const areEqual = userId.equals(donatData.owner);

  if (!areEqual) {
    res
      .status(403)
      .json({ message: "It is possible to update only own request" });
    return;
  }

  const { reportDescr } = req.body;

  if (!reportDescr) {
    throw RequestError(400, "Report description is required");
  }

  const reportPhoto1Url = req.files[0] ? req.files[0].path : "";
  const reportPhoto2Url = req.files[1] ? req.files[1].path : "";
  const reportPhoto3Url = req.files[2] ? req.files[2].path : "";

  const donat = await Donat.findByIdAndUpdate(
    reqId,
    {
      $set: {
        isReported: true,
        isOpen: false,
        report: {
          reportPhoto1Url,
          reportPhoto2Url,
          reportPhoto3Url,
          reportDescr,
        },
      },
    },
    { new: true }
  )
    .populate("owner", "name")
    .populate("typeName", "typeName")
    .populate("unitInfo", "unitName unitAvatarURL");

  res.status(200).json({
    userId,
    reqId,
    reportPhoto1Url: donat.report.reportPhoto1Url,
    reportPhoto2Url: donat.report.reportPhoto2Url,
    reportPhoto3Url: donat.report.reportPhoto3Url,
    reportDescr: donat.report.reportDescr,
    isReported: donat.isReported,
    isOpen: donat.isOpen,
    requestDescription: donat.requestDescription,
    requestTitle: donat.requestTitle,
    amountOfFee: donat.amountOfFee,
    typeName: donat.typeName.typeName,
    owner: donat.owner.name,
  });
};

module.exports = addDonatsReport;
