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

const orderStep = {
  0: ['待媒介处理', '待合作方确定', '待执行', '已完成'],
  [MEDIUM_REJECT]: ['待媒介处理', '媒介驳回'],
  [PARTNER_REJECT]: ['待媒介处理', '待合作方确定', '合作方驳回'],
}
export const getOrderStep = (type) => {
  return orderStep[type] ? orderStep[type] : orderStep[0]
}
