const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;

const allowedRoles = ["user", "volunteer", "admin"];

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name"],
      minlength: 1,
      maxlength: 16,
    },
    password: {
      type: String,
      required: [true, "Set password"],
      minlength: 6,
      // match: passRegex,
    },
    email: {
      type: String,
      required: [true, "Set Email"],
      unique: true,
      match: emailRegex,
    },
    role: {
      type: String,
      enum: allowedRoles,
      default: "user",
    },
    token: {
      type: String,
      default: "",
    },
    fbUrl: {
      type: String,
      default: "",
    },
    twitterUrl: {
      type: String,
      default: "",
    },
    instaUrl: {
      type: String,
      default: "",
    },
    siteUrl: {
      type: String,
      default: "",
    },
    otherUrl: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().min(1).max(16).required().messages({
    "string.base": "The name must be a string.",
    "string.min": "The name must be at least 1.",
    "string.max": "The name cannot exceed 16.",
    "any.required": "The name field is required.",
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.base": "The email must be a string.",
    "string.pattern": "The email must be a valid email address.",
    "any.required": "The email field is required.",
  }),
  password: Joi.string().min(6).max(16).pattern(passRegex).required().messages({
    "string.base": "The password must be a string.",
    "string.min": "The password must be at least 6.",
    "string.max": "The password cannot exceed 16.",
    "string.pattern": "The password must be a valid password.",
    "any.required": "The password field is required.",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
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

const updateRoleSchema = Joi.object({
  role: Joi.string().required().valid(...allowedRoles),
  id: Joi.string().required(),
});

const verifySchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateRoleSchema,
  verifySchema,
};

const User = model("user", userSchema);

module.exports = {
  schemas,
  User,
};
