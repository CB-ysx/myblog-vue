/**
 * Created by joriscai on 2017/3/31.
 * This is Articles.vue
 */
<template>
  <div class="articles">
    <!-- articles list -->
    <section class="list-box">
      <header class="title border-shadow">
        <span>{{ listTitle }}</span>
        <span class="add-btn" @click="addArticle">
          <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2957">
            <path d="M544 128 480 128 480 480 128 480 128 544 480 544 480 896 544 896 544 544 895.936 544 895.936 480 544 480Z" p-id="3579" fill="#bfbfbf"></path>
          </svg>
        </span>
      </header>
      <div class="list">
        <article v-for="article in articles" @click="showArticle(article)" class="text-box border-shadow" :class="{ active: curent === article.id}">
          <h3 class="article-title">{{ article.title }}</h3>
          <span class="date">{{ article.date }}</span>
          <section class="text">
            {{ article.contents }}
          </section>
        </article>
      </div>
    </section>
    <!-- article preview -->
    <section class="edit-box" v-if="curent">
      <header class="border-shadow">
        <div class="title">
          {{ title }}
        </div>
        <div class="btn-box">
          <button type="button" ref="edit" class="btn success" :value="curent" @click="editArticle" name="publish">Edit</button>
          <button type="button" ref="delete" class="btn error" :value="curent" @click="deleteArticle" name="save">Delete</button>
        </div>
      </header>
      <!-- Preview components -->
      <preview :contents="contents"></preview>
    </section>
      <!-- <header class="border-shadow">
        <input type="text" class="title" placeholder="Your Article Title" maxLength="25" disable="true" v-model="title"/>
        <div class="btn-box">
          <button type="button" class="btn success" name="publish">Edit</button>
          <button type="button" class="btn error" name="save">Delete</button>
        </div>
      </header> -->
      <!-- <link href="//cdn.bootcss.com/github-markdown-css/2.4.1/github-markdown.css" rel="stylesheet">
      <link href="//cdn.bootcss.com/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet">
      <section class="preview markdown-body" v-html="markdownHtml(this.contents)">
      </section> -->

  </div>
</template>

<script>
import Preview from '@/components/Preview'

export default {
  name: 'articles',
  data () {
    return {
      title: '',
      listTitle: 'Articles List',
      articles: [],
      contents: '',
      curent: ''
    }
  },
  components: {
    Preview
  },
  methods: {
    // Show the Article method
    showArticle: function (item) {
      this.title = item.title
      this.curent = item.id
      this.$http.get(this.$root.$data.article + '/' + item.id).then(res => {
        this.contents = res.data.contents
      }, res => {
        console.log(res)
      })
    },
    // Add a Article method
    addArticle: function () {
      this.$router.push({ path: 'editor' })
    },
    // Edit a Article method
    editArticle: function () {
      let id = this.$refs.edit.value
      this.$router.push({ path: 'editor/' + id })
    },
    // Delete a Article method
    deleteArticle: function () {
      console.log('delete')
      console.log(this.$refs.delete.value)
    }
  },
  mounted () {
    // Get the Articles List data
    this.$http.get(this.$root.$data.article).then(res => {
      this.articles = res.data
    }, res => {
      console.log(res)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.articles{
  display: flex;
  flex: 1;
  @at-root .text-box{
    padding: 0 0em 1em 1em;
    cursor: pointer;
    margin-left: 3px;
    margin-right: 3px;
    &:hover,&.active{
      margin-left: 0px;
      border-left: #5ba4e5 3px solid;
    }
    .article-title{
      margin: 0.7em 0 0.2em;
    }
    .date{
      font-size: 0.9em;
    }
    .text{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      text-overflow: ellipsis;
      height: 3.5em;
      overflow: hidden;
    }
  }

  @at-root .edit-box{
    flex: 1;
    flex-direction: column;
    display: flex;
    header{
      display: flex;
      justify-content: space-between;
    }
    .title{
      padding: 0.8em;
      font-size: 1.2em;
      border: none;
      outline: none;
      font-weight: 600;
      flex: 1;
    }
    .btn-box{
      padding: 0.5em;
    }
  }
}
.list-box{
  display: flex;
  width: 23em;
  flex-direction: column;
  border-right: 1px solid rgba(0,0,0,.25);
  .title{
    padding: 1em;
    justify-content: space-between;
    display: flex;
  }
  .list{
    overflow-y: auto;
    overflow-x: hidden;
  }
}
.preview-box{
  flex: 1;
  height: 0; // fix the height overflow the parent elements
  overflow-y: auto;
  overflow-x: hidden;
  .preview{
    padding: 1em 2em 2em;
  }
}
// base.css
.border-shadow{
  border-bottom: 1px solid rgba(0,0,0,.25);
}
.btn{
  display: inline-block;
  padding: 6px 12px;
  font-size: inherit;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  border-radius: 4px;
  &.success{
    color: white;
    background-color: #5cb85c;
    border-color: #4cae4c;
    &:hover{
      background-color: #449d44;
      border-color: #398439;
    }
    &:active,&:focus{
      outline: none;
    }
  }
  &.primary {
    color: white;
    background-color: #337ab7;
    border-color: #2e6da4;
    &:hover{
      background-color: #286090;
      border-color: #204d74;
    }
    &:active,&:focus{
      outline: none;
    }
  }
  &.error {
    color: white;
    background-color: #d9534f;
    border-color: #d43f3a;
    &:hover{
      background-color: #c9302c;
      border-color: #ac2925;
    }
    &:active,&:focus{
      outline: none;
    }
  }
}
</style>
