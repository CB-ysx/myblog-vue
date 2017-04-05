<template>
  <div class="images container content">
    <div class="main">
      <ul>
        <li v-for="(img, index) in images">
          <div class="img-box" :data-index="index" @click="showImage($event)" :style="'transform:rotate(' + getRotate() + 'deg)'">
          <!-- <div class="img-box" :style="{'transform':'rotate(' + getRotate() + 'deg)'}"> -->
            <img :src="img.img" :alt="img.title" :title="img.title">
            <span>{{ img.title }}</span>
          </div>
        </li>
      </ul>
    </div>
    <template v-if="showCurrent">
      <div class="full-bg">
        <div class="close" @click="closeImage">X</div>
        <template v-if="images[showCurrent]">
          <div class="full-img-box">
            <img :src="images[showCurrent].Bimg" :alt="images[showCurrent].title" :title="images[showCurrent].title">
            <h2>{{ images[showCurrent].title }}</h2>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Images',
  data () {
    return {
      images: {},
      showCurrent: null
    }
  },
  methods: {
    getRotate: function () {
      if (this.showCurrent) { // 阻止data数据更新重新计算
        return
      }
      return Math.floor(Math.random() * 15 - 6)
    },
    showImage: function (e) {
      console.log('click')
      this.showCurrent = e.currentTarget.attributes['data-index'].value
    },
    closeImage: function () {
      this.showCurrent = null
    }
  },
  mounted () {
    // get the timeLine datas
    this.$http.get('/images').then(res => {
      console.log(res.data)
      this.images = res.data
    }, res => {
      console.log(res)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.full-bg{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 200;
  padding: 1.6em 0;
  background-color: rgba(0,0,0,0.7);
  .full-img-box{
    background-color: #f9f9f9;
    max-height: 92%;
    height: 92%;
    padding: 1em 1em 0em;
    margin: 0 1.6em;
    position: relative;
  }
  img{
    max-height: 91%;
    height: 91%;
  }
  h2{
    margin: 1em 0 0;
  }
  .close{
    position: absolute;
    z-index: 300;
    right: 0.5em;
    top: 0.5em;
    cursor: pointer;
    width: 2em;
    height: 2em;
    line-height: 2em;
    text-align: center;
    border: 1px solid #f9f9f9;
    box-shadow: 0px 0px 1px 0px;
    border-radius: 50%;
    background-color: #f9f9f9;
  }
}
.images{
  text-align: center;
  li{
    display: inline-block;
  }
  .img-box{
    display: inline-block;
    padding: 0.5em;
    margin: 0.6em;
    background-color: white;
    box-shadow: 0px 0px 15px 0px;
    &:hover{
      transform: rotate(0)!important;
      transform: scale(1.5)!important;
      background-color: white;
      z-index: 100;
      position: relative;
    }
    img{
      display: block;
      margin-bottom: 0.5em;
    }
  }
}
</style>
