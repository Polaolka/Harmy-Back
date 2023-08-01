const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const petitionSchema = new Schema({
    petitionName: {
      type: String,
      required: [true, "Set name of the petition"],
    },
    petitionDescr: {
      type: String,
      required: [true, "Set description of the petition"],
    },
    petitionLink: {
      type: String,
      required: [true, "Set link of the petition"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  }, { versionKey: false }
);

petitionSchema.post("save", handleMongooseError);

const addPetitionSchema = Joi.object({
    petitionName: Joi.string().min(5).required().messages({
    "string.base": "The petition`s name must be a string.",
    "string.min": "The petition`s name must be at least 5.",
    "any.required": "The petition`s name field is required.",
  }),
  petitionDescr: Joi.string().min(10).required().messages({
    "string.base": "The petition`s description must be a string.",
    "string.min": "The petition`s description must be at least 10.",
    "any.required": "The petition`s description field is required.",
  }),
  petitionLink: Joi.string().min(5).required().messages({
    "string.base": "The petition`s link must be a string.",
    "string.min": "The petition`s link must be at least 5.",
    "any.required": "The petition`s link field is required.",
  }),
});

const schemas = {
    addPetitionSchema,
};

const Petition = model("petition", petitionSchema);

module.exports = {
  schemas,
  Petition,
};
