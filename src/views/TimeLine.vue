<template>
  <div class="time-line container content">
    <div class="main">
      <h3>{{ title }}</h3>
      <ul class="time-lines">
        <li v-for="timeLine in sorted" :data-id="timeLine.id">
          <strong>{{timeLine.date}}</strong>{{timeLine.title}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'timeLine',
  data () {
    return {
      title: '记录生活琐碎',
      timeLines: []
    }
  },
  methods: {
    compare: function (obj1, obj2) {
      let val1 = new Date(obj1.date)
      let val2 = new Date(obj2.date)
      return val2 - val1
    }
  },
  computed: {
    sorted: function () {
      return this.timeLines.sort(this.compare)
    }
  },
  mounted () {
    // get the timeLine datas
    this.$http.get('/time-line').then(res => {
      console.log(res.url)
      this.timeLines = res.data
    }, res => {
      console.log(res)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
ul.time-lines,ul.contact{
  list-style: disc;
  padding: 0 40px;
  li{
    margin-bottom: 1em;
  }
  strong{
    padding-right: 8px;
  }
}
</style>
