#!/usr/bin/env node

const prog = require('caporal')
const { Signale } = require('signale')
const pkg = require('./package.json')
const serveCmd = require('./src/commands/serve')

const log = new Signale({ scope: ' mockingbird.cli    ' })

prog.version(pkg.version).description(pkg.description)

serveCmd.register(prog, log)

prog.parse(process.argv)
