/**
 * Created by joriscai on 2017/3/23.
 * This is the filters test file
 */
import Vue from 'vue'
import { markdown } from '@/filters/markdown'

// Markdown test case
describe('Markdown', () => {
  it('basic usage', () => {
    const vm = new Vue({
      template: '<div>{{ msg | markdownTo }}</div>',
      data: {
        msg: '# hello'
      },
      filters: {
        markdownTo: str => markdown(str)
      }
    }).$mount()
    expect(vm.$el.textContent).to.include('<h1 id="hello">hello</h1>')
  })
})
