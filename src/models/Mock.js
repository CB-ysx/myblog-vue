import Mock from 'mockjs'

/**
 * Methods
 */
Mock.mock('/articles', (ops) => {
  return pages.data
})
Mock.mock('/article', (ops) => {
  return page.data
})
Mock.mock('/time-line', (ops) => {
  return timeLine.data
})
Mock.mock('/images', (ops) => {
  return images.data
})
Mock.mock('/about', (ops) => {
  return about.data
})

/**
 * Data Template
 */
// articleList
const pages = Mock.mock({
  'data|1-20': [{
    'id|+1': 1,
    'title': '@ctitle()',
    'date': '@datetime("yyyy-MM-dd HH:mm:ss")',
    'contents': '@cparagraph(5, 15)'
  }]
})
// article
const page = Mock.mock({
  'data': [{
    'id|1-10': 1,
    'title': '@ctitle()',
    'date': '@datetime("yyyy-MM-dd HH:mm:ss")',
    'contents': '@cparagraph(100, 500)'
  }]
})
// images
const images = Mock.mock({
  'data|1-20': [{
    'id|1-10': 1,
    'title': '@ctitle()',
    'img': Mock.Random.dataImage()
  }]
})
// timeLine
const timeLine = Mock.mock({
  'data|1-10': [{
    'id|+1': 1,
    'title': '@ctitle(5, 20)',
    'date': '@datetime("yyyy-MM-dd HH:mm:ss")'
  }]
})
// about
const about = Mock.mock({
  'data': [{
    'name': '@cname',
    'intro': '@cparagraph(5, 10)'
  }]
})

export default Mock
