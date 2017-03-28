import Vue from 'vue'
import HeadNav from '@/components/HeadNav'
import Foot from '@/components/Foot'

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
