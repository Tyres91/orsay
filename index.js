#!/usr/bin/env node

const ace = require('@adonisjs/ace')

const publish = require('./src/publish.cmd')
const dev = require('./src/dev.cmd')
const serve = require('./src/serve.cmd')
const hide = require('./src/hide.cmd')

ace.addCommand(publish)
ace.addCommand(dev)
ace.addCommand(serve)
ace.addCommand(hide)

ace.wireUpWithCommander()
ace.invoke()
