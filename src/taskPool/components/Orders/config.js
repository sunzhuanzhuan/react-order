
export const QUALIFIED_STATU = 1//合格
export const NO_QUALIFIED_STATU = 8//不合格
export const ABNORMAL_STATU = 4//一检异常待处理
export const PENDING_STATU = 0//待执行
export const MODIFIED_WAIT_STATU = 7//待修改
export const orderStateMap = {
  [PENDING_STATU]: { name: '待执行', status: 'default' },
  [QUALIFIED_STATU]: { name: '合格', status: 'processing' },
  2: { name: '待一检', status: 'processing' },
  3: { name: '待二检', status: 'processing' },
  [ABNORMAL_STATU]: { name: '一检异常待处理', status: 'warning' },
  5: { name: '二检异常待处理', status: 'warning' },
  6: { name: '待确认', status: 'warning' },
  [MODIFIED_WAIT_STATU]: { name: '待修改', status: 'warning' },
  [NO_QUALIFIED_STATU]: { name: '不合格', status: 'error' },
  9: { name: '取消结算', status: 'error' },
  10: { name: '已取消', status: 'error' },
  11: { name: '已完成', status: 'success' },
}
