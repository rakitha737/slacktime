'use strict'

const request = require('superagent')
const config = require('../config')
const service = require('../server/service')(config)
const http = require('http')
const log = config.log()

const server = http.createServer(service)
server.listen()

server.on('listening', function() {
    log.info(`Slack-Time is listening on port ${server.address().port}`)

    const announce = () => {
        request
            .put(`http://127.0.0.1:3000/service/time/${server.address().port}`)
            .set('X-SLACK-SERVICE-API-TOKEN', config.serviceAccessToken)
            .set('X-SLACK-BOT-API-TOKEN', config.slackBotApiToken)
            .end((err, res) => {
                if (err) {
                    log.error('Error connecting to SlackBot Main')
                } else {
                    log.info(res.body)
                }
            })
    }
    announce()
    setInterval(announce, 15 * 1000)
})
