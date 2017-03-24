<template>
  <footer>
    <p>
      Copyright © 2017{{dateNow > 2017 ? ' - ' + dateNow : ''}} <a href="#">joris' blog</a>
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
    color: #8b8b8b;
    padding: 0.5em;
    a{
      color: #8b8b8b;
      text-decoration: underline;
    }
  }
</style>
