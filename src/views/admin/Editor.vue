/**
 * Created by joriscai on 2017/4/16.
 * This is Editor.vue
 */
<template>
  <div class="editor edit-box">
    <header class="border-shadow">
      <!-- Title input -->
      <div class="input-box">
        <input type="text" class="title" v-model="title"/>
        <hr class="line">
      </div>
      <!-- Publish and Save button -->
      <div class="btn-box">
        <button type="button" ref="publish" class="btn success" :value="curent" @click="publishArticle" name="publish">Publish</button>
        <button type="button" ref="save" class="btn primary" :value="curent" @click="saveArticle" name="save">Save</button>
      </div>
    </header>
    <section class="input-preview">
      <!-- input textarea -->
      <section class="input-md">
        <textarea ref="editor" v-model="contents"></textarea>
        <footer class="foot">
          <span>Markdown</span>
          <span>words: {{ count.word }}， line: {{ count.lines }}</span>
        </footer>
      </section>
      <!-- Markdown preview -->
      <section class="preview-md">
        <preview :contents="contents"></preview>
        <footer class="foot">Preview</footer>
      </section>
    </section>
  </div>
</template>

<script>
import Preview from '@/components/Preview'

let editor = null
let preview = null
let preHeight = null
let editHeight = null
let top = null

export default {
  name: 'editor',
  data () {
    return {
      title: '',
      contents: '',
      id: '',
      count: {
        word: 0,
        lines: 0
      }
    }
  },
  components: {
    Preview
  },
  watch: {
    contents: function () {
      // update the Height and scrollTop when context change
      top = editor.scrollTop
      preHeight = preview.scrollHeight
      editHeight = editor.scrollHeight
      // count word and line for contents
      let word = this.contents.replace(/<[^>]+>/g, '')
      let chinese = word.match(/[\u4e00-\u9fa5]/g) ? word.match(/[\u4e00-\u9fa5]/g).length : 0
      let english = word.match(/[\w]+/g) ? word.match(/[\w]+/g).length : 0
      this.count.word = chinese + english
      this.count.lines = word.match(/\r?\n|\r/g).length
    }
  },
  methods: {
    publishArticle: function () {
      console.log('publish')
      if (this.id) { // update article by id
        this.$http.put(this.$root.$data.article + '/' + this.id).then(res => {
          this.contents = res.data.contents
        }, res => {
          console.log(res)
        })
      } else { // add a article
        this.$http.post(this.$root.$data.article + '/' + this.id).then(res => {
          this.contents = res.data.contents
        }, res => {
          console.log(res)
        })
      }
    },
    saveArticle: function () {
      if (this.id) { // update article by id
        this.$http.put(this.$root.$data.article + '/' + this.id, { title: this.title, contents: this.contents }).then(res => {
          console.log(res)
        }, res => {
          console.log(res)
        })
      } else { // add a article
        this.$http.post(this.$root.$data.article + '/' + this.id, { title: this.title, contents: this.contents }).then(res => {
          console.log(res)
        }, res => {
          console.log(res)
        })
      }
    }
  },
  updated () {
    // get the Accurate ScrollHeight
    if (preHeight === preview.scrollHeight && editHeight === editor.scrollHeight) {
      return
    }
    preHeight = preview.scrollHeight
    editHeight = editor.scrollHeight
  },
  mounted () {
    // get the Element
    editor = this.$refs.editor
    preview = document.getElementById('preview')
    // scroll event handle
    editor.addEventListener('scroll', function (e) {
      top = e.target.scrollTop
      preview.scrollTop = (top / editHeight) * preHeight
    })

    // get the article that to edit
    let id = this.$route.params.id
    this.id = id
    console.log(id)
    if (id) {
      // Get the Article by id
      this.$http.get(this.$root.$data.article + '/' + id).then(res => {
        this.title = res.data.title
        this.contents = res.data.contents
      }, res => {
        console.log(res)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.editor{
  flex: 1;
  display: flex;
  .input-preview{
    flex: 1;
    display: flex;
    flex-direction: row;
    .foot{
      background: #f5f7f8;
      padding: 0.5em 1em;
      justify-content: space-between;
      display: flex;
    }
    .input-md{
      flex: 1;
      display: flex;
      flex-direction: column;
      border-right: 1px solid #C0C0C0;
      textarea{
        flex: 1;
        overflow-y: auto;
        resize: none;
        outline: none;
        border: none;
        padding: 1em;
        font-size: 1.1em;
        font-weight: 100;
        line-height: 1.2em;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      }
    }
    .preview-md{
      flex: 1;
      flex-direction: column;
      display: flex;
    }
  }
}
// Input
.edit-box .input-box{
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  .line{
    display: block;
    border: none;
    border-bottom: 3px solid #42b983;
    margin: 0;
    position: absolute;
  }
  .title:focus + .line{
    animation: borderLineShow .5s forwards;
    width: 100%;
    left: 0;
  }
}
// Input Line transition
@keyframes borderLineShow {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
@keyframes borderLineHidden {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}
</style>
