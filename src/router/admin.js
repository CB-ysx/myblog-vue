import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/views/admin/Admin'
import Login from '@/views/admin/Login'
// import Publish from '@/views/admin/Publish'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',
      name: 'Admin',
      component: Admin
    },
    { path: '/Login',
      name: 'Login',
      component: Login
    }
  ]
})
