<template>
  <div id="app">
    admin
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'admin',
  components: {  // 引用公共组件
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
