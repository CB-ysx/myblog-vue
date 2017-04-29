/**
 * Created by joriscai on 2017/4/29.
 * This is Timelines.vue
 */
<template>
  <div class="timelines">
    {{ title }}
    <p>
      {{ data }}      
    </p>
  </div>
</template>

<script>
export default {
  name: 'timelines',
  data () {
    return {
      title: 'timelines page',
      data: ''
    }
  },
  methods: {
  },
  mounted () {
    // Get the Timelines List data
    this.$http.get('/time-line').then(res => {
      console.log(res.data)
      this.data = res.data
    }, res => {
      console.log(res)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.timelines{
}
</style>
