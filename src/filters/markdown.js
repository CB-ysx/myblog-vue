import marked from 'marked'

let renderer = new marked.Renderer()

renderer.image = function (href, title, text) {
  if (!href.trim().length) {
    return `<div class="upload-box">\
        <span>Click here upload</span>\
        <input type="file" accept="image/*" class="hidden"/>\
        <div class="paste" contenteditable readonly></div>\
        </div>`
  }

  let out = '<img src="' + href + '" alt="' + text + '"'
  if (title) {
    out += ' title="' + title + '"'
  }
  out += '/>'
  return out
}

marked.setOptions({
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: true,
  smartLists: true,
  smartypants: true
})

export function markdown (str, editable) {
  if (editable) {
    return marked(str, { renderer: renderer })
  }
  return marked(str)
}
