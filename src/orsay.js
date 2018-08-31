const ace = require('@adonisjs/ace')
const path = require('path')
const globby = require('globby')
const del = require('del')
const { execSync } = require('child_process')

module.exports = class Orsay extends ace.Command {
  extractName (x) {
    return path.basename(x, '.mdx')
  }

  async findFiles (name) {
    return globby([`./${name}.mdx`])
  }

  print (type, msg) {
    this[type]('')
    this[type](`  ${type}: ${msg}`)
    this[type]('')
  }

  exit (msg) {
    this.print('error', msg)
    process.exit(1)
  }

  announce (msg) {
    this.print('info', msg)
  }

  run (name, cmds = [''], index = false) {
    const destination = path.join('public', index ? '' : name)

    cmds.forEach(x => {
      execSync(`mdx-deck ${x} ${name}.mdx -d ${destination}`)
    })
  }

  cloneAssets () {
    execSync('cp -r ./assets/ public/assets/')
  }

  hide (name) {
    execSync(`rm -rf ./public/${name}/`)
  }

  cleanup () {
    del(['./public/**/TEMP/'])
  }
}
