'use strict'

const config = require('../config/index')
const express = require('express')
const request = require('superagent')
const moment = require('moment')
const service = express()

service.get('/service/:location', (req, res, next) => {
  request.get(
    'https://maps.googleapis.com/maps/api/geocode/json?address=' +
      req.params.location +
      '&key=' +
      config.geoLocationToken,
    (err, response) => {
      if (err) {
        console.log(err)
        return res.sendStatus(500)
      }
      // res.json(response.body.results[0].geometry.location)

      const location = response.body.results[0].geometry.location
      const timeStamp = +moment().format('X')

      request.get(
        'https://maps.googleapis.com/maps/api/timezone/json?location=' +
          location.lat +
          ',' +
          location.lng +
          '&timestamp=' +
          timeStamp +
          '&key=' +
          config.geoLocationToken,
        (err, response) => {
          if (err) {
            console.log(err)
            return res.sendStatus(500)
          }
          const result = response.body
          const timeString = moment
            .unix(timeStamp + result.dstOffset + result.rawOffset)
            .utc()
            .format('dddd, MMMM, Do YYYY, h:mm:ss a')
          res.json({ result: timeString })
        }
      )
    }
  )
  //   res.json({ result: req.params.location })
})

module.exports = service
