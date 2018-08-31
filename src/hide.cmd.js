const Orsay = require('./orsay')

module.exports = class Publish extends Orsay {
  static get signature () {
    return `hide
      { name: Filename of specific slides to be hidden }
    `
  }

  static get description () {
    return 'Remove slides from \'./public\''
  }

  async handle ({ name }) {
    name = this.extractName(name)

    const deleteFiles = await this.confirm('Are you sure you want to delete selected slides?')

    if (deleteFiles) {
      this.hide(name)
      this.announce('slides successfully hidden')
    }
  }
}
