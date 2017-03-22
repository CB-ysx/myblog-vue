<template>
  <div class="article container content">
    <div class="main">
      <article>
        <h1 class="title">{{ article.title }}</h1>
        <span class="date">{{ article.date }}</span>
        <section class="text" v-html="markdownHtml(article.contents)"></section>
      </article>
    </div>
  </div>
</template>

<script>
import { markdown } from '@/filters/markdown'
export default {
  name: 'article',
  data () {
    return {
      title: 'this is a Article page',
      article: {
        title: '',
        date: '',
        contents: ''
      }
    }
  },
  methods: {
    // parse the markdown language to HTML method
    markdownHtml: function (str) {
      return markdown(str)
    }
  },
  mounted () {
    // get to layout data
    console.log(this.$route.params.id)
    this.$http.get('/article/' + this.$route.params.id).then(res => {
      console.log(res.url)
      this.article = res.data
    }, res => {
      console.log(res)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.title{
  font-weight: 500;
  font-size: 1.8em;
}
.date{
  padding-bottom: 10px;
}
article{
  padding: 0.5em 0.8em;
}
</style>
