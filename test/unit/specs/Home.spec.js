import Vue from 'vue'
import Home from '@/views/Home'
import Article from '@/views/Article'
import HeadNav from '@/components/HeadNav'
import Foot from '@/components/Foot'

// Home.vue test case
describe('Home.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Home)
    const vm = new Constructor().$mount()
    expect(vm.$el.classList.contains('home'))
      .to.true
  })
})

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

// HeadNav.vue test case
describe('HeadNav.vue', () => {
  const Constructor = Vue.extend(HeadNav)
  it('should render correct contents', () => {
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.logo').outerText)
      .to.equal('joris\' blog')
    expect(vm.$el.querySelectorAll('li').length)
      .to.equal(4)
  })
})

// Foot.vue test case
describe('Foot.vue', () => {
  const Constructor = Vue.extend(Foot)
  const vm = new Constructor().$mount()
  it('should render correct contents', () => {
    expect(vm.$el.querySelector('a').outerText)
      .to.equal('joris\' blog')
  })
  it('should correct Date', () => {
    let now = new Date().getFullYear()
    expect(vm.dateNow)
      .to.equal(now)
  })
})
