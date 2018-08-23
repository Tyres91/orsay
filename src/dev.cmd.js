const to = require('uffbasse')
const Orsay = require('./orsay')

module.exports = class Dev extends Orsay {
  static get signature () {
    return `dev
      { name: Filename of specific slides to be shown }
    `
  }

  static get description () {
    return 'Open slides for development'
  }

  async handle ({ name }) {
    name = this.extractName(name)
    const [err, files] = await to(this.findFiles(name))

    if (err || !files.length) {
      this.exit(err ? err.message : `the file '${name}.mdx' does not exist`)
    }

    this.announce('running at http://localhost:8080/')
    this.run(name)
  }
}
