/**
 * Created by joriscai on 2017/4/6.
 * This is the Images.vue test file
 */
import Vue from 'vue'
import Images from '@/views/Images'

// Images.vue test case
describe('Images.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Images)
    const vm = new Constructor().$mount()
    expect(vm.$el.classList.contains('images'))
      .to.true
  })
})
