/**
 * Created by lzb on 2019-08-13.
 */
import React from "react";
import { Link } from "react-router-dom";
/**
 * 广告商任务状态
 */
export const AD_ORDER_STATE_UNPAID = 100 // 待支付
export const AD_ORDER_STATE_WAIT_RELEASED = 200 // 待发布
export const AD_ORDER_STATE_PROCESSING = 300 // 进行中
export const AD_ORDER_STATE_EXPIRY = 400 // 过期
export const AD_ORDER_STATE_OFFLINE = 500 // 下线
export const AD_ORDER_STATE_FINISH = 600 // 任务结束
export const AD_ORDER_STATE_END = 250 // 终结

/**
 * 博主任务状态
 */
export const MCN_ORDER_STATE_APPLY = 100 // 已申请 (100,"待接受","待确认")
export const MCN_ORDER_STATE_APPLY_REFUSE = 110 // 已拒绝 (110,"拒绝","已拒绝")
export const MCN_ORDER_STATE_WAIT_WRITE_URL = 200 // 待回填 (200, "待回填","待执行")
export const MCN_ORDER_STATE_CANCEL_BY_ACCOUNT = 210 // 博主取消任务 (210, "博主取消任务","已取消")
export const MCN_ORDER_STATE_CANCEL_OVER_TIME = 220 // 超时取消任务 (220, "回填超时取消任务","已取消")
export const MCN_ORDER_STATE_WAIT_QUALIFY = 300 // 待一检 (300, "待一检","待一检")
export const MCN_ORDER_STATE_FIRST_QUALIFY_EXCEPTION_WAITING = 310 // 一检异常待处理
export const MCN_ORDER_STATE_URL_EXCEPTION_WAITING = 320 // 回执待修改
export const MCN_ORDER_STATE_WAIT_REPEAT_QUALIFY = 330 // 待复检
export const MCN_ORDER_STATE_REPEAT_QUALIFY_FAIL = 340 // 复检失败
export const MCN_ORDER_STATE_WAIT_2ST_QUALIFY = 400 // 待二次检查
export const MCN_ORDER_STATE_SECOND_QUALIFY_EXCEPTION_WAITING = 410 // 二检异常待处理
export const MCN_ORDER_STATE_SECOND_FAIL = 400 // 二检失败 不合格
export const MCN_ORDER_STATE_RESULT_CONFIRM = 900 // 待确认 合格
export const MCN_ORDER_STATE_OFFLINE = 910 // 订单完成
export const MCN_ORDER_STATE_CANCEL = 920 // 已取消
export const MCN_ORDER_STATE_OFFLINE_PART = 930 // 有扣款


// 任务执行状态
const MCN_ORDER_UNEXCUTE = 0; //未执行
const MCN_ORDER_EXCUTE_WAIT = 1; //执行结果待确认
const MCN_ORDER_EXCUTE_CANCEL = 2; //执行结果取消
const MCN_ORDER_EXCUTE_CONFIRM = 3; //执行结果确认

// 媒体平台任务模式(微信)任务模式
export const MEDIA_TASK_PATTERN_BIDDING = 1; //竞标
export const MEDIA_TASK_PATTERN_RUSH = 2; //抢单


// 任务执行状态文本及对应操作
export const confirmexestate = {
  [MCN_ORDER_UNEXCUTE]: {
    children: '-'
  },
  [MCN_ORDER_EXCUTE_WAIT]: {
    children: '执行结果待确认',
    actionarr: [
      { title: '确认', actionKey: 'TPMcnOrderConfirmFinish' },
      { title: '取消', actionKey: 'TPMcnOrderConfirmCancel' },
    ]
  },
  [MCN_ORDER_EXCUTE_CANCEL]: {
    children: '执行结果取消'
  },
  [MCN_ORDER_EXCUTE_CONFIRM]: {
    children: '执行结果确认'
  },
}

//博主任务状态文本及对应操作
export const statusKeyToProps = {
  [MCN_ORDER_STATE_WAIT_WRITE_URL]: {
    children: '待回填',
    showoperate: 'show',
    actionarr: [
      { title: '添加回执', actionKey: 'TPUpdateContentUrl', isAdd: true },
    ]
  },
  [MCN_ORDER_STATE_WAIT_QUALIFY]: {
    children: '待一检',
    showoperate: 'show',
    actionarr: [
      { title: '修改回执', actionKey: 'TPUpdateContentUrl' },
    ]
  },
  [MCN_ORDER_STATE_OFFLINE_PART]: {
    children: '有扣款',
  },
  [MCN_ORDER_STATE_CANCEL]: {
    children: '已取消',
  },
  [MCN_ORDER_STATE_OFFLINE]: {
    children: '已完结',
    style: { color: '#0cad67' },
    showoperate: 'show',
    actionarr: [],
    confirmexestate
  },
  [MCN_ORDER_STATE_FIRST_QUALIFY_EXCEPTION_WAITING]: {
    children: '一检异常待处理',
    showoperate: 'show',
    actionarr: [
      { title: '通过', actionKey: 'TPApprovedFirstSuccess' },
      { title: '不通过', actionKey: 'TPApprovedFristFailure' },
    ]
  },
  [MCN_ORDER_STATE_URL_EXCEPTION_WAITING]: {
    children: '链接待调整',
    showoperate: 'show',
    actionarr: [
      { title: '修改回执', actionKey: 'TPFristFailureUpdateContentUrl' }
    ]
  },
  [MCN_ORDER_STATE_WAIT_2ST_QUALIFY]: {
    children: '待二检',
  },
  [MCN_ORDER_STATE_SECOND_QUALIFY_EXCEPTION_WAITING]: {
    children: '二检异常待处理',
    showoperate: 'show',
    actionarr: [
      { title: '合格', actionKey: 'TPApprovedSecondSuccess' },
      { title: '不合格', actionKey: 'TPApprovedSecondFailure' },
    ]
  },
  [MCN_ORDER_STATE_WAIT_REPEAT_QUALIFY]: {
    children: '待复检'
  }
}

export const TRAIN_TYPE_OPTIONS = [
  { label: "G/C高铁", value: 50 },
  { label: "D动车", value: 51 },
  { label: "普通", value: 59 },
]
export const SEAT_OPTIONS = [
  { label: "商务座", value: 21 },
  { label: "一等座", value: 22 },
  { label: "二等座", value: 23 },
  { label: "高级软卧", value: 24 },
  { label: "软卧", value: 25 },
  { label: "硬卧", value: 26 },
  { label: "硬座", value: 27 },
  { label: "动卧", value: 28 },
]
export const AGES_OPTIONS = [
  { label: "0-18岁", value: 40 },
  { label: "18-25岁", value: 41 },
  { label: "25-35岁", value: 42 },
  { label: "35-45岁", value: 43 },
  { label: "大于45岁", value: 44 },
]

// 平台
export const platformTypes = [
  { id: "9", title: '微信公众号', suffix: (data) => `(${data.siNaCount || 0})` }, // 社媒平台
  { id: "1000", title: '合作平台', suffix: (data) => `(${data.weChatCount || 0})` },
]


export const wxPositionToFields = {
  'w1': 'wxOneNumber',
  'w2': 'wxTwoNumber',
  'w3': 'wxOtherNumber',
}
