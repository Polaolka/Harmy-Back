const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const donatSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "user" },
    typeName: { type: Schema.Types.ObjectId, ref: "type", required: true },
    unitInfo: { type: Schema.Types.ObjectId, ref: "unit", required: true },
    // unitInfo: 
    //     {
    //       // _id: false,
    //       // id: {
    //       //   type: String,
    //       //   ref: "unit",
    //       // },
    //       unitName: {
    //         type: String,
    //         ref: "unit",
    //       },
    //       unitAvatarURL: {
    //         type: String,
    //         ref: "unit",
    //       },
    //     },
    donatDescription: {
      type: String,
      required: [true, "Set description"],
    },
    amountOfFee: {
      type: String,
      default: "",
    },
    socialPage: {
      type: String,
      default: "",
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
  },
  { versionKey: false, timestamps: true }
);

donatSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().min(1).max(16).required().messages({
    "string.base": "The name must be a string.",
    "string.min": "The name must be at least 1.",
    "string.max": "The name cannot exceed 16.",
    "any.required": "The name field is required.",
  }),
  email: Joi.string().required().messages({
    "string.base": "The email must be a string.",
    "string.pattern": "The email must be a valid email address.",
    "any.required": "The email field is required.",
  }),
  password: Joi.string().min(6).max(16).required().messages({
    "string.base": "The password must be a string.",
    "string.min": "The password must be at least 6.",
    "string.max": "The password cannot exceed 16.",
    "string.pattern": "The password must be a valid password.",
    "any.required": "The password field is required.",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    "string.base": "The email must be a string.",
    "string.pattern": "The email must be a valid email address.",
    "any.required": "The email field is required.",
  }),
  password: Joi.string().min(6).max(16).required().messages({
    "string.base": "The password must be a string.",
    "string.min": "The password must be at least 6.",
    "string.max": "The password cannot exceed 16.",
    "any.required": "The password field is required.",
  }),
});

const verifySchema = Joi.object({
  email: Joi.string().required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  verifySchema,
};

const Donat = model("donat", donatSchema);

module.exports = {
  schemas,
  Donat,
};
