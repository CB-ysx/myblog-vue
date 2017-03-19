// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false  // 关闭提示处于开发环境

/* eslint-disable no-unused-vars */
var vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
/* eslint-enable */

// [].forEach.call(document.querySelectorAll('*'), function (a) {
//   a.style.outline = '1px solid #' + (~~(Math.random() * (1 << 24))).toString(16)
// })
