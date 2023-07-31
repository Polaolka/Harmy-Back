const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const unitsSchema = new Schema({
  unitName: {
    type: String,
    required: [true, "Set name of the unit"],
  },
  unitAvatarURL: {
    type: String,
    default: "",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
}, { versionKey: false });

unitsSchema.post("save", handleMongooseError);

const getUnitSchema = Joi.object({
  unitName: Joi.string().min(2).required().messages({
    "string.base": "The name must be a string.",
    "string.min": "The name must be at least 2.",
    "any.required": "The name field is required.",
  }),
});
const addUnitSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.base": "The name must be a string.",
    "string.min": "The name must be at least 2.",
    "any.required": "The name field is required.",
  }),
});

const schemas = {
  getUnitSchema,
  addUnitSchema,
};

const Unit = model("unit", unitsSchema);

module.exports = {
  schemas,
  Unit,
};
