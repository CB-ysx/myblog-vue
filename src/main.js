// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
// [].forEach.call(document.querySelectorAll('*'), function (a) {
//   a.style.outline = '1px solid #' + (~~(Math.random() * (1 << 24))).toString(16)
// })
