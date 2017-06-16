<template>
  <div class="article container content">
    <div class="main">
      <article v-if="article">
        <h1 class="title">{{ article.title }}</h1>
        <span class="date">{{ article.date }}</span>
        <preview :contents="article.contents"></preview>
      </article>
      <article v-if="!article">
        <h2>该文章不存在！</h2>
      </article>
      <div class="article-footer center">
        <p>讨论请发邮件到<a id="email" :href="'mailto:'+ email">{{ email }}</a></p>
        <p>未经授权，禁止转载</p>
        <div class="btn-pay" id="pay" @click="showPay">赞赏</div>
        <div class="pay-methods" :class="{ hidden: payShow}">
          <template v-for="payImage in payImages">
            <img :src="payImage.url" :alt="payImage.title" :title="payImage.title">
          </template>
          <div class="triangle-down tb-border"></div>
          <div class="triangle-down tb-background"></div>
        </div>
      </div>
    </div>
    <scroll-top></scroll-top>
  </div>
</template>

<script>
import ScrollTop from '@/components/ScrollTop'
import Preview from '@/components/Preview'

export default {
  name: 'article',
  data () {
    return {
      title: 'this is a Article page',
      email: '516003559@qq.com',
      payShow: true,
      payImages: {},
      article: {
        title: '',
        date: '',
        contents: ''
      }
    }
  },
  components: {
    ScrollTop,
    Preview
  },
  methods: {
    showPay: function () {
      this.payShow = !this.payShow
    }
  },
  mounted () {
    // get to layout data
    console.log(this.$route.params.id)
    this.$http.get(window.homeUrl.article + '/' + this.$route.params.id).then(res => {
      console.log(res.data)
      this.article = res.data[0]
    }, res => {
      console.log(res)
    })
    // get the pay images
    this.$http.get(window.homeUrl.pay).then(res => {
      this.payImages = res.data
    }, res => {
      console.log(res)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
article{
  padding: 0.5em 0.8em 3em;
  border-bottom: 1px solid #E6E6E6;
  .title{
    font-weight: 500;
    font-size: 1.8em;
  }
  .date{
    padding-bottom: 10px;
  }
}
.btn-pay{
  border: 1px solid #42b983;
  border-radius: 2em;
  display: inline-block;
  // color: #42b983;
  font-size: 0.8em;
  width: 125px;
  padding: 4px 0;
  text-align: center;
  cursor: pointer;
}
.pay-methods{
  position: absolute;
  background: white;
  border: 1px solid #E6E6E6;
  margin: 0 auto;
  border-radius: 1em;
  width: 360px;
  height: 180px;
  vertical-align: middle;
  left: 50%;
  top: -85px;
  margin-left: -180px;
  box-shadow: 0 0 5px 3px #E6E6E6;
  img{
    margin: 10px 8px;
  }
}
.article-footer{
  position: relative;
  text-align: center;
  padding: 1em;
}
// triangle
.triangle-down {
  position: absolute;
  left: 50%;
  margin-left: -10px;
  overflow: hidden;
  width: 0;
  height: 0;
  border-width: 10px;
  border-style: solid dashed dashed dashed;
  &.tb-background {
    bottom: -19px;
    border-color: #ffffff transparent transparent transparent;
  }
  &.tb-border {
    bottom: -20px;
    border-color: #ccc transparent transparent transparent;
  }
}
</style>
