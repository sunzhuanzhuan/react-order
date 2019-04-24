const isConfig=[
  {key:'全部',value:''},
  {key:'是',value:1},
  {key:'否',value:2}
];
const status_type=[
  {key:'未对账',value:'1'},
  {key:'对账完成',value:'3'},
  {key:'部分对账',value:'4'}
]
export const searchForm=[
  {
    ctype: 'input',
    attr: {
      placeholder: '请输入',
      style: { width: 160 },
      allowClear: true
    },
    field: {
      label: '订单号',
      value: 'wby_order_ids',
    }
  },
  {
    ctype: 'input',
    attr: {
      placeholder: '请输入',
      style: { width: 160 },
      allowClear: true
    },
    field: {
      label: '账号名称',
      value: 'weibo_names',
    }
  },
  {
    ctype: 'rangeInput',
    attr: {
      placeholder: ['输入金额', '输入金额'],
      style: { width: 120 }
    },
    field: {
      label: '下单价',
      value: ['public_order_price_min', 'public_order_price_max'],
    }
  },
  {
    ctype: 'rangePicker',
    attr: {
      placeholder: ['开始时间', '结束时间'],
      format: 'YYYY-MM-DD',
      style: { width: 140 }
    },
    field: {
      label: '下单时间',
      value: ['ttp_place_order_at_start', 'ttp_place_order_at_end'],
    }
  },
  {
    ctype: 'input',
    attr: {
      placeholder: '请输入',
      style: { width: 160 },
      allowClear: true
    },
    field: {
      label: '三方订单号',
      value: 'public_order_ids',
    }
  },
  {
    ctype: 'select',
    attr: {
      placeholder: '不限',
      style: { width: 180 },
      // labelInValue: true,
      allowClear: true,
      mode:"multiple",
    },
    field: {
      label: '对账状态',
      value: 'statement_status',
      params:{ initialValue: ['1', '4'] }
    },
    selectOptionsChildren: status_type,
    // selectItem: { key: 'display', value: 'id' }
  },
  {
    ctype: 'select',
    attr: {
      placeholder: '不限',
      style: { width: 160 },
      labelInValue: true,
      allowClear: true
    },
    field: {
      label: '是否可扣减',
      value: 'is_can_deduction',
    },
    selectOptionsChildren: isConfig,
    // selectItem: { key: 'display', value: 'id' }
  },
]


export const searchFormPayment=[
  {
    ctype: 'input',
    attr: {
      placeholder: '请输入',
      style: { width: 160 },
      allowClear: true
    },
    field: {
      label: '汇总单名称',
      value: 'summary_sheet_name',
    }
  },
  {
    ctype: 'rangePicker',
    attr: {
      placeholder: ['开始时间', '结束时间'],
      format: 'YYYY-MM-DD',
      style: { width: 104 }
    },
    field: {
      label: '生成时间',
      value: ['ttp_place_order_at_start', 'ttp_place_order_at_end'],
    }
  },
  {
    ctype: 'rangePicker',
    attr: {
      placeholder: ['开始时间', '结束时间'],
      format: 'YYYY-MM-DD',
      style: { width: 104 }
    },
    field: {
      label: '下单时间',
      value: ['ttp_place_order_at_start', 'ttp_place_order_at_end'],
    }
  },
]

export const searchFormStatement=[

  {
    ctype: 'rangePicker',
    attr: {
      placeholder: ['开始时间', '结束时间'],
      format: 'YYYY-MM-DD',
      style: { width: 104 }
    },
    field: {
      label: '导入日期',
      value: ['created_at_start', 'created_at_end'],
    }
  }, {
    ctype: 'input',
    attr: {
      placeholder: '请输入',
      style: { width: 160 },
      allowClear: true
    },
    field: {
      label: '文件名称',
      value: 'statement_name',
    }
  },
]

export const searchFormSummary=[

  {
    ctype: 'rangePicker',
    attr: {
      placeholder: ['开始时间', '结束时间'],
      format: 'YYYY-MM-DD',
      style: { width: 104 }
    },
    field: {
      label: '生成时间',
      value: ['created_at_start', 'created_at_end'],
    }
  }, {
    ctype: 'input',
    attr: {
      placeholder: '请输入',
      style: { width: 160 },
      allowClear: true
    },
    field: {
      label: '汇总单编号',
      value: 'ttp_place_order_at_start',
    }
  },
]
