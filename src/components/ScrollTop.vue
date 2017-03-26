/**
 * Created by joriscai on 2017/3/26.
 * This is ScrollTop.vue
 */
<template>
  <div id="scroll-top" @click="toTop">
    <div class="triangle-up tb-border"></div>
    <div class="triangle-up tb-background"></div>
    <div class="text">返回顶部</div>
  </div>
</template>

<script>
export default {
  name: 'scroll-top',
  data () {
    return {
    }
  },
  methods: {
    toTop: function () {
      let sHeight = window.pageYOffset  // 用于FF
                     || document.documentElement.scrollTop
                     || document.body.scrollTop
                     || 0
      let goTo = 80
      let speed = 40
      let time = setInterval(function () {
        if (sHeight <= 0) {
          clearInterval(time)
        }
        sHeight -= goTo
        goTo += speed
        window.scrollTo(0, sHeight)
      }, 30)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
$scroll-wh: 2.3em;
#scroll-top{
  position: fixed;
  background: #fff;
  box-shadow: 0 0 5px #E6E6E6;
  border: 1px solid #E6E6E6;
  width: $scroll-wh;
  height: $scroll-wh;
  bottom: 2em;
  right: 2em;
  cursor: pointer;
  .text{
    text-align: center;
    color: #8b8b8b;
    display: none;
    font-size: 1em;
  }
  &:hover .text{
    display: block;

  }
  &:hover .triangle-up{
    display: none;
  }
}
// triangle
$width: 15px;
$top: -5px;
.triangle-up {
  position: absolute;
  overflow: hidden;
  width: 0;
  height: 0;
  left: 50%;
  margin-left: -$width;
  border-width: $width;
  border-style: dashed dashed solid dashed;
  &.tb-background {
    top: $top+2;
    border-color:  transparent transparent #fff transparent;
  }
  &.tb-border {
    top: $top;
    border-color:  transparent transparent #E6E6E6 transparent;
  }
}
</style>
