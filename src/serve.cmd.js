
const handler = require('serve-handler')
const http = require('http')
const Orsay = require('./orsay')
const options = require('../serve.json')

module.exports = class Dev extends Orsay {
  static get signature () {
    return 'serve'
  }

  static get description () {
    return 'Serve slides in production mode'
  }

  async handle () {
    const server = http.createServer((request, response) => (
      handler(request, response, options)
    ))

    server.listen(5000, () => {
      this.announce('running at http://localhost:5000/')
    })
  }
}
