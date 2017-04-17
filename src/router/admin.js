import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/views/admin/Admin'
import Login from '@/views/admin/Login'
import Articles from '@/views/admin/Articles'
import Editor from '@/views/admin/Editor'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: 'articles',
          component: Articles
        },
        {
          path: 'editor',
          component: Editor,
          children: [
            {
              path: ':id',
              component: Editor
            }
          ]
        }
      ]
    },
    { path: '/Login',
      name: 'Login',
      component: Login
    }
  ]
})
