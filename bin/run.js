'use strict'

const request = require('superagent')
const service = require('../server/service')
const http = require('http')

const server = http.createServer(service)
server.listen()

server.on('listening', function() {
  console.log(`Slack-Time is listening on port ${server.address().port}`)

  const announce = () => {
    request.put(
      `http://127.0.0.1:3000/service/time/${server.address().port}`,
      (err, res) => {
        if (err) {
          console.log(err)
          console.log('Error connecting to SlackBot Main')
        }
        console.log(res.body)
      }
    )
  }
  announce()
  setInterval(announce, 15 * 1000)
})
