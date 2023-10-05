const {
  validateBody,
  validateFavoriteBody,
  validateRoleBody,
} = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const validateRole = require("./validateRole");
const validateVolunteerRole = require("./validateVolunteerRole");
const {uploadAva, uploadLogo, uploadTypeOfDonats, uploadUnits, uploadReport, uploadFund} = require("./upload");
// const passport = require("./passport");


module.exports = {
  validateFavoriteBody,
  validateBody,
  isValidId,
  authenticate,
  validateRoleBody,
  uploadAva,
  uploadLogo,
  uploadTypeOfDonats,
  uploadUnits,
  uploadReport,
  uploadFund,
  validateRole,
  validateVolunteerRole,
  // passport
};
