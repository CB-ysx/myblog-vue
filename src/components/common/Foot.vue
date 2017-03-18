<template>
  <footer>
    <p>
      Copyright © 2017-{{dateNow}} <a href="#">joris' blog</a>
    </p>
    <p>
      粤ICP备xxxxxx号
    </p>
  </footer>
</template>

<script>
export default {
  name: 'foot',
  data () {
    return {
    }
  },
  computed: {
    dateNow: function () {
      let date = new Date()
      return date.getFullYear()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .container{
    max-width: 840px;
    margin: 0 auto;
  }
  footer{
    text-align: center;
  }
</style>
