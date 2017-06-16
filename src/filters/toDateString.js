export function toDateString (val) {
  let timeStr = new Date(val)
  let date = timeStr.toLocaleDateString().replace(/\//g, '-')
  let time = timeStr.toTimeString().split(' ')[0]
  return `${date} ${time}`
}
