import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/views/admin/Admin'
import Login from '@/views/admin/Login'
// dynamic import module
const Signup = resolve => require.ensure([], () => resolve(require('@/views/admin/Signup.vue')), 'Signup')
const Articles = resolve => require.ensure([], () => resolve(require('@/views/admin/Articles.vue')), 'Articles')
const Editor = resolve => require.ensure([], () => resolve(require('@/views/admin/Editor.vue')), 'Editor')
const Timelines = resolve => require.ensure([], () => resolve(require('@/views/admin/Timelines.vue')), 'Timelines')
const Images = resolve => require.ensure([], () => resolve(require('@/views/admin/Images.vue')), 'Images')
const Profile = resolve => require.ensure([], () => resolve(require('@/views/admin/Profile.vue')), 'Profile')
const Setting = resolve => require.ensure([], () => resolve(require('@/views/admin/Setting.vue')), 'Setting')

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
