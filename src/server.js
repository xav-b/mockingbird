/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const yaml = require('js-yaml')
const fs = require('fs')
const { Signale } = require('signale')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const injectLatency = require('./middlewares/delay')

const log = new Signale({ scope: ' mockingbird.server ' })

function build(project) {
  log.info(`setting up project ${project}`)
  // TODO caporal cli to start? Env var?
  const config = yaml.safeLoad(fs.readFileSync(`${project}/config.yml`, 'utf8'))

  // NOTE can do better.
  const whitelist = ['http://localhost:4000', 'http://localhost:3001']

  const app = express()

  app.use(morgan('dev'))
  app.use(cors({ origin: whitelist }))
  // parse requests
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  // adjust user-defined modules
  config.endpoints.forEach((endpoint, idx) => {
    config.endpoints[idx].module = `${process.cwd()}/${project}/${endpoint.module}.js`
  })

  // append built-in scenarios to the endpoints list
  config.scenarios.forEach((scenario, idx) => {
    log.info(`mounting new scenario: ${scenario.name}`)
    const specs = require(`./scenarios/${scenario.name}/specs.js`)
    specs.endpoints.forEach(endpoint => {
      // overwrite uri if it was provided
      const baseUri = config.scenarios[idx].mount || specs.base_uri || ''
      // TODO add '/' if necessary
      endpoint.uri = baseUri + endpoint.uri

      config.endpoints.push(endpoint)
    })
  })

  // API explorer setup
  const swaggerSpec = swaggerJSDoc({
    definition: {
      info: {
        title: config.title || 'API Explorer',
        version: config.api_version || '1',
        description: config.description || null,
      },
    },
    apis: config.endpoints.map(endpoint => endpoint.module),
  })
  log.info(`mounting API explorer on '/__explore'`)
  app.use('/__explore', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }))

  // create the post command
  // NOTE is it the best way of configuring it?
  config.endpoints.forEach(endpoint => {
    log.debug(`registering endpoint: ${endpoint.method} ${endpoint.uri} (${endpoint.description})`)

    // NOTE support more middlewares?
    // NOTE always inject it as a default?
    const middleware = endpoint.latency
      ? injectLatency({ min: endpoint.latency })
      : (req, res, next) => next()

    // FIXME lack checks
    app[endpoint.method.toLowerCase()](
      endpoint.uri,
      middleware,
      require(endpoint.module)[endpoint.scenario]
    )
  })

  return app
}

module.exports = { build }
