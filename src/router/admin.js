import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/views/admin/Admin'
import Login from '@/views/admin/Login'
import Signup from '@/views/admin/Signup'
import Articles from '@/views/admin/Articles'
import Editor from '@/views/admin/Editor'
import Timelines from '@/views/admin/Timelines'
import Images from '@/views/admin/Images'
import Profile from '@/views/admin/Profile'
import Setting from '@/views/admin/Setting'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',
      name: 'admin',
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
        { path: '/timelines',
          name: 'timelines',
          component: Timelines
        },
        // imgaes
        { path: '/images',
          name: 'images',
          component: Images
        },
        // profile
        { path: '/profile',
          name: 'profile',
          component: Profile
        },
        // profile
        { path: '/settings',
          name: 'Setting',
          component: Setting
        }
      ]
    },
    { path: '/login',
      name: 'login',
      component: Login
    },
    { path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
})
