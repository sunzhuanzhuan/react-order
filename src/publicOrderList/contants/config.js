// 筛选项配置数组
export const filterFormArr = [
  {
    label: "需求名称",
    type: "input",
    key: "reservation_requirement_name"
  },
  {
    label: "需求ID",
    type: "input",
    key: "reservation_requirement_id"
  },
  {
    label: "订单ID",
    type: "input",
    key: "order_id"
  },
  {
    label: "订单状态",
    type: "select",
    key: "order_status",
    data: []
  },
  {
    label: "账号名称",
    type: "input",
    key: "account_name"
  },
  {
    label: "平台",
    type: "multidim-select",
    key: "platform_id",
    data: []
  },
  {
    label: "下单平台/代理商",
    type: "selectDependOnRequest",
    key: "agent_id",
    url: ""
  },
  {
    label: "执行状态",
    type: "select",
    key: "execution_status",
    data: []
  },
  {
    label: "资源媒介",
    type: "selectDependOnRequest",
    key: "meida_user_id",
    url: ""
  },
  {
    label: "项目媒介",
    type: "selectDependOnRequest",
    key: "project_user_id",
    url: ""
  },
  {
    label: "主账号名",
    type: "input",
  },
  {
    label: "是否提前打款",
    type: "select",
    key: "is_pre_deposit",
    data: [{ key: "请选择", value: "0" }, { key: "是", value: "1" }, { key: "否", value: "2" }]
  },
  {
    label: "提前打款状态",
    type: "select",
    key: "pre_deposit_status",
    data: [{ key: "请选择", value: "0" }, { key: "未处理", value: "1" }, { key: "已同意", value: "2" }, { key: "已驳回", value: "3" }]
  },
  {
    label: "提前打款结果",
    type: "select",
    key: "pre_deposit_result",
    data: [{ key: "请选择", value: "0" }, { key: "未处理", value: "1" }, { key: "打款成功", value: "2" }, { key: "打款失败", value: "3" }, { key: "打款撤销", value: "4" }]
  },
  {
    label: "预付款申请状态",
    type: "select",
    key: "prepay_apply_status",
    data: [{ key: "请选择", value: "0" }, { key: "待审核", value: "1" }, { key: "已同意", value: "2" }, { key: "已拒绝", value: "3" }]
  },
  {
    label: "打款状态",
    type: "select",
    key: "deposit_status",
    data: []
  },
  {
    label: "对账状态",
    type: "select",
    key: "check_status",
    data: [{ key: "请选择", value: "0" }, { key: "未对账", value: "1" }, { key: "对账中", value: "2" }, { key: "对账成功", value: "3" }, { key: "部分对账", value: "4" }]
  },
  {
    label: "是否标注已下单",
    type: "select",
    key: "is_labeled_place_order",
    data: [{ key: "请选择", value: "0" }, { key: "是", value: "1" }, { key: "否", value: "2" }]
  },
  {
    label: "预付款申请时间",
    type: "time",
  },
  {
    label: "三方下单时间",
    type: "time",
    key: "platform_place_order_at"
  },
]
