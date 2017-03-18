import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home' // @表示.. ，在webpack中进行了处理

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/Home',
      name: 'Home',
      component: Home
    },
    { path: '*', redirect: '/Home' } // catch all redirect, default url
  ]
})
