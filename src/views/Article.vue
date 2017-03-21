<template>
  <div class="article container content">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'article',
  data () {
    return {
      title: 'this is a Article page'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
