require('dotenv').config()

const bunyan = require('bunyan')

const log = {
    development: () => {
        return bunyan.createLogger({ name: 'Slackbot-Time-development', level: 'debug' })
    },
    production: () => {
        return bunyan.createLogger({ name: 'Slackbot-Time-production', level: 'info' })
    },
    test: () => {
        return bunyan.createLogger({ name: 'Slackbot-Time-test', level: 'fatal' })
    },
}

module.exports = {
    geoLocationToken: process.env.GOOGLE_GEO_CODE_TOKEN,
    // Use Bunyan Npm package
    log: (env) => {
        if (env) return log[env]()
        return log[process.env.NODE_ENV || 'development']()
    }
}
