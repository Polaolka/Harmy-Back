const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const charitableFundSchema = new Schema(
  {
    fundName: {
      type: String,
      required: [true, "Set name of the fund"],
    },
    fundImgURL: {
      type: String,
      default: "",
    },
    fundLink: {
      type: String,
      required: [true, "Set link of the fund"],
    },
  },
  { versionKey: false }
);

charitableFundSchema.post("save", handleMongooseError);

const addFundSchema = Joi.object({
  fundName: Joi.string().min(5).required().messages({
    "string.base": "The fund`s name must be a string.",
    "string.min": "The fund`s name must be at least 5.",
    "any.required": "The fund`s name field is required.",
  }),
  fundLink: Joi.string().min(5).required().messages({
    "string.base": "The fund`s link must be a string.",
    "string.min": "The fund`s link must be at least 5.",
    "any.required": "The fund`s link field is required.",
  }),
});

const fundSchemas = {
  addFundSchema,
};

const Fund = model("fund", charitableFundSchema);

module.exports = {
  fundSchemas,
  Fund,
};
