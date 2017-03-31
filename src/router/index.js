import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home' // @表示.. ，在webpack中进行了处理
import TimeLine from '@/views/TimeLine'
import Images from '@/views/Images'
import About from '@/views/About'
import Article from '@/views/Article'
import Admin from '@/views/admin/Admin'
// import Publish from '@/views/admin/Publish'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/Home',
      name: 'Home',
      component: Home
    },
    { path: '/Article/:id',
      name: 'Article',
      component: Article
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
    { path: '/Admin',
      name: 'Admin',
      component: Admin,
      children: [
        { path: 'pulish', component: resolve => require(['@/views/admin/Publish'], resolve) }
      ]
    },
    { path: '*', redirect: '/Home' } // catch all redirect, default url

  ]
})
