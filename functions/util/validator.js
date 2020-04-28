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

exports.validateCommentData = (data) => {
  const schema = Joi.object({
    body: Joi.string().required(),
  })

  return schema.validate(data, { abortEarly: false })
}

const isEmpty = (string) => {
  if (string.trim() === '') return true
  else return false
}

exports.validateUpdateUserDetails = (user) => {
  const { username, email, bio, website, location } = user
  let userDetails = {}

  // if (typeof username !== 'undefined' && !isEmpty(username))
  //   userDetails.username = username
  if (typeof email !== 'undefined' && !isEmpty(email)) userDetails.email = email
  if (typeof bio !== 'undefined' && !isEmpty(bio)) userDetails.bio = bio
  if (typeof location !== 'undefined' && !isEmpty(location))
    userDetails.location = location
  if (typeof website !== 'undefined' && !isEmpty(website)) {
    userDetails.website =
      website.trim().substring(0, 4) !== 'http'
        ? `http://${website.trim()}`
        : website
  }

  return userDetails
}
