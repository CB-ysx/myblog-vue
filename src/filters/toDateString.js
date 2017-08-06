export function toDateString (val, needTime) {
  let timeStr = new Date(val)

  let year = timeStr.getFullYear()
  let month = timeStr.getMonth() + 1 + ''
  month = month.length > 1 ? month : '0' + month
  let date = timeStr.getDate() + ''
  date = date.length > 1 ? date : '0' + date

  let time = timeStr.toTimeString().split(' ')[0]
  let dateStr = `${year}-${month}-${date}`

  return !!needTime ? `${dateStr} ${time}` : dateStr
}
