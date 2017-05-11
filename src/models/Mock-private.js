import Mock from 'mockjs'

/**
 * Methods
 */
Mock.mock(/\/private\/article(\/\w{1,})?/, /(post|put|delete)/, (ops) => {
  return ops
})
Mock.mock(/\/private\/timeline(\/\w{1,})?/, /(post|put|delete)/, (ops) => {
  return ops
})
Mock.mock(/\/private\/image(\/\w{1,})?/, /(post|put|delete)/, (ops) => {
  return ops
})
Mock.mock(/\/private\/about(\/\w{1,})?/, /(post|put|delete)/, (ops) => {
  return ops
})

export default Mock
