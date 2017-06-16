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

export default {
  name: 'preview',
  props: ['contents'],
  methods: {
    // parse the markdown language to HTML method
    markdownHtml: function (str) {
      return markdown(str)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
