/**
 * Created by joriscai on 2017/3/31.
 * This is Pulish.vue
 */
<template>
  <div class="">
    {{title}}
  </div>
</template>

<script>
export default {
  name: 'pulish',
  data () {
    return {
      title: 'this is a pulish pages'
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
