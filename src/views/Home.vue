<template>
  <div class="home container content">
    <section v-for="article in articles">
      <h3><router-link :to="'/article/'+article.id">{{article.title}}</router-link></h3>
      <span>{{article.date}}</span>
      <router-link :to="'/article/'+article.id">
        <section>
          {{article.contents}}
        </section>
      </router-link>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      title: 'this is a home page',
      articles: []
    }
  },
  mounted () {
    this.$http.get('/articles').then(res => {
      console.log(res.data)
      this.articles = res.data
    }, res => {
      console.log(res)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .container{
    max-width: 840px;
    margin: 0 auto;
  }
  .content{
    padding-top: 60px;
  }
</style>
