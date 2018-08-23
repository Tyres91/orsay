#!/usr/bin/env node

const ace = require('@adonisjs/ace')

const publish = require('./src/publish.cmd')
const dev = require('./src/dev.cmd')

ace.addCommand(publish)
ace.addCommand(dev)

ace.wireUpWithCommander()
ace.invoke()
