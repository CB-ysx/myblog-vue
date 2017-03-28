import Vue from 'vue'
import About from '@/views/About'

// About.vue test case
describe('About.vue', () => {
  const Constructor = Vue.extend(About)
  const vm = new Constructor().$mount()
  it('should render correct contents', () => {
    expect(vm.$el.classList.contains('about'))
      .to.true
  })
})
