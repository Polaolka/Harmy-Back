const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const typeSchema = new Schema(
  {
    typeName: {
      type: String,
      required: [true, "Set name for type"],
    },
  },
  { versionKey: false, timestamps: true }
);

typeSchema.post("save", handleMongooseError);

const addTypeOfDonatsSchema = Joi.object({
  typeName: Joi.string().min(3).max(30).required().messages({
    "string.base": "The typeName must be a string.",
    "string.min": "The typeName must be at least 3.",
    "string.max": "The typeName cannot exceed 30.",
    "any.required": "The typeName field is required.",
  }),
});

const typeShemas = {
  addTypeOfDonatsSchema
};

const Type = model("type", typeSchema);

module.exports = {
  typeShemas,
  Type,
};