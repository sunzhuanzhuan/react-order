import moment from "moment";

// 打开新窗口预览 微信
export const openNewWindowPreviewForWeixin = ({ title = "", content = "", remark = "", author = "", articleUrl = "" }) => {
  const htmlTemplate = `
<!Doctype html><html><head><link rel="shortcut icon" href="http://www.weiboyi.com/favicon.ico"><title>${title || '预览'}</title><style>html,body{height:100%;margin:0;padding:0;overflow:auto;background-color:#fff}.container{box-sizing:border-box;max-width:677px;min-height:100%;margin:0 auto;padding:30px 8px;overflow:hidden;background-color:#fff}.braft-output-content p{min-height:1em}.braft-output-content .image-wrap img{max-width:100%;height:auto}.braft-output-content ul,.braft-output-content ol{margin:16px 0;padding:0}.braft-output-content blockquote{margin:0 0 10px 0;padding:15px 20px;background-color:#f1f2f3;border-left:solid 5px #ccc;color:#666;font-style:italic}.braft-output-content pre{max-width:100%;max-height:100%;margin:10px 0;padding:15px;overflow:auto;background-color:#f1f2f3;border-radius:3px;color:#666;font-family:monospace;font-size:14px;font-weight:normal;line-height:16px;word-wrap:break-word;white-space:pre-wrap}.braft-output-content pre pre{margin:0;padding:0}.braft-output-content{overflow:hidden}.braft-output-content video{width:100%}.header-title{font-weight: 400;font-size: 22px;line-height: 1.4;margin-bottom: 14px;}.header-author{color: rgba(0, 0, 0, .3);margin-bottom: 22px;line-height: 20px;font-size: 15px;word-wrap: break-word;word-break: break-all;}</style></head><body>
<div class="container braft-output-content"><h2 class="header-title">${title}</h2><header class="header-author"><p>${author}</p></header><blockquote style="display: ${remark ? 'block' : 'none'}"><section>${remark}<section></blockquote>${content}<footer style="display: ${articleUrl ? 'block' : 'none'}"><a href="${articleUrl}" target="_blank">阅读原文</a></footer></div></body></html>
    `
  if (window.previewWindow) {
    window.previewWindow.close()
  }
  window.previewWindow = window.open()
  window.previewWindow.document.write(htmlTemplate)
  window.previewWindow.document.close()
}

// 打开新窗口预览 微博
export const openNewWindowPreviewForWeibo = ({ content = "", video = "", images = [], mediaType }, type = "direct") => {
  let imagesStr, videoSrc;
  if (mediaType === 1) {
    imagesStr = images.reduce((str, src) => {
      str += `<li><a target="_blank" href="${src}" style="background-image: url('${src}');" /></li>`
      return str
    }, ``)
  } else if (mediaType === 2) {
    videoSrc = video
  }

  const htmlTemplate = `
<!Doctype html><html><head><link rel="shortcut icon" href="http://www.weiboyi.com/favicon.ico"><title>${'预览'}</title><style>html,body{height:100%;margin:0;padding:0;overflow:auto;background-color:#fff}.container{box-sizing:border-box;max-width:677px;min-height:100%;margin:0 auto;padding:30px 8px;overflow:hidden;background-color:#fff}.braft-output-content p{min-height:1em}.braft-output-content .image-wrap img{max-width:100%;height:auto}.braft-output-content ul,.braft-output-content ol{margin:16px 0;padding:0}.braft-output-content blockquote{margin:0 0 10px 0;padding:15px 20px;background-color:#f1f2f3;border-left:solid 5px #ccc;color:#666;font-style:italic}.braft-output-content pre{max-width:100%;max-height:100%;margin:10px 0;padding:15px;overflow:auto;background-color:#f1f2f3;border-radius:3px;color:#666;font-family:monospace;font-size:14px;font-weight:normal;line-height:16px;word-wrap:break-word;white-space:pre-wrap}.braft-output-content pre pre{margin:0;padding:0}.braft-output-content{overflow:hidden}.braft-output-content video{width:100%}.header-title{font-weight: 400;font-size: 22px;line-height: 1.4;margin-bottom: 14px;}.header-author{color: rgba(0, 0, 0, .3);margin-bottom: 22px;line-height: 20px;font-size: 15px;word-wrap: break-word;word-break: break-all;}.material-images-wrap{display:flex;margin:0;padding:0;flex-wrap:wrap}.material-images-wrap li{margin:0 10px 10px 0;display:block;width:210px;height:210px;overflow:hidden}.material-images-wrap li a{display:block;cursor:pointer;transition:all .3s;width:100%;height:100%;background:no-repeat center;background-size:cover;background-color: #f8f8f8;}.material-images-wrap li a:hover{transform:scale(1.2)}.material-video-wrap{text-align:center}</style></head><body>
<div class="container braft-output-content"><p>${content.replace(/\n/g, "<br/>")}</p><ul class='material-images-wrap'  style="display: ${imagesStr ? 'flex' : 'none'}" >${imagesStr}</ul><div class="material-video-wrap"  style="display: ${videoSrc ? 'block' : 'none'}"><video controls width="660" preload="metadata"><source src="${videoSrc}" />抱歉，您的浏览器不支持展示嵌入式视频。<a target="_blank" download href="${videoSrc}">直接下载</a></video></div></body></html>
    `
  if (window.previewWindow) {
    window.previewWindow.close()
  }
  window.previewWindow = window.open()
  window.previewWindow.document.write(htmlTemplate)
  window.previewWindow.document.close()
}

// 打开新窗口预览 12305
export const openNewWindowPreviewFor12306 = ({ content = "", video = "", images = "" }) => {
  let imagesStr, videoSrc;
  imagesStr = `<li><a target="_blank" href="${images}" style="background-image: url('${images}');" /></li>`
  videoSrc = video

  const htmlTemplate = `
<!Doctype html><html><head><link rel="shortcut icon" href="http://www.weiboyi.com/favicon.ico"><title>${'预览'}</title><style>html,body{height:100%;margin:0;padding:0;overflow:auto;background-color:#fff}.container{box-sizing:border-box;max-width:677px;min-height:100%;margin:0 auto;padding:30px 8px;overflow:hidden;background-color:#fff}.braft-output-content p{min-height:1em}.braft-output-content .image-wrap img{max-width:100%;height:auto}.braft-output-content ul,.braft-output-content ol{margin:16px 0;padding:0}.braft-output-content blockquote{margin:0 0 10px 0;padding:15px 20px;background-color:#f1f2f3;border-left:solid 5px #ccc;color:#666;font-style:italic}.braft-output-content pre{max-width:100%;max-height:100%;margin:10px 0;padding:15px;overflow:auto;background-color:#f1f2f3;border-radius:3px;color:#666;font-family:monospace;font-size:14px;font-weight:normal;line-height:16px;word-wrap:break-word;white-space:pre-wrap}.braft-output-content pre pre{margin:0;padding:0}.braft-output-content{overflow:hidden}.braft-output-content video{width:100%}.header-title{font-weight: 400;font-size: 22px;line-height: 1.4;margin-bottom: 14px;}.header-author{color: rgba(0, 0, 0, .3);margin-bottom: 22px;line-height: 20px;font-size: 15px;word-wrap: break-word;word-break: break-all;}.material-images-wrap{display:flex;margin:0;padding:0;flex-wrap:wrap}.material-images-wrap li{margin:0 10px 10px 0;display:block;width:210px;height:210px;overflow:hidden}.material-images-wrap li a{display:block;cursor:pointer;transition:all .3s;width:100%;height:100%;background:no-repeat center;background-size:cover;background-color: #f8f8f8;}.material-images-wrap li a:hover{transform:scale(1.2)}.material-video-wrap{text-align:center}</style></head><body>
<div class="container braft-output-content"><p>${content.replace(/\n/g, "<br/>")}</p><ul class='material-images-wrap'  style="display: ${imagesStr ? 'flex' : 'none'}" >${imagesStr}</ul><div class="material-video-wrap"  style="display: ${videoSrc ? 'block' : 'none'}"><video controls width="320" preload="metadata"><source src="${videoSrc}" />抱歉，您的浏览器不支持展示嵌入式视频。<a target="_blank" download href="${videoSrc}">直接下载</a></video></div></body></html>
    `
  if (window.previewWindow) {
    window.previewWindow.close()
  }
  window.previewWindow = window.open()
  window.previewWindow.document.write(htmlTemplate)
  window.previewWindow.document.close()
}

// 倒计时显示
export const getCountDownTimeText = (date, min = 5, precision = 5, assort = moment()) => {
  const diff = moment(date) - moment(assort)
  const duration = moment.duration(diff, 'milliseconds')
  if (diff < 0) {
    return `已过期`
  }
  if (diff < min * 60000) {
    return `小于${min}分钟`
  }
  const obj = {
    diff,
    years: duration.years(),
    months: duration.months(),
    days: duration.days(),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds()
  }
  let text = ''
  text += obj.years && precision > 0 ? obj.years + '年 ' : '';
  text += obj.months && precision > 1 ? obj.months + '个月 ' : '';
  text += obj.days && precision > 2 ? obj.days + '天 ' : '';
  text += obj.hours && precision > 3 ? obj.hours + '小时 ' : '';
  text += obj.minutes && precision > 4 ? obj.minutes + '分钟 ' : '';
  text += obj.seconds && precision > 5 ? obj.seconds + '秒 ' : '';
  return text
}

// 根据行业code获取行业名字
export const getIndustryName = (source = [], code) => {
  // itemValue', value: 'id', children: 'taskIndustryList'
  let value = '';
  return loop(source, code);
  function loop(item, id) {
    if (!item) return "";
    for (var i = 0; i < item.length; i++) {
      if (item[i].id === code) {
        value = item[i]
        break;
      }
      if (item[i].taskIndustryList) {
        loop(item[i].taskIndustryList, code)
      }
    }
    return value;
  }
}

/**
 * 时间显示处理
 */
export const dateDisplayByLen = (date, precision) => {
  let len = {
    'm': 16,
    'd': 10
  }
  if (date === '1970-01-01 08:00:00') {
    return ''
  }
  return date ? date.slice(0, len[precision]) : ''
}

/**
 * 处理列表数据为map表
 * @param primary_key
 * @returns {function(state, action): {total: *, keys: *, response: *, pageSize: *, source, pageNum: *}}
 */
export const reducersResponseList = (primary_key = 'id') => {
  return (state, action) => {
    let response = action.payload.data || {}, source = {}
    const { total = 0, pageNum = 1, pageSize = 50, list = [] } = response
    const keys = list.map(item => {
      source[item[primary_key]] = { ...item }
      source[item[primary_key]]['key'] = item[primary_key]
      return item[primary_key]
    })
    return {
      total,
      pageNum,
      pageSize,
      keys,
      source: { ...state.source, ...source },
      response
    }
  }
}

/**
 * 初始化列表数据
 * @returns {{total: number, keys: [], response: {}, pageSize: number, source: {}, pageNum: number}}
 */
reducersResponseList.initList = (pageSize = 50) => {
  return { keys: [], source: {}, total: 0, pageNum: 1, pageSize, response: {} }
}
