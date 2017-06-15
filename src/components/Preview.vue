/**
 * Created by joriscai on 2017/4/14.
 * This is Preview.vue
 */
<template>
  <div class="preview-box" id="preview">
    <link href="//cdn.bootcss.com/github-markdown-css/2.4.1/github-markdown.css" rel="stylesheet">
    <link href="//cdn.bootcss.com/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet">
    <section class="preview markdown-body" v-html="markdownHtml(context)">
    </section>
  </div>
</template>

<script>
import { markdown } from '@/filters/markdown'

let url = ''
export default {
  name: 'preview',
  props: ['contents'],
  data () {
    return {
      context: this.contents
    }
  },
  watch: {
    contents (val) {
      this.context = val
    },
    context (val) {
      this.$emit('origin-md-change', val)
    }
  },
  methods: {
    // parse the markdown language to HTML method
    markdownHtml: function (str) {
      return markdown(str, true)
    },
    replaceByIndex: function (str, march, index, newStr) {
      let temp = str.match(march)
      let x = str.split(march)
      let num = -1
      let i = 0
      for (let len = x.length; i < len; i++) {
        if (typeof x[i] === 'undefined') {
          ++num
          if (num === index) {
            x[i] = newStr
          } else {
            x[i] = temp[num]
          }
        }
      }
      return x.join('')
    }
  },
  beforeCreate () {
    url = window.blogUrl.articleImg
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
          // function replaceByIndex (str, march, index, newStr) {
          //   let x = str.split(march)
          //   let num = -1
          //   let i = 0
          //   for (len = x.length; i < len; i++) {
          //     if (typeof x[i] === 'undefined') {
          //       ++num
          //       if (num === index) {
          //         x[i] = newStr
          //       } else {
          //         x[i] = '![]()'
          //       }
          //     }
          //   }
          //   return x.join('')
          // }

          let data = new FormData()
          let filename = input.files[0].name
          data.append('image', input.files[0])
          this.$http.post(url, data).then(res => {
            // let img = new Image()
            // img.src = '123'
            // uploads[i].nextSibling.appendChild(img)
            // uploads[i].remove()
            this.context = this.replaceByIndex(this.contents, /!\[(\w|\s)*\]\(\)/g, i, `![${filename}](${res.url})`)
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
            this.$http.post(url, data).then(res => {
              console.log(res)
              this.context = this.replaceByIndex(this.contents, /!\[(\w|\s)*\]\(\)/g, i, `![](${res.url})`)
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
