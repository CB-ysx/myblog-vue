<template>
  <div class="time-line container content">
    <div class="main">
      <h2 v-if="showTips" class="text-center">
        There is no timeline yet！
      </h2>
      <div v-if="timeLines.length">
        <h3>{{ title }}</h3>
        <ul class="time-lines">
          <li v-for="timeLine in sorted" :data-id="timeLine.id">
            <strong>{{ timeLine.date | toDateString }}</strong>{{timeLine.title}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { toDateString } from '@/filters/toDateString'

export default {
  name: 'timeLine',
  data () {
    return {
      title: '记录生活琐碎',
      timeLines: [],
      showTips: false
    }
  },
  filters: {
    toDateString
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
    this.$http.get(window.homeUrl.timeline).then(res => {
      console.log(res.url)
      this.timeLines = res.data
      this.showTips = !this.timeLines.length
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
