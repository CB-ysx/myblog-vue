import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home' // @表示.. ，在webpack中进行了处理
import TimeLine from '@/components/TimeLine'
import Images from '@/components/Images'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/Home',
      name: 'Home',
      component: Home
    },
    { path: '/TimeLine',
      name: 'TimeLine',
      component: TimeLine
    },
    { path: '/Images',
      name: 'Images',
      component: Images
    },
    { path: '/About',
      name: 'About',
      component: About
    },
    { path: '*', redirect: '/Home' } // catch all redirect, default url
  ]
})
