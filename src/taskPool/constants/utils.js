import moment from "moment";

// 打开新窗口预览
export const openNewWindowPreviewForWeixin = ({ title = "", content = "", remark = "", author = "" }) => {
  const htmlTemplate = `
<!Doctype html><html><head><link rel="shortcut icon" href="http://www.weiboyi.com/favicon.ico"><title>${title || '预览'}</title><style>html,body{height:100%;margin:0;padding:0;overflow:auto;background-color:#fff}.container{box-sizing:border-box;max-width:677px;min-height:100%;margin:0 auto;padding:30px 8px;overflow:hidden;background-color:#fff}.braft-output-content p{min-height:1em}.braft-output-content .image-wrap img{max-width:100%;height:auto}.braft-output-content ul,.braft-output-content ol{margin:16px 0;padding:0}.braft-output-content blockquote{margin:0 0 10px 0;padding:15px 20px;background-color:#f1f2f3;border-left:solid 5px #ccc;color:#666;font-style:italic}.braft-output-content pre{max-width:100%;max-height:100%;margin:10px 0;padding:15px;overflow:auto;background-color:#f1f2f3;border-radius:3px;color:#666;font-family:monospace;font-size:14px;font-weight:normal;line-height:16px;word-wrap:break-word;white-space:pre-wrap}.braft-output-content pre pre{margin:0;padding:0}.braft-output-content{overflow:hidden}.braft-output-content video{width:100%}.header-title{font-weight: 400;font-size: 22px;line-height: 1.4;margin-bottom: 14px;}.header-author{color: rgba(0, 0, 0, .3);margin-bottom: 22px;line-height: 20px;font-size: 15px;word-wrap: break-word;word-break: break-all;}</style></head><body>
<div class="container braft-output-content"><h2 class="header-title">${title}</h2><header class="header-author"><p>${author}</p></header><blockquote style="display: ${remark ? 'block' : 'none'}"><section class=""><section><span style="letter-spacing: 0.5px;font-size: 14px;">${remark}</span><span style="letter-spacing: 0.5px;font-size: 15px;"></span><span style="font-size: 14px;letter-spacing: 0.5px;"></span></section></section></blockquote>${content}</div></body></html>
    `
  if (window.previewWindow) {
    window.previewWindow.close()
  }
  window.previewWindow = window.open()
  window.previewWindow.document.write(htmlTemplate)
  window.previewWindow.document.close()
}

// 打开新窗口预览
export const openNewWindowPreviewForWeibo = ({ content = "", video = "", images = [], mediaType }, type = "direct") => {
  let imagesStr, videoSrc;
  if (mediaType === 1) {
    imagesStr = images.reduce((str, src) => {
      str += `<li><a target="_blank" href="${src}" style="background-image: url('${src}')" /></li>`
      return str
    }, ``)
  } else if (mediaType === 2) {
    videoSrc = video
  }

  const htmlTemplate = `
<!Doctype html><html><head><link rel="shortcut icon" href="http://www.weiboyi.com/favicon.ico"><title>${'预览'}</title><style>html,body{height:100%;margin:0;padding:0;overflow:auto;background-color:#fff}.container{box-sizing:border-box;max-width:677px;min-height:100%;margin:0 auto;padding:30px 8px;overflow:hidden;background-color:#fff}.braft-output-content p{min-height:1em}.braft-output-content .image-wrap img{max-width:100%;height:auto}.braft-output-content ul,.braft-output-content ol{margin:16px 0;padding:0}.braft-output-content blockquote{margin:0 0 10px 0;padding:15px 20px;background-color:#f1f2f3;border-left:solid 5px #ccc;color:#666;font-style:italic}.braft-output-content pre{max-width:100%;max-height:100%;margin:10px 0;padding:15px;overflow:auto;background-color:#f1f2f3;border-radius:3px;color:#666;font-family:monospace;font-size:14px;font-weight:normal;line-height:16px;word-wrap:break-word;white-space:pre-wrap}.braft-output-content pre pre{margin:0;padding:0}.braft-output-content{overflow:hidden}.braft-output-content video{width:100%}.header-title{font-weight: 400;font-size: 22px;line-height: 1.4;margin-bottom: 14px;}.header-author{color: rgba(0, 0, 0, .3);margin-bottom: 22px;line-height: 20px;font-size: 15px;word-wrap: break-word;word-break: break-all;}.material-images-wrap{display:flex;margin:0;padding:0;flex-wrap:wrap}.material-images-wrap li{margin:0 10px 10px 0;display:block;width:210px;height:210px;overflow:hidden}.material-images-wrap li a{display:block;cursor:pointer;transition:all .3s;width:100%;height:100%;background:no-repeat center;background-size:cover;background-color: #f8f8f8;}.material-images-wrap li a:hover{transform:scale(1.2)}.material-video-wrap{text-align:center}</style></head><body>
<div class="container braft-output-content"><p>${content}</p><ul class='material-images-wrap'  style="display: ${imagesStr ? 'flex' : 'none'}" >${imagesStr}</ul><div class="material-video-wrap"  style="display: ${videoSrc ? 'block' : 'none'}"><video controls width="660" preload="metadata"><source src="${videoSrc}" />抱歉，您的浏览器不支持展示嵌入式视频。<a target="_blank" download href="${videoSrc}">直接下载</a></video></div></body></html>
    `
  if (window.previewWindow) {
    window.previewWindow.close()
  }
  window.previewWindow = window.open()
  window.previewWindow.document.write(htmlTemplate)
  window.previewWindow.document.close()
}

// 倒计时显示
export const getCountDownTimeText = (date) => {
  const diff = moment(date) - moment()
  const duration = moment.duration(diff, 'milliseconds')
  if (diff < 300000) {
    return '小于5分钟'
  }
  const obj = {
    diff,
    years: duration.years(),
    months: duration.months(),
    days: duration.days(),
    hours: duration.hours(),
    minutes: duration.minutes()
  }
  let text = ''
  text += obj.years ? obj.years + '年 ' : '';
  text += obj.months ? obj.months + '个月 ' : '';
  text += obj.days ? obj.days + '天 ' : '';
  text += obj.hours ? obj.hours + '小时 ' : '';
  text += obj.minutes ? obj.minutes + '分钟' : '';
  return text
}

// 根据行业code获取行业名字
export const getIndustryName = (source = [], code) => {
  // itemValue', value: 'itemKey', children: 'childrenList'
  let value = '';
  return loop(source, code);
  function loop(item, id) {
    if (!item) return "";
    for (var i = 0; i < item.length; i++) {
      if (item[i].itemKey === code) {
        value = item[i]
        break;
      }
      if (item[i].childrenList) {
        loop(item[i].childrenList, code)
      }
    }
    return value;
  }
}
