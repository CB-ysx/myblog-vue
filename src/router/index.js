import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home' // @表示.. ，在webpack中进行了处理
// dynamic import module
const Article = resolve => require.ensure([], () => resolve(require('@/views/Article.vue')), 'Article')
const TimeLine = resolve => require.ensure([], () => resolve(require('@/views/TimeLine.vue')), 'TimeLine')
const Images = resolve => require.ensure([], () => resolve(require('@/views/Images.vue')), 'Images')
const About = resolve => require.ensure([], () => resolve(require('@/views/About.vue')), 'About')

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
    { path: '*', redirect: '/Home' } // catch all redirect, default url
  ]
})
