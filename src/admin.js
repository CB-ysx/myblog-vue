// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Admin from './AdminApp'
import router from './router/admin'
import VueResource from 'vue-resource'
// import Mock from './models/Mock' // eslint-disable-line
// import MockPrivate from './models/Mock-private' // eslint-disable-line
import VueClip from 'vue-clip'
import Vuelidate from 'vuelidate'

Vue.use(VueClip)
Vue.use(VueResource)
Vue.use(Vuelidate)

Vue.http.options.emulateJSON = true
Vue.http.options.credentials = true
// Vue.http.options.xhr = {withCredentials: true}

Vue.config.productionTip = false  // 关闭提示处于开发环境

// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

/* eslint-disable no-unused-vars */
var vm = new Vue({
  el: '#app',
  router,
  template: '<Admin/>',
  components: { Admin },
  data () {
    return {
    }
  },
  beforeCreate () {
    console.log('beCreate')
    if (!window.blogUrl) {
      let xmlHttp = new XMLHttpRequest()
      xmlHttp.open('GET', '/static/admin.json', false)
      xmlHttp.send(null)
      window.blogUrl = JSON.parse(xmlHttp.responseText)
    }
  }
})
/* eslint-enable */

// [].forEach.call(document.querySelectorAll('*'), function (a) {
//   a.style.outline = '1px solid #' + (~~(Math.random() * (1 << 24))).toString(16)
// })
