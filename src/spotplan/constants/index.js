import React from 'react'
export const CheckModalCols = [
  {
    title: '订单ID',
    dataIndex: 'order_id',
    key: 'order_id',
    align: 'center',
    width: 80
  },
  {
    title: '需求名称',
    dataIndex: 'platform_name',
    key: 'platform_name',
    align: 'center',
    width: 160
  },
  {
    title: '平台',
    dataIndex: 'cooperation_platform_name',
    key: 'cooperation_platform_name',
    align: 'center',
    width: 100
  },
  {
    title: '账号名称',
    dataIndex: 'agent_name',
    key: 'agent_name',
    align: 'center',
    width: 120
  },
  {
    title: '价格名称',
    dataIndex: 'public_order_id',
    key: 'public_order_id',
    align: 'center',
    width: 180
  },
  {
    title: '应约价（账号报价/总价）',
    dataIndex: 'payment_amount',
    key: 'payment_amount',
    align: 'center',
    width: 180
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    width: 100,
    render: (text, record) => {
      return <a href='javascript:;'>删除</a>
    }
  }
];
export const EditOrderCols = [
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
    title: '平台',
    dataIndex: 'cooperation_platform_name',
    key: 'cooperation_platform_name',
    align: 'center',
    width: 100
  },
  {
    title: '账号名称',
    dataIndex: 'agent_name',
    key: 'agent_name',
    align: 'center',
    width: 140
  },
  {
    title: '账号ID',
    dataIndex: 'public_order_id',
    key: 'public_order_id',
    align: 'center',
    width: 100
  },
  {
    title: 'PriceID',
    dataIndex: 'payment_amount',
    key: 'payment_amount',
    align: 'center',
    width: 100
  },
  {
    title: '价格名称',
    dataIndex: 'payment_status_desc',
    key: 'payment_status_desc',
    align: 'center',
    width: 100
  },
  {
    title: 'Cost（元）',
    dataIndex: 'payment_company_name',
    key: 'payment_company_name',
    align: 'center',
    width: 100
  },
  {
    title: 'Costwithfee（元）',
    dataIndex: 'created_at',
    key: 'created_at',
    align: 'center',
    width: 100
  },
  {
    title: '账号分类',
    dataIndex: 'return_invoice_amount',
    key: 'return_invoice_amount',
    align: 'center',
    width: 100
  },
  {
    title: '是否备选号',
    dataIndex: 'invoice_surplus',
    key: 'invoice_surplus',
    align: 'center',
    width: 100
  },
  {
    title: '位置/直发or转发',
    dataIndex: 'main_user_name',
    key: 'main_user_name',
    align: 'center',
    width: 100
  },
  {
    title: '备注（非必填）',
    dataIndex: 'media_user_name',
    key: 'media_user_name',
    align: 'center',
    width: 100
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
