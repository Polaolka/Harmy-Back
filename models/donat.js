const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const donatSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "user" },
    typeName: {
      type: Schema.Types.ObjectId,
      ref: "type",
      required: true,
    },
    unitInfo: {
      type: Schema.Types.ObjectId,
      ref: "unit",
      required: true,
    },
    requestTitle: {
      type: String,
      required: [true, "Set request title"],
    },
    requestDescription: {
      type: String,
      required: [true, "Set description"],
    },
    amountOfFee: {
      type: String,
      required: [true, "Set target amount"],
    },
    socialPage: {
      type: String,
      required: [true, "Set social page"],
    },
    linkToMono: {
      type: String,
      default: "",
    },
    private24Wallet: {
      type: String,
      default: "",
    },
    anotherWallet: {
      type: String,
      default: "",
    },
    cryptoWallet: {
      type: String,
      default: "",
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    isReported: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    report: {
      type: {
        reportDescr: { type: String, default: "" },
        reportPhoto1Url: { type: String, default: "" },
        reportPhoto2Url: { type: String, default: "" },
        reportPhoto3Url: { type: String, default: "" },
      },
      default: {
        reportDescr: "",
        reportPhoto1Url: "",
        reportPhoto2Url: "",
        reportPhoto3Url: "",
      },
    },
  },
  { versionKey: false, timestamps: true }
);

donatSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  typeName: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    "string.base": "The request`s typeName must be a string.",
    "string.pattern": "The request`s typeName must be a valid ObjectId string.",
    "any.required": "The request`s typeName field is required.",
  }),
  unitInfo: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    "string.base": "The request`s unitInfo must be a string.",
    "string.pattern": "The request`s unitInfo must be a valid ObjectId string.",
    "any.required": "The request`s unitInfo field is required.",
  }),
  requestTitle: Joi.string().min(4).max(25).required().messages({
    "string.base": "The requestTitle must be a string.",
    "string.min": "The requestTitle must be at least 4.",
    "string.max": "The requestTitle cannot exceed 25.",
    "any.required": "The requestTitle field is required.",
  }),
  requestDescription: Joi.string().min(20).max(150).required().messages({
    "string.base": "The requestDescription must be a string.",
    "string.min": "The requestDescription must be at least 20.",
    "string.max": "The requestDescription cannot exceed 150.",
    "any.required": "The requestDescription field is required.",
  }),
  amountOfFee: Joi.string().min(3).max(8).regex(/^[0-9a]{8}$/).required().messages({
    "string.base": "The amountOfFee must be a string.",
    "string.min": "The amountOfFee must be at least 20.",
    "string.max": "The amountOfFee cannot exceed 150.",
    "any.required": "The amountOfFee field is required.",
  }),
  socialPage: Joi.string().uri().required().messages({
    "string.base": "The socialPage must be a string.",
    "string.uri": "The socialPage must be a valid URL.",
    "any.required": "The socialPage field is required.",
  }),
});

const schemas = {
  registerSchema,
};

const Donat = model("donat", donatSchema);

module.exports = {
  schemas,
  Donat,
};
