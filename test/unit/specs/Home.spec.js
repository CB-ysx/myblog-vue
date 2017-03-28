import Vue from 'vue'
import Home from '@/views/Home'

// Home.vue test case
describe('Home.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Home)
    const vm = new Constructor().$mount()
    expect(vm.$el.classList.contains('home'))
      .to.true
  })
})
