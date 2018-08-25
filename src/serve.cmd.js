console.log(process.cwd())

const handler = require('serve-handler')
const http = require('http')
const path = require('path')
const deepmerge = require('deepmerge')
const Orsay = require('./orsay')
const defaultOptions = require('../serve.json')

module.exports = class Dev extends Orsay {
  static get signature () {
    return `serve
      { -c, --config=@value: additional serve-handler config file, relative path }
      { -m, --merge: deepmerge configs }
    `
  }

  static get description () {
    return 'Serve slides in production mode'
  }

  retrieveOptions (config, merge) {
    const optionsPath = path.join(process.cwd(), config)
    const options = config ? require(optionsPath) : {}

    if (merge) {
      return deepmerge(defaultOptions, options)
    }

    return options
  }

  async handle (inputs, { config, merge }) {
    const options = this.retrieveOptions(config, merge)
    console.log(options)

    const server = http.createServer((request, response) => (
      handler(request, response, options)
    ))

    server.listen(5000, () => {
      this.announce('running at http://localhost:5000/')
    })
  }
}
