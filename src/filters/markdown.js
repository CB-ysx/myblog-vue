import marked from 'marked'

marked.setOptions({
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: true
})

export function markdown (str) {
  return marked(str)
}
