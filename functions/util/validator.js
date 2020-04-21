const Joi = require('@hapi/joi')

exports.validateSignUpData = (credentials) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.any()
      .valid(Joi.ref('password'))
      .required()
      .label('confirmPassword')
      .messages({
        'any.only': `"password" must match`,
      }),
    username: Joi.string().alphanum().min(3).max(30).required(),
  })

  return schema.validate(credentials, { abortEarly: false })
}

exports.validateLoginData = (credentials) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    password: Joi.string().required(),
  })

  return schema.validate(credentials, { abortEarly: false })
}
