// https://github.com/van-nguyen/webpack-cdn-plugin

module.exports = {
  modules: [
    {
      name: 'vue',
      var: 'Vue',
      path: 'dist/vue.min.js'
    },
    {
      name: 'vue-resource',
      var: 'VueResource',
      path: 'dist/vue-resource.min.js'
    },
    {
      name: 'vue-router',
      var: 'VueRouter',
      path: 'dist/vue-router.min.js'
    },
    {
      name: 'marked',
      path: 'marked.min.js'
    }
  ],
  // prodUrl: '//cdn.bootcss.com/:name/:version/:name.min.js'
  prodUrl: '//unpkg.com/:name@:version/:path'
}
