const globby = require('globby')
const path = require('path')
const Orsay = require('./orsay')

module.exports = class Publish extends Orsay {
  static get signature () {
    return `publish
      { name?=*: Filename of specific slides to be published }
      { -f, --force: Force publishing even already published slides }
    `
  }

  static get description () {
    return 'Publish slides to \'./public\''
  }

  async getPublishedSlides (force) {
    const skipped = ['index']
    const slides = ['./public/*', '!./public/assets/']
    const dirOnly = {
      expandDirectories: false,
      onlyFiles: false
    }

    return [
      ...skipped,
      ...(force ? [] : await globby(slides, dirOnly).map(x => path.basename(x))
      )
    ]
  }

  async handle ({ name }, { force }) {
    name = this.extractName(name)

    const published = await this.getPublishedSlides(!!force || !!name)
    const slides = await this.findFiles(name)

    slides
      .map(this.extractName)
      .filter(x => !published.includes(x))
      .forEach(x => this.run(x, ['screenshot', 'build']))

    this.run('index', ['build'], true)
    this.announce('slides successfully published')
    this.cloneAssets()
    this.announce('assets successfully cloned')
    this.cleanup()
    this.announce('temporary files successfully deleted')
  }
}
