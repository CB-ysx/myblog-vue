/**
 * Created by joriscai on 2017/4/7.
 * This is the Admin.vue test file
 */
import Vue from 'vue'
import Admin from '@/views/admin/Admin'

// Admin.vue test case
describe('Admin.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Admin)
    const vm = new Constructor().$mount()
    expect(vm.$el.classList.contains('admin'))
      .to.true
  })
})
