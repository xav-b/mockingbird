const endpoints = [
  {
    uri: '/users',
    method: 'GET',
    description: 'list subscribers',
    module: './scenarios/users/endpoints',
    scenario: 'listUsers',
  },
  {
    uri: '/users/:id',
    method: 'GET',
    description: 'fetch specific user details',
    module: './scenarios/users/endpoints',
    scenario: 'getUser',
  },
  {
    uri: '/users',
    method: 'POST',
    description: 'create a new user',
    module: './scenarios/users/endpoints',
    scenario: 'createUser',
  },
]

module.exports = {
  endpoints,
}
