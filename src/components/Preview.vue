/**
 * Created by joriscai on 2017/4/14.
 * This is Preview.vue
 */
<template>
  <div class="preview-box" id="preview">
    <link href="//cdn.bootcss.com/github-markdown-css/2.4.1/github-markdown.css" rel="stylesheet">
    <link href="//cdn.bootcss.com/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet">
    <section class="preview markdown-body" v-html="markdownHtml(contents)">
    </section>
  </div>
</template>

<script>
import { markdown } from '@/filters/markdown'
// import simplemde from 'simplemde'
export default {
  name: 'preview',
  props: ['contents'],
  methods: {
    // parse the markdown language to HTML method
    markdownHtml: function (str) {
      return markdown(str, true)
    }
  },
  updated () {
    let uploads = document.querySelectorAll('.upload-box')
    if (uploads.length) {
      for (let i = 0, len = uploads.length; i < len; i++) {
        let input = uploads[i].querySelector('input')
        // alert a file selector
        uploads[i].querySelector('.paste').addEventListener('click', function (e) {
          input.click()
        }, true)
        // upload the image
        input.addEventListener('change', (e) => {
          // let filename = input.files[0].name
          // console.log(this.contents.split(/!\[(\w||\s)*\]\(\)/g))
          let data = new FormData()
          data.append('image', input.files[0])
          this.$http.post('/private/image', data).then(res => {
            console.log(res)
            let img = new Image()
            img.src = '123'
            uploads[i].nextSibling.appendChild(img)
            uploads[i].remove()
          }, res => {
            console.log(res)
          })
        })
        // paste
        uploads[i].addEventListener('paste', (e) => {
          e.preventDefault()
          console.log(e.clipboardData.items)
          if (e.clipboardData && e.clipboardData.items[0].type.indexOf('image') > -1) {
            // let reader = new FileReader()
            let file = e.clipboardData.items[0].getAsFile()
            let data = new FormData()
            data.append('image', file)
            this.$http.post('/url', data).then(res => {
              console.log(res)
            }, res => {
              console.log(res)
            })
          }
        }, false)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.preview-box{
  .upload-box{
    position: relative;
    cursor: pointer;
    padding: 1em;
    width: 100%;
    background: #f6f7f8;
    border-radius: 4px;
    color: #808284;
    text-align: center;
  }
  .paste{
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
