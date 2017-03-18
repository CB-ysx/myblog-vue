import Vue from 'vue'
import Home from '@/components/Home'
import HeadNav from '@/components/common/HeadNav'

describe('Home.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Home)
    const vm = new Constructor().$mount()
    // expect(vm.$el.querySelector('.home').textContent)
    //   .to.equal('this is a home page')
    expect(vm.$el.outerText)
      .to.match(/this is a home page/)
  })
})

describe('HeadNav.vue', () => {
  const Constructor = Vue.extend(HeadNav)
  it('should render correct contents', () => {
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.logo').outerText)
      .to.equal('joris\' blog')
    expect(vm.$el.querySelectorAll('li').length)
      .to.equal(4)
  })
  it('should correct action', () => {
    const vm = new Constructor().$mount()
    vm.$children[2].$emit('click')
    expect(vm.selected)
      .to.equal(2)
  })
})
