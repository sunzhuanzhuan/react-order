/*
 * @Descripttion: 
 * @Author: wangxinyue
 * @Date: 2020-01-15 10:14:33
 * @LastEditors  : wangxinyue
 * @LastEditTime : 2020-02-05 10:34:45
 */
import numeral from 'numeral'

export default {
  auditState: [
    { value: 1, name: "待审核" },
    { value: 2, name: "未通过" },
    { value: 3, name: "已通过" }
  ]
  , estimateState: [
    { value: 1, name: "待评估" },
    { value: 2, name: "已评估" },
  ]
  , estimateGrade: [
    { value: "A", name: "A" },
    { value: "B", name: "B" },
    { value: "C", name: "C" },
    { value: "D", name: "D" },
    { value: "E", name: "E" },

  ]
  , shelfState: [
    { value: 1, name: "上架" },
    { value: 2, name: "下架" },
  ]
  , seckillState: [
    { value: 1, name: "正常" },
    { value: 2, name: "异常" },
  ]
  , biddingState: [
    { value: 1, name: "正常" },
    { value: 2, name: "异常" },
  ],
  genderProportion: [
    { value: 1, name: "男性多" },
    { value: 2, name: "女性多" },
  ],
  isVerified: [
    { value: 1, name: "已认证" },
    { value: 2, name: "未认证" },
  ],
}

//审核状态
export const Wait_Audit = 1
export const No_Pass = 2
export const OK_PASS = 3
export const auditStateMap = {
  [Wait_Audit]: '待审核',
  [No_Pass]: '未通过',
  [OK_PASS]: '已通过',
}
//评估状态
export const WAIT_ESTIMATE = 1
export const OK_ESTIMATE = 2

export const estimateStateMap = {
  [WAIT_ESTIMATE]: "待评估",
  [OK_ESTIMATE]: "已评估",
}
//value是否存在
export const getValueIsExist = (value) => {
  return value == 0 || value > 0
}
export const getValueByFormat = (value, format = '0') => {
  return getValueIsExist(value) ?
    numeral(value).format(format)
    : '-'
}
