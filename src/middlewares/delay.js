// Credits: https://github.com/j-/express-simulate-latency

const { Signale } = require('signale')

const log = new Signale({ scope: ' mock.lib.delay ' })

/**
 * Generate a random float between given min and max values
 * @private
 * @param {Number} min Minimum value
 * @param {Number} max Maximum value
 * @return {Number}
 */
const randomInt = (min, max) => min + Math.random() * (max - min)

/**
 * Returns middleware which will introduce latency into the express.js callback
 *   pipeline. Useful for local servers to simulate a remote server.
 * @function express-simulate-latency
 * @param {Object=} options
 * @param {Number} [options.min=0] Minimum wait time
 * @param {Number} [options.max=options.min] Maximum wait time
 * @return {Function} Middleware function
 */
function inject(options) {
  options = options || {}

  const min = options.min || 0
  const max = Math.max(options.max || 0, min)

  return function(req, res, next) {
    const wait = randomInt(min, max)
    log.success(`will delay responses by ${wait}s`)
    setTimeout(next, wait)
  }
}

module.exports = { randomInt, inject }
