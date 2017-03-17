<template>
  <div id="app">
    <head-nav></head-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import HeadNav from './components/common/HeadNav.vue' // 引用非路由控制的公共组件
export default {
  name: 'app',
  components: {  // 引用公共组件
    HeadNav
  }
}
</script>

<style lang="scss">
@import 'assets/base.css';
/**
 * content
 */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
