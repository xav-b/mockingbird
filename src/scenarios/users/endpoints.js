const faker = require('faker')

// TODO there is a node trick to have them
// TODO make it easier and global to integrate
const HTTP_CREATED = 201
const HTTP_OK = 200

// TODO inspect tpl in case it's not json
const transform = tpl => JSON.parse(faker.fake(JSON.stringify(tpl)))

// TODO in utils
// TODO switch between seq, uuid, random, ...
const fakeID = () => Math.round(Math.random() * 10000)

// TODO add created at and updated at
const userTpl = userid => ({
  id: userid || fakeID(),
  first_name: '{{name.firstName}}',
  last_name: '{{name.lastName}}',
})

function listUsers(req, res) {
  if (req.db) {
    const users = req.db.get('users')

    return res.status(200).json({ users })
  }

  // NOTE random size?
  const users = Array(6)
    .fill(null)
    .map(() => transform(userTpl()))

  return res.status(200).json({ users })
}

/**
 * @swagger
 *
 * /users/:id:
 *  get:
 *    description: Provide specific user details
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: User details
 */
function getUser(req, res) {
  if (req.db) {
    const user = req.db.get('users', { id: req.params.id })

    return res.status(HTTP_OK).json(user)
  }

  const user = transform(userTpl(req.params.id))

  return res.status(HTTP_OK).json(user)
}

function createUser(req, res) {
  const newUser = req.body
  newUser.id = fakeID()
  newUser.created_at = new Date()
  newUser.updated_at = new Date()

  if (req.db) {
    req.db.set('users', 'id', newUser)
  }

  return res.status(HTTP_CREATED).json(newUser)
}

module.exports = { listUsers, getUser, createUser }
