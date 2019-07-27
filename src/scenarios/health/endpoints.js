/**
 * @swagger
 *
 * /health:
 *  get:
 *    description: Advertise API readiness
 *    produces:
 *      - text/html
 *    responses:
 *      200:
 *        description: Health status
*/
const healthy = (req, res) => res.status(200).send('ok')

module.exports = { healthy }
