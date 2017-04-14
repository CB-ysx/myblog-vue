import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/views/admin/Admin'
import Login from '@/views/admin/Login'
import Articles from '@/views/admin/Articles'

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
        }
      ]
    },
    { path: '/Login',
      name: 'Login',
      component: Login
    }
  ]
})
