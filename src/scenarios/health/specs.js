const endpoints = [
  {
    uri: '/health',
    method: 'GET',
    description: 'binary API health check',
    scenario: 'healthy',
    module: './scenarios/health/endpoints',
  },
]

module.exports = {
  endpoints,
}
