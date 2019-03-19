import React from 'react'

// 筛选项配置数组
export const filterFormArr = [
  {
    label: "需求名称",
    type: "input",
    id: "reservation_requirement_name"
  },
  {
    label: "需求ID",
    type: "input",
    id: "reservation_requirement_id"
  },
  {
    label: "订单ID",
    type: "input",
    id: "order_id"
  },
  {
    label: "订单状态",
    type: "select",
    id: "order_status",
    data: [],
    layout: {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 }
    }
  },
  {
    label: "账号名称",
    type: "input",
    id: "account_name"
  },
  // {
  //   label: "平台",
  //   type: "multidim-select",
  //   id: "platform_id",
  //   data: [],
  //   layout: {
  //     labelCol: { span: 7 },
  //     wrapperCol: { span: 17 }
  //   }
  // },
  // {
  //   label: "下单平台/代理商",
  //   type: "selectDependOnRequest",
  //   id: "agent_id",
  //   url: ""
  // },
  {
    label: "执行状态",
    type: "select",
    id: "execution_status",
    data: [],
    layout: {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 }
    }
  },
  // {
  //   label: "资源媒介",
  //   type: "selectDependOnRequest",
  //   id: "meida_user_id",
  //   url: "/api/user/getMediaUsers"
  // },
  // {
  //   label: "项目媒介",
  //   type: "selectDependOnRequest",
  //   id: "project_user_id",
  //   url: "/api/user/getVolUsers"
  // },
  // {
  //   label: "主账号名",
  //   type: "input"
  // },
  {
    label: "是否提前打款",
    type: "select",
    id: "is_pre_deposit",
    data: [{ key: "请选择", value: "0" }, { key: "是", value: "1" }, { key: "否", value: "2" }],
    layout: {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    }
  },
  {
    label: "提前打款状态",
    type: "select",
    id: "pre_deposit_status",
    data: [{ key: "请选择", value: "0" }, { key: "未处理", value: "1" }, { key: "已同意", value: "2" }, { key: "已驳回", value: "3" }],
    layout: {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    }
  },
  {
    label: "提前打款结果",
    type: "select",
    id: "pre_deposit_result",
    data: [{ key: "请选择", value: "0" }, { key: "未处理", value: "1" }, { key: "打款成功", value: "2" }, { key: "打款失败", value: "3" }, { key: "打款撤销", value: "4" }],
    layout: {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    }
  },
  {
    label: "预付款申请状态",
    type: "select",
    id: "prepay_apply_status",
    data: [{ key: "请选择", value: "0" }, { key: "待审核", value: "1" }, { key: "已同意", value: "2" }, { key: "已拒绝", value: "3" }],
    layout: {
      labelCol: { span: 12 },
      wrapperCol: { span: 12 }
    }
  },
  {
    label: "打款状态",
    type: "select",
    id: "deposit_status",
    data: [],
    layout: {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 }
    }
  },
  {
    label: "对账状态",
    type: "select",
    id: "check_status",
    data: [{ key: "请选择", value: "0" }, { key: "未对账", value: "1" }, { key: "对账中", value: "2" }, { key: "对账成功", value: "3" }, { key: "部分对账", value: "4" }],
    layout: {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 }
    }
  },
  {
    label: "是否标注已下单",
    type: "select",
    id: "is_labeled_place_order",
    data: [{ key: "请选择", value: "0" }, { key: "是", value: "1" }, { key: "否", value: "2" }],
    layout: {
      labelCol: { span: 12 },
      wrapperCol: { span: 12 }
    }
  },
  // {
  //   label: "预付款申请时间",
  //   type: "time",
  // },
  {
    label: "三方下单时间",
    type: "time",
    id: "platform_place_order_at"
  }
]

// 列表页column
export const columns = [
  {
    title: '操作',
    dataIndex: 'supported_operations',
    key: 'supported_operations',
    align: 'center',
    fixed: 'left'
  },
  {
    title: '预约需求名称/预约需求ID/预约需求状态',
    dataIndex: 'requirement_name',
    key: 'requirement_name',
    align: 'center',
    fixed: 'left',
    render: (text, record) => {
      return <div>
        <a href="#" target="_blank">{text}</a>
        <a href="#" target="_blank">{record.requirement_id}</a>
        {/* <a href="#" target="_blank">{record.requirement_id}</a> */}
      </div>
    }
  },
  {
    title: '预约订单ID/预约订单状态',
    dataIndex: 'order_id',
    key: 'order_id',
    align: 'center',
    fixed: 'left',
    render: (text, record) => {
      return <div>
        <a href="#" target="_blank">{text}</a>
        <a href="#" target="_blank">{record.order_status}</a>
      </div>
    }
  },
  {
    title: '账号名称/粉数/平台',
    dataIndex: 'account',
    key: 'account',
    align: 'center',
    render: (text, record) => {
      return <div>
        <div>
          <span>账号名称：</span>
          <a href="#" target="_blank">{text.account_name}</a>
        </div>
        <div>
          <span>{`${text.platform_name}号:`}</span>
          <span>{text.sns_id}</span>
        </div>
        <div>
          <span>粉数:</span>
          <span>{text.follower_count}</span>
        </div>
        <div>
          <span>平台:</span>
          <span>{text.platform_name}</span>
        </div>
      </div>
    }
  },
  // {
  //   title: '三方平台下单价（元）',
  //   dataIndex: 'order_id',
  //   key: 'order_id',
  //   align: 'center'
  // },
  // {
  //   title: '下单平台',
  //   dataIndex: 'platform_name',
  //   key: 'platform_name',
  //   align: 'center',
  //   render: (text, record) => <span>{record.place_order.platform_name}</span>
  // },
  {
    title: '是否标注三方已下单',
    dataIndex: 'is_labeled_place_order',
    key: 'is_labeled_place_order',
    align: 'center',
    render: (text, record) => <span>{record.place_order.is_labeled_place_order == "1" ? "是" : "否"}</span>
  },
  {
    title: '三方下单信息',
    dataIndex: 'place_order',
    key: 'place_order',
    align: 'center',
    render: (text, record) => {
      return text.is_labeled_place_order == "1" ?
        <div>
          <div>
            <span>下单时间：</span>
            <span>{text.place_order_at}</span>
          </div>
          <div>
            <span>本单使用下单平台/代理商：</span>
            <span>{text.platform_name}</span>
          </div>
          <div>
            <span>三方订单号:</span>
            <span>{text.third_platform_order_id ? text.third_platform_order_id : ""}</span>
          </div>
        </div> : null
    }
  },
  // {
  //   title: '预付款申请状态/预付款打款状态',
  //   dataIndex: 'order_id',
  //   key: 'order_id',
  //   align: 'center'
  // },
  {
    title: '预计推广时间',
    dataIndex: 'promote_started_at',
    key: 'promote_started_at',
    align: 'center',
    render: (text, record) => {
      return <div>
        <div>
          <span>预计推广开始时间：</span>
          <span>{record.place_order.promote_started_at}</span>
        </div>
        <div>
          <span>预计推广结束时间：</span>
          <span>{record.place_order.promote_ended_at}</span>
        </div>
      </div>
    }
  },
  {
    title: '是否提前打款/提前打款状态/提前打款结果',
    dataIndex: 'pre_deposit',
    key: 'pre_deposit',
    align: 'center',
    render: text => {
      return <div>
        <div>
          <span>是否提前打款：</span>
          <span>{text.is_pre_deposit == "1" ? "是" : "否"}</span>
        </div>
        <div>
          <span>提前打款状态：</span>
          <span>{text.pre_deposit_status}</span>
        </div>
        <div>
          <span>提前打款结果：</span>
          <span>{text.pre_deposit_result}</span>
        </div>
      </div>
    }
  },
  // {
  //   title: '执行终止处理',
  //   dataIndex: 'order_id',
  //   key: 'order_id',
  //   align: 'center'
  // },
  {
    title: '对账状态',
    dataIndex: 'check_status',
    key: 'check_status',
    align: 'center'
  },
  {
    title: '调账信息',
    dataIndex: 'money_adjustment',
    key: 'money_adjustment',
    align: 'center',
    render: text => {
      return <div>
        <div>
          <span>调账金额：</span>
          <span>{text.adjust_amount}</span>
        </div>
        <div>
          <span>调账方式：</span>
          <span>{text.adjust_type}</span>
        </div>
        <div>
          <span>调账原因：</span>
          <span>{text.adjust_reason}</span>
        </div>
      </div>
    }
  },
  {
    title: '扣减信息',
    dataIndex: 'deduction',
    key: 'deduction',
    align: 'center',
    render: text => {
      return <div>
        <div>
          <span>扣减金额：</span>
          <span>{text.deduct_amount}</span>
        </div>
        <div>
          <span>扣减原因：</span>
          <span>{text.deduct_reason}</span>
        </div>
      </div>
    }
  },
  {
    title: '应实付金额',
    dataIndex: 'payable_amount',
    key: 'payable_amount',
    align: 'center'
  },
  {
    title: '实付金额',
    dataIndex: 'paid_amount',
    key: 'paid_amount',
    align: 'center'
  },
  // {
  //   title: '销售/创建人/执行人',
  //   dataIndex: 'paid_amount',
  //   key: 'paid_amount',
  //   align: 'center'
  // },
  // {
  //   title: '主账号',
  //   dataIndex: 'main_account',
  //   key: 'main_account',
  //   align: 'center'
  // },
  // {
  //   title: '媒介经理',
  //   dataIndex: 'main_account',
  //   key: 'main_account',
  //   align: 'center'
  // },
  // {
  //   title: '公司简称',
  //   dataIndex: 'main_account',
  //   key: 'main_account',
  //   align: 'center'
  // },
  {
    title: '提交时间',
    dataIndex: 'submitted_at',
    key: 'submitted_at',
    align: 'center'
  },
  {
    title: '来源',
    dataIndex: 'origin',
    key: 'origin',
    align: 'center'
  }
]
