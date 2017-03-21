import Vue from 'vue'
import Home from '@/views/Home'
import HeadNav from '@/components/HeadNav'
import Foot from '@/components/Foot'

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
  // it('should correct action', () => {
  //   const vm = new Constructor().$mount()
  //   for (var i = 0; i < vm.$children.length; i++) {
  //     vm.$children[i].$emit('click')
  //     expect(vm.selected)
  //       .to.equal(i)
  //   }
  // })
})

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
