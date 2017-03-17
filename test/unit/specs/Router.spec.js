import Vue from 'vue' // eslint-disable-line
import VueRouter from 'vue-router' // eslint-disable-line
import Router from '../../../src/router'

describe('Router', () => {
  it('Router should not be null or err', () => {
		/*eslint-disable */ // 解决eslint检测should未定义
    should.exist(Router)
		/*eslint-enable */
  })
})
