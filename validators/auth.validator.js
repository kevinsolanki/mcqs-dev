const Joi = require("joi");

exports.userSignInSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().required(),
});

exports.userSignUpSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().regex(
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  ),
  // role: Joi.string().valid("student", "teacher").required(),
  roleId: Joi.string().hex().length(24).required(),
  techId: Joi.string().hex().length(24),
  adminId: Joi.string().hex().length(24),
});

exports.tokenSchema = Joi.object({
  token: Joi.string()
    .regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/)
    .required(),
});
