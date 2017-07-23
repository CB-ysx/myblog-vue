/**
 * Created by joriscai on 2017/6/14.
 * This is PreviewEdit.vue
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
      context: this.contents,
      imgHost: ''
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
    markdownHtml (str) {
      return markdown(str, true)
    },
    // replace markdown Syntax of image by index
    replaceByIndex (str, reg, index, newStr) {
      let num = -1
      return str.replace(reg, function (match, offset, string) {
        console.log('replace')
        num++
        if (num === index) {
          return newStr
        }
        return match
      })
    },
    // add url and title for markdown Syntax of image
    replaceMdImg (index, filename, url) {
      this.context = this.replaceByIndex(this.contents, /!\[.*\]\(\)/g, index, `![${filename}](${this.imgHost}/${url} "${filename}")`)
    },
    // image upload cancel handle
    uploadCancel (cancel, ready, upload) {
      console.log(cancel.handle)
      typeof cancel.handle === 'function' && cancel.handle()
      ready.removeAttribute('style')
      upload.removeAttribute('style')
    },
    // generate the vue-resource options about progess...
    uploadMethods (cancel, ready, upload, progress) {
      return {
        before (req) {
          ready.style.display = 'none'
          upload.style.display = 'block'
          // get abort function
          this.$nextTick(() => {
            cancel.handle = req.abort
          })
        },
        progress (e) {
          let val = e.loaded / e.total * 100
          console.log(val + '%')
          progress.value = val
        }
      }
    }
  },
  beforeCreate () {
    url = window.blogUrl.articleImg
  },
  mounted () {
    // get upload image hostname and port
    this.imgHost = url.match(/^(((\w+):)*\/\/)([^/:]+)(:\d*)?/g)
  },
  updated () {
    let uploads = document.querySelectorAll('.upload-box')
    if (uploads.length) {
      for (let i = 0, len = uploads.length; i < len; i++) {
        let input = uploads[i].querySelector('input')
        let progress = uploads[i].querySelector('progress')
        let cancelBtn = uploads[i].querySelector('button')
        let pasteBox = uploads[i].querySelector('.paste')

        let readyBox = uploads[i].querySelector('.ready')
        let uploadingBox = uploads[i].querySelector('.uploading')
        let cancel = {}
        // cancel a file to upload
        cancelBtn.addEventListener('click', () => {
          this.uploadCancel(cancel, readyBox, uploadingBox)
        }, true)
        // alert a file selector
        pasteBox.addEventListener('click', function (e) {
          console.log(input)
          input.click()
        }, true)
        // upload the image
        input.addEventListener('change', (e) => {
          let data = new FormData()
          let filename = input.files[0].name
          data.append('image', input.files[0])
          this.$http.post(url, data, this.uploadMethods(cancel, readyBox, uploadingBox, progress)).then(res => {
            console.log('uploaded')
            // this.context = this.replaceByIndex(this.contents, /!\[.*\]\(\)/g, i, `![${filename}](${this.imgHost}/${res.data.url})`)
            // replace origin text
            this.replaceMdImg(i, filename, res.data.url)
          }, res => {
            console.log(res)
          })
        })

        // paste
        pasteBox.addEventListener('paste', (e) => {
          e.preventDefault()
          console.log(e)
          console.log('paste')
          if (e.clipboardData && e.clipboardData.items[0].type.indexOf('image') > -1) {
            let file = e.clipboardData.items[0].getAsFile()
            let data = new FormData()
            data.append('image', file)
            this.$http.post(url, data, this.uploadMethods(cancel, readyBox, uploadingBox, progress)).then(res => {
              console.log(res)
              // replace origin text
              this.replaceMdImg(i, '', res.data.url)
            }, res => {
              console.log(res)
            })
          } else {
            // warn alert
            alert('Please copy a image to clipboard!')
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
  .progress{
    width: 100%;
  }
}
</style>
