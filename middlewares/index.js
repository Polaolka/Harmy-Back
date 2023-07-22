const {
  validateBody,
  validateFavoriteBody,
  validateRoleBody,
} = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const validateRole = require("./validateRole");
const {uploadAva, uploadLogo, uploadTypeOfDonats} = require("./upload");

module.exports = {
  validateFavoriteBody,
  validateBody,
  isValidId,
  authenticate,
  validateRoleBody,
  uploadAva,
  uploadLogo,
  uploadTypeOfDonats,
  validateRole
};
