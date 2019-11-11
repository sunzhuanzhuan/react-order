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
export const MCN_ORDER_STATE_QUALIFIED_WAIT_REQA = 11 // 待复检

// 任务执行状态
const MCN_ORDER_UNEXCUTE = 0; //未执行
const MCN_ORDER_EXCUTE_WAIT = 1; //执行结果待确认
const MCN_ORDER_EXCUTE_CANCEL = 2; //执行结果取消
const MCN_ORDER_EXCUTE_CONFIRM = 3; //执行结果确认

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
    [MCN_ORDER_STATE_WILL_QA]: {
      children: '待回填',
      showoperate: 'show',
      actionarr: [
          { title: '添加回执', actionKey: 'TPFristFailureUpdateContentUrl' },
      ]
    },
    [MCN_ORDER_STATE_FIRST_QA]: {
      children: '待一检',
    },
    [MCN_ORDER_STATE_QA_ING]: {
      children: '质检中',
    },
    [MCN_ORDER_STATE_DEDUCTION]: {
      children: '有扣款',
    },
    [MCN_ORDER_STATE_UNQUALIFIED]: {
      children: '质检不合格退款',
      style: { color: '#ff365d' },
    },
    [MCN_ORDER_STATE_CANCEL]: {
      children: '已取消',
    },
    [MCN_ORDER_STATE_QUALIFIED]: {
      children: '已完结',
      style: { color: '#0cad67' },
      showoperate: 'show',
      actionarr: [],
      confirmexestate
    },
    [MCN_ORDER_STATE_FIRST_QA_ERROR]: {
      children: '一检异常待处理',
      showoperate: 'show',
      actionarr: [
        { title: '通过', actionKey: 'TPApprovedFirstSuccess' },
        { title: '不通过', actionKey: 'TPApprovedFristFailure' },
      ]
    },
    [MCN_ORDER_STATE_DEDUCTION_REWRITE_LINK]: {
      children: '链接待调整',
      showoperate: 'show',
      actionarr: [
          { title: '修改回执', actionKey: 'TPFristFailureUpdateContentUrl' }
      ]
    },
    [MCN_ORDER_STATE_QUALIFIED_WILL_SECOND_QA]: {
      children: '待二检',
    },
    [MCN_ORDER_STATE_QUALIFIED_SECOND_QA_ERROR]: {
      children: '二检异常待处理',
      showoperate: 'show',
      actionarr: [
        { title: '合格', actionKey: 'TPApprovedSecondSuccess' },
        { title: '不合格', actionKey: 'TPApprovedSecondFailure' },
      ]
    },
    [MCN_ORDER_STATE_QUALIFIED_WAIT_REQA]: {
        children: '待复检'
    }
  }