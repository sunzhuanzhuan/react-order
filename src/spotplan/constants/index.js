import React from 'react'
import { Modal, Input } from 'antd'
const { TextArea } = Input;
export const CheckModalFunc = handleDel => [
  {
    title: '订单ID',
    dataIndex: 'order_id',
    key: 'order_id',
    align: 'center',
    width: 80
  },
  {
    title: '需求名称',
    dataIndex: 'requirement_name',
    key: 'requirement_name',
    align: 'center',
    width: 160
  },
  {
    title: '平台',
    dataIndex: 'weibo_type_name',
    key: 'weibo_type_name',
    align: 'center',
    width: 100
  },
  {
    title: '账号名称',
    dataIndex: 'weibo_name',
    key: 'weibo_name',
    align: 'center',
    width: 120
  },
  {
    title: '价格名称',
    dataIndex: 'price_name',
    key: 'price_name',
    align: 'center',
    width: 180
  },
  {
    title: '应约价（账号报价/总价）',
    dataIndex: 'price',
    key: 'price',
    align: 'center',
    width: 180,
    render: (text, record) => {
      return record.cost + '/' + record.costwithfee
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    width: 100,
    render: (text, record) => {
      return <a href='javascript:;' onClick={() => {
        Modal.confirm({
          title: '',
          content: `是否确认删除该订单？`,
          onOk: () => {
            handleDel(record.order_id)
          }
        })
      }}>删除</a>
    }
  }
];
export const EditOrderCols = [
  {
    title: '订单ID',
    dataIndex: 'order_id',
    key: 'order_id',
    align: 'center',
    width: 100,
    fixed: 'left',
    render: (text, record) => {
      return <a href={record.order_info_path} target="_blank">{text}</a>
    }
  },
  {
    title: '需求名称',
    dataIndex: 'requirement_name',
    key: 'requirement_name',
    align: 'center',
    width: 100,
    render: (text, record) => {
      return <a href={record.requirement_path} target="_blank">{text}</a>
    }
  },
  {
    title: '平台',
    dataIndex: 'weibo_type_name',
    key: 'weibo_type_name',
    align: 'center',
    width: 100
  },
  {
    title: '账号名称',
    dataIndex: 'weibo_name',
    key: 'weibo_name',
    align: 'center',
    width: 140,
    render: (text, record) => {
      return <a href={record.link_url} target="_blank">{text}</a>
    }
  },
  {
    title: '账号ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    width: 100
  },
  {
    title: 'PriceID',
    dataIndex: 'price_id',
    key: 'price_id',
    align: 'center',
    width: 100
  },
  {
    title: '价格名称',
    dataIndex: 'price_name',
    key: 'price_name',
    align: 'center',
    width: 200,
    fixed: 'right',
    render: () => {
      return <TextArea autosize={{ minRows: 4 }} style={{ width: 180 }} />
    }
  },
  {
    title: 'Cost（元）',
    dataIndex: 'cost',
    key: 'cost',
    align: 'center',
    width: 100,
    fixed: 'right'
  },
  {
    title: 'Costwithfee（元）',
    dataIndex: 'costwithfee',
    key: 'costwithfee',
    align: 'center',
    width: 100,
    fixed: 'right'
  },
  {
    title: '账号分类',
    dataIndex: 'account_category_name',
    key: 'account_category_name',
    align: 'center',
    width: 100,
    fixed: 'right',
    render: () => {
      return <Input />
    }
  },
  {
    title: '是否备选号',
    dataIndex: 'is_replace',
    key: 'is_replace',
    align: 'center',
    width: 100,
    fixed: 'right',
    render: text => {
      return text == 1 ? '是' : text == 2 ? '否' : '-'
    }
  },
  {
    title: '位置/直发or转发',
    dataIndex: 'release_form',
    key: 'release_form',
    align: 'center',
    width: 100,
    fixed: 'right',
    render: () => {
      return <Input />
    }
  },
  {
    title: '备注（非必填）',
    dataIndex: 'content',
    key: 'content',
    align: 'center',
    width: 100,
    fixed: 'right',
    render: () => {
      return <TextArea autosize={{ minRows: 4 }} style={{ width: 180 }} />
    }
  }
];
export const SpotplanListCols = [
  {
    title: 'ID',
    dataIndex: 'payment_slip_id',
    key: 'payment_slip_id',
    align: 'center',
    width: 100
  },
  {
    title: 'PO单号',
    dataIndex: 'platform_name',
    key: 'platform_name',
    align: 'center',
    width: 100
  },
  {
    title: '名称',
    dataIndex: 'cooperation_platform_name',
    key: 'cooperation_platform_name',
    align: 'center',
    width: 100
  },
  {
    title: '订单数量',
    dataIndex: 'agent_name',
    key: 'agent_name',
    align: 'center',
    width: 140
  },
  {
    title: '更新请求被拒订单',
    dataIndex: 'public_order_id',
    key: 'public_order_id',
    align: 'center',
    width: 100
  },
  {
    title: '创建人',
    dataIndex: 'payment_amount',
    key: 'payment_amount',
    align: 'center',
    width: 100
  },
  {
    title: '项目/品牌',
    dataIndex: 'payment_status_desc',
    key: 'payment_status_desc',
    align: 'center',
    width: 100
  },
  {
    title: '时间',
    dataIndex: 'payment_company_name',
    key: 'payment_company_name',
    align: 'center',
    width: 100
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    width: 100,
    render: (text, record) => {
      return <a href='javascript:;'>查看详情</a>
    }
  }
];
export const HisttoryCols = [
  {
    title: '申请类型',
    dataIndex: 'payment_slip_id',
    key: 'payment_slip_id',
    align: 'center',
    width: 100
  },
  {
    title: 'spotplan更新审核状态',
    dataIndex: 'platform_name',
    key: 'platform_name',
    align: 'center',
    width: 100
  },
  {
    title: '更新前',
    dataIndex: 'cooperation_platform_name',
    key: 'cooperation_platform_name',
    align: 'center',
    width: 100
  },
  {
    title: '更新后',
    dataIndex: 'agent_name',
    key: 'agent_name',
    align: 'center',
    width: 140
  },
  {
    title: '申请人',
    dataIndex: 'public_order_id',
    key: 'public_order_id',
    align: 'center',
    width: 100
  },
  {
    title: '时间',
    dataIndex: 'payment_amount',
    key: 'payment_amount',
    align: 'center',
    width: 100
  }
];
export const DetailTableCols = [
  {
    title: '订单ID',
    dataIndex: 'payment_slip_id',
    key: 'payment_slip_id',
    align: 'center',
    width: 100
  },
  {
    title: '需求名称',
    dataIndex: 'platform_name',
    key: 'platform_name',
    align: 'center',
    width: 100
  },
  {
    title: '订单状态',
    dataIndex: 'cooperation_platform_name',
    key: 'cooperation_platform_name',
    align: 'center',
    width: 100
  },
  {
    title: 'spotplan更新审核状态',
    dataIndex: 'agent_name',
    key: 'agent_name',
    align: 'center',
    width: 140
  },
  {
    title: '订单信息确认状态',
    dataIndex: 'public_order_id',
    key: 'public_order_id',
    align: 'center',
    width: 100
  },
  {
    title: '平台',
    dataIndex: 'payment_amount',
    key: 'payment_amount',
    align: 'center',
    width: 100
  },
  {
    title: '账号名称',
    dataIndex: 'payment_status_desc',
    key: 'payment_status_desc',
    align: 'center',
    width: 100
  },
  {
    title: '账号 ID',
    dataIndex: 'payment_company_name',
    key: 'payment_company_name',
    align: 'center',
    width: 100
  },
  {
    title: 'PriceID',
    dataIndex: 'created_at',
    key: 'created_at',
    align: 'center',
    width: 100
  },
  {
    title: '价格名称',
    dataIndex: 'return_invoice_amount',
    key: 'return_invoice_amount',
    align: 'center',
    width: 100
  },
  {
    title: 'Cost（元）',
    dataIndex: 'invoice_surplus',
    key: 'invoice_surplus',
    align: 'center',
    width: 100
  },
  {
    title: 'Costwithfee（元）',
    dataIndex: 'main_user_name',
    key: 'main_user_name',
    align: 'center',
    width: 100
  },
  {
    title: '账号分类',
    dataIndex: 'media_user_name',
    key: 'media_user_name',
    align: 'center',
    width: 100
  },
  {
    title: '是否备选号',
    dataIndex: 'a',
    key: 'a',
    align: 'center',
    width: 100
  },
  {
    title: '位置/直发or转发',
    dataIndex: 'b',
    key: 'b',
    align: 'center',
    width: 100
  },
  {
    title: '备注',
    dataIndex: 'c',
    key: 'c',
    align: 'center',
    width: 100
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    width: 100
  }
]

//客户确认状态
export const STATUS_CUSTOMER = [
  { key: '客户待确认', value: 11 },
  { key: '客户确认', value: 12 },
  { key: '客户拒绝', value: 13 },
  { key: '客户取消', value: 14 },
  { key: '过时未确认', value: 15 },
  { key: '待支付', value: 36 }
];
//预约中状态
export const STATUS_RESERVATION = [
  { key: '预约中', value: 1 },
  { key: '应约', value: 2 },
  { key: '拒约', value: 3 },
  { key: '流约', value: 4 },
  { key: '预约取消', value: 5 },
  { key: '终止申请中', value: 31 },
]
