import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
  .min(8)
  .max(32)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])/)
  .required()
  .messages({
    "string.min":
      "Password must be at least 8 characters long",
    "string.max":
      "Password must not exceed 32 characters",
    "string.pattern.base":
      "Password must contain uppercase, lowercase, number, and special character",
  }),
  
  role: Joi.string()
    .valid("student", "teacher", "admin")
    .optional(),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .optional(),

  profileImg: Joi.string()
    .uri()
    .optional()
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .required()
});