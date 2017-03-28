import Vue from 'vue'
import TimeLine from '@/views/TimeLine'

// TimeLine.vue test case
describe('TimeLine.vue', () => {
  const Constructor = Vue.extend(TimeLine)
  const vm = new Constructor().$mount()
  it('should render correct contents', () => {
    expect(vm.$el.classList.contains('time-line'))
      .to.true
  })
  it('should render correct timeLines', () => {
    vm.timeLines = [{'id': 1,
      'title': 'test01',
      'date': '2005-12-17'
    },
    {'id': 8,
      'title': 'test08',
      'date': '1998-04-16'
    },
    {'id': 5,
      'title': 'test05',
      'date': '2002-08-01'
    }]
    let test = [{'id': 1,
      'title': 'test01',
      'date': '2005-12-17'
    },
    {'id': 5,
      'title': 'test05',
      'date': '2002-08-01'
    },
    {'id': 8,
      'title': 'test08',
      'date': '1998-04-16'
    }]
    vm.sorted // trigger the sorted function
    expect(vm.timeLines)
      .to.deep.equal(test)
  })
})
