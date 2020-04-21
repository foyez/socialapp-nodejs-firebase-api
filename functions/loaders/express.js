const bodyParser = require('body-parser'),
  cors = require('cors'),
  errorhandler = require('errorhandler'),
  helmet = require('helmet')

module.exports = (app) => {
  app.use(cors())
  app.use(require('morgan')('dev'))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(require('method-override')())
  app.use(helmet())
  // app.use(compression())

  if (process.env.NODE_ENV === 'development') {
    app.use(errorhandler())
  }

  // API ROUTES
  app.use(require('../routes'))

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not found')
    err['status'] = 404

    next(err)
  })

  // error handlers
  app.use((err, req, res, next) => {
    // console.log(err.name, '===========')

    if (err.name === 'UnauthorizedError' || err.status === 401) {
      const errors = { message: err.message || 'Unauthorized' }

      return res.status(err.status || 401).json({ errors })
    }

    if (err.name === 'ValidationError') {
      return res.status(err.status || 422).json({
        errors: err.details
          ? // Joi error handling
            err.details.reduce((errors, error) => {
              errors[error.path[0]] = error.message

              return errors
            }, {})
          : // Mongoose error handling
            Object.keys(err.errors).reduce(function (errors, key) {
              errors[key] = err.errors[key].message

              return errors
            }, {}),
      })
    }

    return next(err)
  })

  // Handle unknown & server errors
  app.use((err, req, res, next) => {
    // console.log(err.name, '===============')
    const errors = { message: err.message }

    if (require('../config').nodeEnv === 'development') {
      console.log(err.stack)
      errors.error = err
    }

    res.status(err.status || 500)
    res.json({ errors })
  })
}
