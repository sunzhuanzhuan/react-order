import moment from "moment";

export const previewHtml = (_html, title) => {
  return `
<!Doctype html><html><head><link rel="shortcut icon" href="http://www.weiboyi.com/favicon.ico"><title>${title||'预览'}</title><style>html,body{height:100%;margin:0;padding:0;overflow:auto;background-color:#fff}.container{box-sizing:border-box;max-width:677px;min-height:100%;margin:0 auto;padding:30px 8px;overflow:hidden;background-color:#fff}.braft-output-content p{min-height:1em}.braft-output-content .image-wrap img{max-width:100%;height:auto}.braft-output-content ul,.braft-output-content ol{margin:16px 0;padding:0}.braft-output-content blockquote{margin:0 0 10px 0;padding:15px 20px;background-color:#f1f2f3;border-left:solid 5px #ccc;color:#666;font-style:italic}.braft-output-content pre{max-width:100%;max-height:100%;margin:10px 0;padding:15px;overflow:auto;background-color:#f1f2f3;border-radius:3px;color:#666;font-family:monospace;font-size:14px;font-weight:normal;line-height:16px;word-wrap:break-word;white-space:pre-wrap}.braft-output-content pre pre{margin:0;padding:0}.braft-output-content{overflow:hidden}.braft-output-content video{width:100%}</style></head><body><div class="container braft-output-content">${_html}</div></body></html>
    `
}

export const getCountDownTimeText = (date) => {
  const diff = moment(date) - moment()
  const duration = moment.duration(diff, 'milliseconds')
  if (diff < 300000) {
    return '小于5分钟'
  }
  const obj = {
    diff,
    days: duration.days(),
    hours: duration.hours(),
    minutes: duration.minutes()
  }
  let text = ''
  text += obj.days ? obj.days + '天 ' : '';
  text += obj.hours ? obj.hours + '小时 ' : '';
  text += obj.minutes ? obj.minutes + '分钟' : '';
  return text
}
