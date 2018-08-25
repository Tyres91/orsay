const path = require('path')
const fs = require('fs')
const deepmerge = require('deepmerge')
const Orsay = require('./orsay')
const defaultOptions = require('../serve.json')

module.exports = class Dev extends Orsay {
  static get signature () {
    return `serve
      { -c, --config=@value: custom serve-handler config file, relative path }
      { -m, --merge: enable deepmerging both configs }
    `
  }

  static get description () {
    return 'Get configuration for production mode'
  }

  retrieveOptions (config, merge) {
    let options = {}

    if (config) {
      options = require(path.join(process.cwd(), config))
    }

    if (merge || !config) {
      return deepmerge(defaultOptions, options)
    }

    return options
  }

  async handle (inputs, { config, merge }) {
    const options = this.retrieveOptions(config, merge)
    const content = JSON.stringify(options, null, 2)
    const configPath = path.join(process.cwd(), 'serve.json')

    fs.writeFileSync(configPath, content)
  }
}
