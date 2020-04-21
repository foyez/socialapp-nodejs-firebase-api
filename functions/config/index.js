const envFound = require('dotenv').config()

if (!envFound) {
  throw new Error("Couldn't find .env file")
}

// required variables
const ENV_VARS = []

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',

  // Preferred port
  port: parseInt(process.env.PORT || 5000),

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  /**
   * API CONFIGS
   */
  api: {
    prefix: '/api',
  },
  checkEnvVariables: () => {
    ENV_VARS.forEach((key) => {
      if (!process.env[key]) {
        throw new Error('ERROR: Missing the environment variable ' + key)
      } else {
        // Check that urls use https
        if ([].includes(key)) {
          const url = process.env[key]
          if (!url.startsWith('https://')) {
            console.log(
              'WARNING: Your ' + key + ' does not begin with "https://"',
            )
          }
        }
      }
    })
  },
}
