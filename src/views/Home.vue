<template>
  <div class="home container content">
    <div class="main">
      <h2 v-if="showTips" class="text-center">
        There is no article yet！
      </h2>
      <section class="text-box" v-for="article in articles">
        <router-link :to="'/Article/'+ article.id">
          <h2><span class="title">{{article.title}}</span></h2>
          <span class="date">{{ article.created_at | toDateString(true) }}</span>
          <section class="text">
            {{article.contents}}
          </section>
        </router-link>
      </section>
    </div>
  </div>
</template>

<script>
import { toDateString } from '../filters/toDateString'

export default {
  name: 'Home',
  data () {
    return {
      title: 'this is a home page',
      articles: [],
      showTips: false
    }
  },
  filters: {
    toDateString
  },
  mounted () {
    this.$http.get(window.homeUrl.article).then(res => {
      this.articles = res.data
      this.showTips = !this.articles.length
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
  .text-center{
    text-align: center;
  }
  .main{
    padding: 1em 0 2em;
    line-height: 1.6em;
    font-family: -apple-system,Helvetica Neue,Arial,PingFang SC,Hiragino Sans GB,STHeiti,Microsoft YaHei,Microsoft JhengHei,Source Han Sans SC,Noto Sans CJK SC,Source Han Sans CN,Noto Sans SC,Source Han Sans TC,Noto Sans CJK TC,WenQuanYi Micro Hei,SimSun,sans-serif;
    .text-box{
      padding: 1em 0.8em;
      border-bottom: 1px solid #E6E6E6;
      &:hover .title{
        border-bottom: 2px solid #42b983;
      }
      h2{
        margin: 0;
        padding: 0.5em 0;
        font-weight: 400;
        color: #2c3e50;
      }
    }
    .date{
      font-family: Comic Sans MS,curslve,sans-serif;
      // font-size: 1.2em;
      display: inline-block;
      padding: 0 0 0.4em 0;
      color: #8b8b8b;
    }
    .text{
      color: #34495e;
    }
    a{
      color: black;
    }
  }
</style>
