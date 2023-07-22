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

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "The name must be a string.",
    "string.min": "The name must be at least 3.",
    "string.max": "The name cannot exceed 30.",
    "any.required": "The name field is required.",
  }),
});

const schemas = {
  addSchema,
};

const Type = model("type", typeSchema);

module.exports = {
  schemas,
  Type,
};