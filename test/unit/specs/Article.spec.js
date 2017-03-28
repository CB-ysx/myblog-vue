import Vue from 'vue'
import Article from '@/views/Article'

// Article.vue test case
describe('Article.vue', () => {
  const Constructor = Vue.extend(Article)
  const vm = new Constructor().$mount()
  it('should render correct contents', () => {
    expect(vm.$el.classList.contains('article'))
      .to.true
  })
  it('should correct email address', () => {
    expect(vm.$el.querySelector('#email').outerText)
      .to.match(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/)
  })
  it('should correct pay function', () => {
    vm.$el.querySelector('#pay').click()
    expect(vm.payShow)
      .to.false
  })
})
