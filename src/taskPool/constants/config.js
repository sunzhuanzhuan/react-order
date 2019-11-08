/**
 * Created by lzb on 2019-08-13.
 */

/**
 * 广告商任务状态
 */
export const AD_ORDER_STATE_UNPAID = 0 // 未支付
export const AD_ORDER_STATE_PROCESSING = 1 // 进行中
export const AD_ORDER_STATE_EXPIRY = 2 // 过期
export const AD_ORDER_STATE_OFFLINE = 3 // 下线
export const AD_ORDER_STATE_END = 4 // 结束

/**
 * 博主任务状态
 */
export const MCN_ORDER_STATE_WILL_QA = 1 // 待质检
export const MCN_ORDER_STATE_FIRST_QA = 2 // 待一检
export const MCN_ORDER_STATE_QA_ING = 3 // 质检中
export const MCN_ORDER_STATE_DEDUCTION = 4 // 有扣款
export const MCN_ORDER_STATE_UNQUALIFIED = 5 // 质检不合格已退款
export const MCN_ORDER_STATE_CANCEL = 6 // 已取消
export const MCN_ORDER_STATE_QUALIFIED = 7 // 已完结
export const MCN_ORDER_STATE_FIRST_QA_ERROR = 8 // 一检异常待处理
export const MCN_ORDER_STATE_DEDUCTION_REWRITE_LINK = 9 // 链接待调整
export const MCN_ORDER_STATE_QUALIFIED_WILL_SECOND_QA = 10 // 待二检
export const MCN_ORDER_STATE_QUALIFIED_SECOND_QA_ERROR = 11 // 二检异常待处理

//博主任务状态文本及对应操作
export const statusKeyToProps = {
    [MCN_ORDER_STATE_WILL_QA]: {
      children: '待回填',
      actionKey: 'TPFristFailureUpdateContentUrl'
    },
    [MCN_ORDER_STATE_FIRST_QA]: {
      children: '待一检',
      actionKey: 'TPFristFailureUpdateContentUrl'
    },
    [MCN_ORDER_STATE_QA_ING]: {
      children: '质检中',
      actionKey: ''
    },
    [MCN_ORDER_STATE_DEDUCTION]: {
      children: '有扣款',
      actionKey: ''
    },
    [MCN_ORDER_STATE_UNQUALIFIED]: {
      children: '质检不合格已退款',
      style: { color: '#ff365d' },
      actionKey: ''
    },
    [MCN_ORDER_STATE_CANCEL]: {
      children: '已取消',
      actionKey: ''
    },
    [MCN_ORDER_STATE_QUALIFIED]: {
      children: '已完结',
      style: { color: '#0cad67' },
      actionKey: ''
    },
    [MCN_ORDER_STATE_FIRST_QA_ERROR]: {
      children: '一检异常待处理',
      actionKey: ''
    },
    [MCN_ORDER_STATE_DEDUCTION_REWRITE_LINK]: {
      children: '链接待调整',
      actionKey: ''
    },
    [MCN_ORDER_STATE_QUALIFIED_WILL_SECOND_QA]: {
      children: '待二检',
      actionKey: ''
    },
    [MCN_ORDER_STATE_QUALIFIED_SECOND_QA_ERROR]: {
      children: '二检异常待处理',
      actionKey: ''
    },
  }