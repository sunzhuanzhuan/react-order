export const MEDIUM_AWAIT = '10'
export const MEDIUM_REJECT = '20'
export const PARTNER_AWAIT = '30'
export const PARTNER_REJECT = '40'
export const PENDING = '50'
export const OVER = '60'

export const otherOrderStateMap = {
  [MEDIUM_AWAIT]: '待媒介处理',
  [MEDIUM_REJECT]: '媒介驳回',
  [PARTNER_AWAIT]: '待合作方确定',
  [PARTNER_REJECT]: '合作方驳回',
  [PENDING]: '待执行',
  [OVER]: '已完成'
}


export const otherOrderStateList = Object.keys(otherOrderStateMap).map(one => ({ key: one, name: otherOrderStateMap[one] }))

const orderStep = {
  0: ['待媒介处理', '待合作方确定', '待执行', '已完成'],
  [MEDIUM_REJECT]: ['待媒介处理', '媒介驳回'],
  [PARTNER_REJECT]: ['待媒介处理', '待合作方确定', '合作方驳回'],
}
export const getOrderStep = (type) => {
  return orderStep[type] ? orderStep[type] : orderStep[0]
}
//坐席类型
export const deliverySeatMap = {
  '1': '不限',
  '2': '商务座',
  '3': '一等座',
  '4': '二等座',
  '5': '高级软卧',
  '6': '软卧',
  '7': '硬卧',
  '8': '硬座',
  '9': '动卧'
}
//人群性别  
export const deliverySexMap = {
  '1': '不限',
  '2': '男',
  '3': '女'
}
//内容类型 
export const mediaTypeMap = {
  '3': '图文+链接+视频',
  '4': '图文+链接'
}
//投放模式 
export const putTypeMap = {
  '1': '按天投放',
  '2': '按量投放'
}

