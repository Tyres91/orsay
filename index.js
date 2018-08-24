#!/usr/bin/env node

const ace = require('@adonisjs/ace')

const publish = require('./src/publish.cmd')
const dev = require('./src/dev.cmd')
const serve = require('./src/serve.cmd')

ace.addCommand(publish)
ace.addCommand(dev)
ace.addCommand(serve)

ace.wireUpWithCommander()
ace.invoke()
