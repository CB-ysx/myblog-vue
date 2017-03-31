/**
 * Created by joriscai on 2017/3/31.
 * This is Admin.vue
 */
<template>
  <div class="">
    {{title}}
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'admin',
  data () {
    return {
      title: 'this is a admin pages'
    }
  },
  mounted () {
    console.log(this.$route)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
