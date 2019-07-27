const delay = require('./delay')

test('generate a random integer', () => {
  expect(delay.randomInt(3, 3)).toBe(3)
})

test('generate a random integer with upper boundary', () => {
  expect(delay.randomInt(0, 6)).toBeLessThan(7)
})

test('generate a random integer with lower boundary', () => {
  expect(delay.randomInt(0, 6)).toBeGreaterThan(0)
})
