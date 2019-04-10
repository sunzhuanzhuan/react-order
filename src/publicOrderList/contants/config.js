import React from 'react'
import LabelPublicOrder from '../components/modal/LabelPublicOrder'
import ModifyPublicOrder from '../components/modal/ModifyPublicOrder'
import WithdrawPublicOrder from '../components/modal/WithdrawPublicOrder'
import ExecuteHandle from '../components/modal/ExecuteHandle'
import ApplyPrepayment from '../components/modal/ApplyPrepayment'
import SetExecutionTerminationRequest from '../components/modal/SetExecutionTerminationRequest'
import { Button, Tooltip, Popover, Form } from 'antd';
import './config.less'

const FormItem = Form.Item;

// 筛选项配置数组
export const filterFormArr = [
  {
    label: "需求名称",
    type: "input",
    id: "equirement_name"
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
    data: [
      { key: "请选择", value: "0" },
      { key: "应约", value: "2" },
      { key: "拒约", value: "3" },
      { key: "流约", value: "4" },
      { key: "预约取消", value: "5" },
      { key: "终止申请中", value: "31" }
    ]
  },
  {
    label: "账号名称",
    type: "input",
    id: "account_name"
  },
  {
    label: "平台",
    type: "multidim-select",
    id: "platform_id",
    data: [
      { key: "美拍--M计划", value: "25" },
      { key: "快手--快接单", value: "103" },
      { key: "新浪微博--微任务/WEIQ", value: "1" },
      { key: "抖音--星图", value: "115" }
    ]
  },
  {
    label: "下单平台/代理商",
    type: "agentComponent",
    id: "agent_id"
  },
  {
    label: "执行状态",
    type: "select",
    id: "execution_status",
    data: [
      { key: "请选择", value: "0" },
      { key: "执行中", value: "21" },
      { key: "已执行", value: "22" },
      { key: "待执行", value: "23" },
      { key: "执行取消", value: "24" },
      { key: "终止申请中", value: "31" },
      { key: "执行终止", value: "25" },
      { key: "待质检", value: "26" },
      { key: "质检中", value: "27" },
      { key: "质检完成", value: "28" },
      { key: "已完成", value: "32" },
      { key: "已结案", value: "35" },
      { key: "赔偿申请中", value: "33" },
      { key: "赔偿通过", value: "34" }
    ]
  },
  {
    label: "资源媒介",
    type: "selectDependOnRequest",
    id: "media_owner_admin_id",
    url: "/user/getMediaUsers",
    data: { key: "user_id", value: "real_name" }
  },
  {
    label: "项目媒介",
    type: "selectDependOnRequest",
    id: "vol_admin_id",
    url: "/user/getVolUsers",
    data: { key: "user_id", value: "real_name" }
  },
  {
    label: "主账号名",
    type: "input",
    id: "main_user_name"
  },
  {
    label: "是否提前打款",
    type: "select",
    id: "is_pre_deposit",
    data: [{ key: "请选择", value: "0" }, { key: "是", value: "1" }, { key: "否", value: "2" }],
  },
  {
    label: "提前打款状态",
    type: "select",
    id: "pre_deposit_status",
    data: [{ key: "请选择", value: "0" }, { key: "未处理", value: "1" }, { key: "已同意", value: "2" }, { key: "已驳回", value: "3" }],
  },
  {
    label: "提前打款结果",
    type: "select",
    id: "pre_deposit_result",
    data: [{ key: "请选择", value: "0" }, { key: "未处理", value: "1" }, { key: "打款成功", value: "2" }, { key: "打款失败", value: "3" }, { key: "打款撤销", value: "4" }],
  },
  {
    label: "预付款申请状态",
    type: "select",
    id: "public_advance_payment_apply_status",
    data: [{ key: "请选择", value: "0" }, { key: "待审核", value: "1" }, { key: "已同意", value: "2" }, { key: "已拒绝", value: "3" }],
  },
  {
    label: "打款状态",
    type: "select",
    id: "last_payment_status",
    data: [
      { key: "请选择", value: "0" },
      { key: "未处理", value: "1" },
      { key: "已同意", value: "2" },
      { key: "已驳回", value: "3" }
    ]
  },
  {
    label: "对账状态",
    type: "select",
    id: "statement_status",
    data: [{ key: "请选择", value: "0" }, { key: "未对账", value: "1" }, { key: "对账中", value: "2" }, { key: "对账成功", value: "3" }, { key: "部分对账", value: "4" }],
  },
  {
    label: "是否标注已下单",
    type: "select",
    id: "is_labeled_place_order",
    data: [{ key: "请选择", value: "0" }, { key: "是", value: "1" }, { key: "否", value: "2" }],
  },
  {
    label: "预付款申请时间",
    type: "time",
    id: "public_advance_payment_apply_created_at"
  },
  {
    label: "三方下单时间",
    type: "time",
    id: "ttp_place_order_at"
  }
]

// 列表操作事件
const supportedOperations = {
  "can_label_place_order": "标注为三方已下单",
  "can_modify_public_order": "修改三方下单信息",
  "can_withdraw_public_order": "撤销三方下单标注",
  "execute_handle": "执行申请处理",
  "apply_prepayment": "预付款申请",
  "interrupt_execution": "同意/拒绝执行终止"
}

// 列表页column
export const columns = (props) => {
  const operationBtn = [
    "can_label_place_order", "can_modify_public_order",
    "can_withdraw_public_order", "execute_handle",
    "apply_prepayment", "interrupt_execution"
  ]
  const host = props.babysitter_host.value
  const reservationRequirementStatus = {
    "1": "未添加账号",
    "2": "预约进行中",
    "3": "预约完成",
    "4": "取消",
    "5": "审核中"
  }
  const orderStatus = {
    "1": "预约中",
    "2": "应约",
    "3": "拒约",
    "4": "流约",
    "5": "预约取消",
    "31": "终止申请中"
  }
  const publicAdvancePaymentApplyStatus = {
    "1": "待审核",
    "2": "已同意",
    "3": "已拒绝"
  }
  const publicOrderTradeStatus = {
    "1": "未处理",
    "2": "已同意",
    "3": "已驳回"
  }
  const paymentResult = {
    "1": "未处理",
    "2": "打款成功",
    "3": "打款失败",
    "4": "打款撤销"
  }
  const statementStatus = {
    "1": "未对账",
    "2": "对账中",
    "3": "对账成功",
    "4": "部分对账"
  }
  // 调账方式
  const operationType = {
    "1": "正常",
    "2": "三方成本减项",
    "3": "三方成本增项",
    "4": "部分对账"
  }
  // 来源
  const form = {
    "1": "B端",
    "2": "A端",
    "3": "C端"
  }
  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }
  return [
    {
      title: '操作',
      dataIndex: 'supported_operations',
      key: 'supported_operations',
      align: 'center',
      fixed: 'left',
      width: 100,
      render: (text, record) => {
        let btnArr = []
        operationBtn.forEach(v => {
          if (text[v]) {
            btnArr.push(v)
          }
        })
        return <div>
          {
            btnArr.map(v => <Button
              key={v}
              type="primary"
              style={{ marginTop: '3px' }}
              onClick={() => props.showModal({ key: v, data: record })}
            >{supportedOperations[v]}</Button>)
          }
        </div>
      }
    },
    {
      title: '预约需求名称/预约需求ID/预约需求状态',
      dataIndex: 'requirement_name',
      key: 'requirement_name',
      align: 'center',
      fixed: 'left',
      width: 150,
      render: (text, record) => {
        return <div className="list-item">
          <Tooltip placement="top" title={text}>
            <a href={host ?
              `${host}/pack/reservationrequirement/orderlistformedia/special_type/0/page/${record.requirement_id}`
              : '#'
            } target="_blank"
            >{text}</a>
          </Tooltip>
          <a href={host ?
            `${host}/pack/reservationrequirement/orderlistformedia/special_type/0/page/${record.requirement_id}`
            : '#'
          } target="_blank"
          >{record.requirement_id}</a>
          <div>{reservationRequirementStatus[record.reservation_requirement_status]}</div>
        </div>
      }
    },
    {
      title: '预约订单ID/预约订单状态',
      dataIndex: 'order_id',
      key: 'order_id',
      align: 'center',
      fixed: 'left',
      width: 200,
      render: (text, record) => {
        return <div className="list-item">
          <div>{text}</div>
          <a href={record.review_reservation_doc_url} target="_blank">预约链接</a>
          {
            record.review_execution_doc_url ?
              <a href={record.review_execution_doc_url} target="_blank">执行链接</a> : null
          }
          <div>{orderStatus[record.order_status]}</div>
        </div>
      }
    },
    {
      title: '账号名称/粉数/平台',
      dataIndex: 'account',
      key: 'account',
      align: 'center',
      width: 300,
      render: (text, record) => {
        return <div className="list-div">
          <div className="list-divItem">
            <span>账号名称：</span>
            <a href=
              {`${window.location.host}/account/manage/update/${text.platform_id}?account_id=${text.account_id}`}
              target="_blank"
            >{text.account_name}</a>
          </div>
          <div className="list-divItem">
            <span>{`${text.platform_name}号:`}</span>
            <span>{text.sns_id}</span>
          </div>
          <div className="list-divItem">
            <span>粉数:</span>
            <span>{text.follower_count}</span>
          </div>
          <div className="list-divItem">
            <span>平台:</span>
            <span>{text.platform_name}</span>
          </div>
        </div>
      }
    },
    {
      title: '三方平台下单价（元）',
      dataIndex: 'public_cost_price',
      key: 'public_cost_price',
      align: 'center',
      width: 150,
      render: (text, record) => {
        return record.public_order ?
          <span>{record.public_order.public_order_skus[0].public_cost_price}</span> :
          null
      }

    },
    {
      title: '下单平台',
      dataIndex: 'cooperation_platform_name',
      key: 'cooperation_platform_name',
      align: 'center',
      width: 100,
      render: (text, record) => {
        return record.public_order ?
          <span>{record.public_order.cooperation_platform_name}</span> : null
      }
    },
    {
      title: '是否标注三方已下单',
      dataIndex: 'is_labeled_place_order',
      key: 'is_labeled_place_order',
      align: 'center',
      width: 100,
      render: (text, record) => {
        return record.public_order ?
          <span>{record.public_order.is_labeled_place_order == "1" ? "是" : "否"}</span> :
          null
      }
    },
    {
      title: '三方下单信息',
      dataIndex: 'public_order',
      key: 'public_order',
      align: 'center',
      width: 300,
      render: (text, record) => {
        return record.public_order ? (text.is_labeled_place_order == "1" ?
          <div className="list-div">
            <div className="list-divItem">
              <span>下单时间：</span>
              <span>{text.ttp_place_order_at}</span>
            </div>
            <div className="list-divItem">
              <span>本单使用下单平台/代理商：</span>
              <span>{`${text.cooperation_platform_name}-${text.agent_name}`}</span>
            </div>
            <div className="list-divItem">
              <span>三方订单号:</span>
              <span>{text.ttp_order_id ? text.ttp_order_id : ""}</span>
            </div>
          </div> : null) : null
      }
    },
    {
      title: '预付款申请状态/预付款打款状态',
      dataIndex: 'public_advance_payment_apply',
      key: 'public_advance_payment_apply',
      align: 'center',
      width: 200,
      render: (text, record) => {
        return record.public_order ? <div>
          <div>申请状态：{publicAdvancePaymentApplyStatus[record.public_order.public_advance_payment_apply.status]}</div>
          <div>打款状态：{publicOrderTradeStatus[record.public_order.public_order_trade.statement_status]}</div>
        </div> : null
      }
    },
    {
      title: '预计推广时间',
      dataIndex: 'promote_started_at',
      key: 'promote_started_at',
      align: 'center',
      width: 200,
      render: (text, record) => {
        return record.public_order ? <div>
          <div>
            <span>预计推广开始时间：</span>
            <span>{record.public_order.promote_started_at}</span>
          </div>
          <div>
            <span>预计推广结束时间：</span>
            <span>{record.public_order.promote_ended_at}</span>
          </div>
        </div> : null
      }
    },
    {
      title: '是否提前打款/提前打款状态/提前打款结果',
      dataIndex: 'is_prepayment',
      key: 'is_prepayment',
      align: 'center',
      width: 200,
      render: (text, record) => {
        return <div>
          <div>
            <span>是否提前打款：</span>
            <span>{text == "1" ? "是" : "否"}</span>
          </div>
          {
            text == "1" ?
              <div>
                <div>
                  <span>打款状态：</span>
                  <span>{publicOrderTradeStatus[record.prepayment_status]}</span>
                </div>
                <div>
                  <span>打款结果：</span>
                  <span>{paymentResult[record.prepayment.payment_result]}</span>
                </div>
              </div> : null
          }
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
      dataIndex: 'statement_status',
      key: 'statement_status',
      align: 'center',
      width: 100,
      render: (text, record) => {
        return record.public_order && record.public_order.settle_type == "2" ?
          <span>{statementStatus[record.public_order.public_order_statement.statement_status]}</span> : null
      }
    },
    {
      title: '调账信息',
      dataIndex: 'last_public_summary_order_relation',
      key: 'last_public_summary_order_relation',
      align: 'center',
      width: 200,
      render: (text, record) => {
        return record.public_order ? <div>
          <div>
            <span>调账金额：</span>
            <span>{record.public_order.last_public_summary_order_relation.adjustment_amount}
            </span>
          </div>
          <div>
            <span>调账方式：</span>
            <span>{operationType[record.public_order.last_public_summary_order_relation.operation_type]}
            </span>
          </div>
          <div>
            <span>调账原因：</span>
            <span>{record.public_order.last_public_summary_order_relation.adjustment_reason}
            </span>
          </div>
        </div> : null
      }
    },
    {
      title: '调账时间',
      dataIndex: 'last_public_summary_order_relation_created_at',
      key: 'last_public_summary_order_relation_created_at',
      align: 'center',
      width: 200,
      render: (text, record) => {
        return record.public_order ?
          <span>{record.public_order.last_public_summary_order_relation.created_at}</span> :
          null
      }
    },
    {
      title: '扣减信息',
      dataIndex: 'deduction_amount',
      key: 'deduction_amount',
      align: 'center',
      width: 200,
      render: (text, record) => {
        return record.public_order ? <div>
          <div>
            <span>扣减金额：</span>
            <span>{record.public_order.last_public_summary_order_relation.deduction_amount}
            </span>
          </div>
          <div>
            <span>扣减原因：</span>
            <span>{record.public_order.last_public_summary_order_relation.deduction_reason}
            </span>
          </div>
        </div> : null
      }
    },
    {
      title: '应实付金额',
      dataIndex: 'paying_amount',
      key: 'paying_amount',
      align: 'center',
      width: 150,
      render: (text, record) => {
        return record.public_order ?
          <span>{record.public_order.public_order_trade.paying_amount}</span> : null
      }
    },
    {
      title: '实付金额',
      dataIndex: 'paid_amount',
      key: 'paid_amount',
      align: 'center',
      width: 150,
      render: (text, record) => {
        return record.public_order ?
          <span>{record.public_order.public_order_trade.paid_amount}</span> : null
      }
    },
    {
      title: '销售/创建人/执行人',
      dataIndex: 'sale_user',
      key: 'sale_user',
      align: 'center',
      width: 150,
      render: (text, record) => {
        return <div>
          <div>销售：{record.sale_user.name ? record.sale_user.name : "-"}</div>
          <div>创建人：{record.creator.name ? record.creator.name : "-"}</div>
          <div>执行人：{record.executor.name ? record.executor.name : "-"}</div>
        </div>
      }
    },
    {
      title: '主账号',
      dataIndex: 'main_account',
      key: 'main_account',
      align: 'center',
      width: 100,
      render: (text) => {
        return <div>
          <div><a href={`${host}/user/update/user_id/${text.user_id}`} target="_blank">{text.realname}</a></div>
          <Tooltip placement="top" title={text.cell_phone}>
            <div>手机号</div>
          </Tooltip>
        </div>
      }
    },
    {
      title: '媒介经理',
      dataIndex: 'media_admin_user',
      key: 'media_admin_user',
      align: 'center',
      width: 200,
      render: (text, record) => {
        return <div>
          <div>资源媒介：
            <Popover
              content={(
                <Form layout="horizontal">
                  <FormItem
                    label="手机号"
                    style={{ width: '300px' }}
                    {...formLayout}
                  >
                    <span>{record.media_admin_user.cell_phone ? record.media_admin_user.cell_phone : "-"}</span>
                  </FormItem>
                  {
                    record.media_admin_user.qr_code ?
                      <FormItem
                        label="微信"
                        {...formLayout}
                      >
                        <img src={record.media_admin_user.qr_code} width="100" />
                      </FormItem> : null
                  }
                  <FormItem
                    label="qq"
                    {...formLayout}
                  >
                    <span>{record.media_admin_user.qq ? record.media_admin_user.qq : "-"}</span>
                  </FormItem>
                  <FormItem
                    label="email"
                    {...formLayout}
                  >
                    <span>{record.media_admin_user.email ? record.media_admin_user.email : "-"}</span>
                  </FormItem>
                </Form>
              )} title="联系方式" trigger="click">
              <a href="#">{record.media_admin_user.name}</a>
            </Popover>
          </div>
          <div>项目媒介：
            <Popover
              content={(
                <Form layout="horizontal">
                  <FormItem
                    label="手机号"
                    {...formLayout}
                    style={{ width: '300px' }}
                  >
                    <span>{record.vol_admin_user.cell_phone ? record.vol_admin_user.cell_phone : "-"}</span>
                  </FormItem>
                  {
                    record.vol_admin_user.qr_code ?
                      <FormItem
                        label="微信"
                        {...formLayout}
                      >
                        <img src={record.vol_admin_user.qr_code} width="100" />
                      </FormItem> : null
                  }
                  <FormItem
                    label="qq"
                    {...formLayout}
                  >
                    <span>{record.vol_admin_user.qq ? record.vol_admin_user.qq : "-"}</span>
                  </FormItem>
                  <FormItem
                    label="email"
                    {...formLayout}
                  >
                    <span>{record.vol_admin_user.email ? record.vol_admin_user.email : "-"}</span>
                  </FormItem>
                </Form>
              )}
              title="联系方式" trigger="click"
            >
              <a href="#">{record.vol_admin_user.name}</a>
            </Popover>
          </div>
        </div>
      }
    },
    {
      title: '公司简称',
      dataIndex: 'company',
      key: 'company',
      align: 'center',
      width: 100,
      render: text => <span>{text.company_name}</span>
    },
    {
      title: '提交时间',
      dataIndex: 'submitted_at',
      key: 'submitted_at',
      align: 'center',
      width: 150
    },
    {
      title: '来源',
      dataIndex: 'from',
      key: 'from',
      align: 'center',
      width: 50,
      render: text => <span>{form[text]}</span>
    }
  ]
}

// 弹框配置项
export const modalParams = {
  "can_label_place_order": {
    modalTitle: "标注为三方已下单",
    children: LabelPublicOrder
  },
  "can_modify_public_order": {
    modalTitle: "修改三方下单信息",
    children: ModifyPublicOrder
  },
  "can_withdraw_public_order": {
    modalTitle: "撤销三方下单标注",
    children: WithdrawPublicOrder
  },
  "execute_handle": {
    modalTitle: "执行申请处理",
    children: ExecuteHandle
  },
  "apply_prepayment": {
    modalTitle: "预付款申请",
    children: ApplyPrepayment
  },
  "interrupt_execution": {
    modalTitle: "同意/拒绝执行终止",
    children: SetExecutionTerminationRequest
  }
}
