import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/views/admin/Admin'
import Login from '@/views/admin/Login'
import Articles from '@/views/admin/Articles'
import Editor from '@/views/admin/Editor'
import Timelines from '@/views/admin/Timelines'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',
      name: 'Admin',
      component: Admin,
      children: [
        // article
        {
          path: 'articles',
          component: Articles
        },
        // editor
        {
          path: 'editor',
          component: Editor,
          children: [
            {
              path: ':id',
              component: Editor
            }
          ]
        },
        // timelines
        { path: '/Timelines',
          name: 'Timelines',
          component: Timelines
        }
      ]
    },
    { path: '/Login',
      name: 'Login',
      component: Login
    }
  ]
})
