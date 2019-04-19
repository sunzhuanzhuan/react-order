import React from 'react'
import { Modal, Input, Form, Select, Tooltip } from 'antd'
import numeral from 'numeral'
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;

const APPLY_TYPE = {
  1: '【换号】一换一',
  2: '【换号】一换多',
  3: '【换号】多换一',
  4: '【换号】多换多',
  5: '更新订单信息',
  6: '终止合同'
};
const APPLY_STATUS = {
  1: 'SP更新待提交客户审核',
  2: 'SP更新待审核',
  3: 'SP更新审核通过',
  4: 'SP更新审核被拒',
};
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
export const EditOrderFunc = (getFieldDecorator, handleUpdate) => [
  {
    title: '订单ID',
    dataIndex: 'order_id',
    key: 'order_id',
    align: 'center',
    width: 80,
    render: (text, record) => {
      return <a href={record.order_info_path} target="_blank">{text}</a>
    }
  },
  {
    title: '需求名称',
    dataIndex: 'requirement_name',
    key: 'requirement_name',
    align: 'center',
    width: 80,
    render: (text, record) => {
      return <a href={record.requirement_path} target="_blank">{text}</a>
    }
  },
  {
    title: '平台',
    dataIndex: 'weibo_type_name',
    key: 'weibo_type_name',
    align: 'center',
    width: 80
  },
  {
    title: '账号名称',
    dataIndex: 'weibo_name',
    key: 'weibo_name',
    align: 'center',
    width: 100,
    render: (text, record) => {
      return <a href={record.link_url} target="_blank">{text}</a>
    }
  },
  {
    title: '账号ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    width: 80,
    render: text => {
      return text || '-'
    }
  },
  {
    title: 'PriceID',
    dataIndex: 'price_id',
    key: 'price_id',
    align: 'center',
    width: 80
  },
  {
    title: '价格名称',
    dataIndex: 'price_name',
    key: 'price_name',
    align: 'center',
    render: (text, record) => {
      return <FormItem>
        {getFieldDecorator(`${record.order_id}.price_name`, {
          rules: [{ required: true, message: '请填写名称' }]
        })(
          <TextArea autosize={{ minRows: 4 }} style={{ width: 140 }} placeholder='请填写名称' onBlur={(e) => {
            if (e.target.value != record.price_name) {
              handleUpdate({ order_id: record.order_id, price_id: record.price_id, price_name: e.target.value })
            }
          }} />
        )
        }
      </FormItem>
    }
  },
  {
    title: 'Cost（元）',
    dataIndex: 'cost',
    key: 'cost',
    align: 'center',
    width: 80,
  },
  {
    title: 'Costwithfee（元）',
    dataIndex: 'costwithfee',
    key: 'costwithfee',
    align: 'center',
    width: 100,
  },
  {
    title: '账号分类',
    dataIndex: 'account_category_name',
    key: 'account_category_name',
    align: 'center',
    width: 100,
    render: (text, record) => {
      return <FormItem>
        {getFieldDecorator(`${record.order_id}.account_category_name`, {
          rules: [{ required: true, message: '请填写分类' }]
        })(
          <Input onBlur={(e) => {
            if (e.target.value != record.account_category_name) {
              handleUpdate({ order_id: record.order_id, price_id: record.price_id, account_category_name: e.target.value })
            }
          }} />
        )
        }
      </FormItem>
    }
  },
  {
    title: '是否备选号',
    dataIndex: 'is_replace',
    key: 'is_replace',
    align: 'center',
    width: 100,
    render: (text, record) => {
      return <FormItem>
        {getFieldDecorator(`${record.order_id}.is_replace`, {
          rules: [{ required: true, message: '请选择是否备选' }]
        })(
          <Select
            placeholder='请选择'
            getPopupContainer={() => document.querySelector('.edit-table')}
            onBlur={value => {
              if (value != record.is_replace) {
                handleUpdate({ order_id: record.order_id, price_id: record.price_id, is_replace: value })
              }
            }}
          >
            <Option value={1} >是</Option>
            <Option value={2} >否</Option>
          </Select>
        )}
      </FormItem>
    }
  },
  {
    title: '位置/直发or转发',
    dataIndex: 'release_form',
    key: 'release_form',
    align: 'center',
    render: (text, record) => {
      return <FormItem>
        {getFieldDecorator(`${record.order_id}.release_form`, {
          rules: [{ required: true, message: '请填写位置' }]
        })(
          <TextArea autosize={{ minRows: 4 }} style={{ width: 140 }} onBlur={(e) => {
            if (e.target.value != record.release_form) {
              handleUpdate({ order_id: record.order_id, price_id: record.price_id, is_replace: e.target.value })
            }
          }} />
        )
        }
      </FormItem>
    }
  },
  {
    title: '备注（非必填）',
    dataIndex: 'content',
    key: 'content',
    align: 'center',
    render: (text, record) => {
      return <FormItem>
        {getFieldDecorator(`${record.order_id}.content`, {
          rules: [
            { max: 200, message: '不能超过200字' }
          ]
        })(
          <TextArea autosize={{ minRows: 4 }} style={{ width: 140 }} placeholder='填写备注信息' onBlur={(e) => {
            if (e.target.value != record.content) {
              handleUpdate({ order_id: record.order_id, price_id: record.price_id, content: e.target.value })
            }
          }} />
        )
        }
      </FormItem>
    }
  }
];
export const SpotplanListFunc = handleJump => [
  {
    title: 'ID',
    dataIndex: 'spotplan_id',
    key: 'spotplan_id',
    align: 'center',
    width: 100,
    render: text => {
      return <a href={`/order/spotplan/detail?spotplan_id=${text}`} target="_blank">{text}</a>
    }
  },
  {
    title: 'PO单号',
    dataIndex: 'po_id',
    key: 'po_id',
    align: 'center',
    width: 100,
    render: (text, record) => {
      return text ? <a href={record.po_path} target="_blank">{text}</a> : '-'
    }
  },
  {
    title: '名称',
    dataIndex: 'spotplan_name',
    key: 'spotplan_name',
    align: 'center',
    width: 100
  },
  {
    title: '订单数量',
    dataIndex: 'order_num',
    key: 'order_num',
    align: 'center',
    width: 100
  },
  {
    title: '更新请求被拒订单',
    dataIndex: 'is_refused_num',
    key: 'is_refused_num',
    align: 'center',
    width: 100
  },
  {
    title: '创建人',
    dataIndex: 'real_name',
    key: 'real_name',
    align: 'center',
    width: 100
  },
  {
    title: '项目/品牌',
    dataIndex: 'project_and_brand',
    key: 'project_and_brand',
    align: 'center',
    width: 100,
    render: (text, record) => {
      return <>
        <div><span>{record.project_name ? <a href={record.project_path} target='_blank'>项目：{record.project_name}</a> : '项目：-'}</span></div>
        <div>品牌：<span>{record.brand_name || '-'}</span></div>
      </>
    }
  },
  {
    title: '时间',
    dataIndex: 'time',
    key: 'tiem',
    align: 'center',
    width: 180,
    render: (text, record) => {
      return <>
        <div>创建时间：<span>{record.created_at}</span></div>
        <div>更新时间：<span>{record.updated_at}</span></div>
      </>
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
        handleJump(record.spotplan_id)
      }}>查看详情</a>
    }
  }
];
export const DetailTableFunc = (handleChangeNumber, handleQuitOrder, handleUpdateOrder, handleEditOrder, handleDelete, handleHistory) => [
  {
    title: '订单ID',
    dataIndex: 'order_id',
    key: 'order_id',
    align: 'center',
    width: 80,
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
    width: 140,
    fixed: 'left',
    render: (text, record) => {
      return <a href={record.requirement_path} target="_blank">{text}</a>
    }
  },
  {
    title: '订单状态',
    dataIndex: 'status_name',
    key: 'status_name',
    align: 'center',
    width: 80
  },
  {
    title: 'spotplan更新审核状态',
    dataIndex: 'last_apply_status',
    key: 'last_apply_status',
    align: 'center',
    width: 100,
    render: (text, record) => {
      const node = text ? <div>
        <div>申请类型：{APPLY_TYPE[record.record.apply_type]} <a href='javascript:;' onClick={(e) => {
          handleHistory(e, record.record);
        }}>查看详情</a></div>
        {record.record.apply_type == 4 && <div>拒绝原因：暂时没写</div>}
        {record.record.apply_type == 4 && <div>拒绝时间：暂时没写</div>}
      </div> : ''
      return text ? <Tooltip title={node}>{APPLY_STATUS[text]}</Tooltip> : '-'
    }
  },
  {
    title: '平台',
    dataIndex: 'weibo_type_name',
    key: 'weibo_type_name',
    align: 'center',
    width: 80
  },
  {
    title: '账号名称',
    dataIndex: 'weibo_name',
    key: 'weibo_name',
    align: 'center',
    width: 100,
    render: (text, record) => {
      return <a href={record.link_url} target="_blank">{text}</a>
    }
  },
  {
    title: '账号 ID',
    dataIndex: 'weibo_id',
    key: 'weibo_id',
    align: 'center',
    width: 80
  },
  {
    title: 'PriceID',
    dataIndex: 'price_id',
    key: 'price_id',
    align: 'center',
    width: 80
  },
  {
    title: '价格名称',
    dataIndex: 'price_name',
    key: 'price_name',
    align: 'center',
    width: 100,
    render: text => {
      return text || '-'
    }
  },
  {
    title: 'Cost（元）',
    dataIndex: 'cost',
    key: 'cost',
    align: 'center',
    width: 100,
    render: text => {
      return text || '-'
    }
  },
  {
    title: 'Costwithfee（元）',
    dataIndex: 'costwithfee',
    key: 'costwithfee',
    align: 'center',
    width: 100,
    render: text => {
      return text || '-'
    }
  },
  {
    title: '账号分类',
    dataIndex: 'account_category_name',
    key: 'account_category_name',
    align: 'center',
    width: 100,
    render: text => {
      return text || '-'
    }
  },
  {
    title: '是否备选号',
    dataIndex: 'is_replace',
    key: 'is_replace',
    align: 'center',
    width: 80,
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
    render: text => {
      return text || '-'
    }
  },
  {
    title: '备注',
    dataIndex: 'content',
    key: 'content',
    align: 'center',
    width: 100,
    render: text => {
      return text || '-'
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    width: 100,
    fixed: 'right',
    render: (text, record) => {
      return <>
        {[12, 21, 25, 31].includes(parseInt(record.status)) && [0, 3, 4].includes(parseInt(record.last_apply_status)) && <div><a href='javascript:;' onClick={() => {
          handleChangeNumber(record.order_id)
        }}>申请换号</a></div>}
        {[12, 21, 25, 31].includes(parseInt(record.status)) && [0, 3, 4].includes(parseInt(record.last_apply_status)) && <div><a href='javascript:;' onClick={() => {
          handleQuitOrder(record.order_id)
        }}>申请终止合作</a></div>}
        {[12, 21, 22, 26, 27, 28, 32, 33, 34].includes(parseInt(record.status)) && [0, 3, 4].includes(parseInt(record.last_apply_status)) && <div><a href='javascript:;' onClick={() => {
          handleUpdateOrder(record.order_id)
        }}>申请更新信息</a></div>}
        {record.status == 11 && record.last_apply_status == 0 && <div><a href='javascript:;' onClick={() => {
          handleEditOrder(record.order_id)
        }}>编辑信息</a></div>}
        {record.status == 11 && record.last_apply_status == 0 && <div><a href='javascript:;' onClick={() => {
          handleDelete(record.order_id)
        }}>删除订单</a></div>}
      </>
    }
  }
]
export const HistoryCols = [
  {
    title: '申请类型',
    dataIndex: 'apply_type',
    key: 'apply_type',
    align: 'center',
    width: 140,
    render: text => {
      return APPLY_TYPE[text]
    }
  },
  {
    title: 'spotplan更新审核状态',
    dataIndex: 'apply_status',
    key: 'apply_status',
    align: 'center',
    width: 140,
    render: (text, record) => {
      const node = <div>
        <div>申请类型：暂时没写</div>
        {record.apply_type == 4 && <div>拒绝原因：暂时没写</div>}
        {record.apply_type == 4 && <div>拒绝时间：暂时没写</div>}
      </div>
      return text ? <Tooltip title={node}>{APPLY_STATUS[text]}</Tooltip> : '-'
    }
  },
  {
    title: '更新前',
    dataIndex: 'before_order_info',
    key: 'before_order_info',
    align: 'center',
    width: 240,
    render: text => {
      return <div>
        {text && text.map((item, index) => {
          return <div key={index}>
            <div style={{ textAlign: 'left' }}>【订单ID:{item.order_id}、{item.weibo_name}】</div>
            {item.price_name && <div style={{ textAlign: 'left' }}>价格名称：{item.price_name}</div>}
            {item.cost && <div style={{ textAlign: 'left' }}>Cost(元)：{numeral(item.cost).format('0,0')}</div>}
            {item.service_rate && <div style={{ textAlign: 'left' }}>服务费率：{item.service_rate}%</div>}
            {item.account_category_name && <div style={{ textAlign: 'left' }}>账号分类：{item.account_category_name}</div>}
            {item.release_form && <div style={{ textAlign: 'left' }}>位置/直发or转发：{item.release_form}</div>}
            {item.content && <div style={{ textAlign: 'left' }}>备注(非必填)：{item.content}</div>}
          </div>
        })}
      </div>
    }
  },
  {
    title: '更新后',
    dataIndex: 'after_order_info',
    key: 'after_order_info',
    align: 'center',
    width: 240,
    render: (text, record) => {
      return <div>
        {text && text.map((item, index) => {
          const before_item = record.before_order_info[index];
          return <div key={index}>
            <div style={{ textAlign: 'left' }}>【订单ID:{item.order_id}、{item.weibo_name}】</div>
            {item.price_name && <div style={{ textAlign: 'left' }}>价格名称：<span style={item.price_name != before_item.price_name ? { color: 'red' } : {}}>{item.price_name}</span></div>}
            {item.cost && <div style={{ textAlign: 'left' }}>Cost(元)：<span style={item.cost != before_item.cost ? { color: 'red' } : {}}>{numeral(item.cost).format('0,0')}</span></div>}
            {item.service_rate && <div style={{ textAlign: 'left' }}>服务费率：<span style={item.service_rate != before_item.service_rate ? { color: 'red' } : {}}>{item.service_rate}%</span></div>}
            {item.account_category_name && <div style={{ textAlign: 'left' }}>账号分类：<span style={item.account_category_name != before_item.account_category_name ? { color: 'red' } : {}}>{item.account_category_name}</span></div>}
            {item.release_form && <div style={{ textAlign: 'left' }}>位置/直发or转发：<span style={item.release_form != before_item.release_form ? { color: 'red' } : {}}>{item.release_form}</span></div>}
            {item.content && <div style={{ textAlign: 'left' }}>备注(非必填)：<span style={item.content != before_item.content ? { color: 'red' } : {}}>{item.content}</span></div>}
          </div>
        })}
      </div>
    }
  },
  {
    title: '申请人',
    dataIndex: 'creator_name',
    key: 'creator_name',
    align: 'center',
    width: 100
  },
  {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    align: 'center',
    width: 200,
    render: (text, record) => {
      return <div>
        <div>申请时间：{record.created_at || '-'}</div>
        <div>审核时间：{record.check_at || '-'}</div>
      </div>
    }
  }
];
export const OrderCols = [
  {
    title: '订单ID',
    dataIndex: 'order_id',
    key: 'order_id',
    align: 'center',
    width: 100
  },
  {
    title: '订单状态',
    dataIndex: 'status_name',
    key: 'status_name',
    align: 'center',
    width: 100
  },
  {
    title: '需求名称',
    dataIndex: 'requirement_name',
    key: 'requirement_name',
    align: 'center',
    width: 100
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
    width: 100
  },
  {
    title: '价格名称',
    dataIndex: 'price_name',
    key: 'price_name',
    align: 'center',
    width: 100
  },
  {
    title: 'Cost（元）',
    dataIndex: 'cost',
    key: 'cost',
    align: 'center',
    width: 100
  },
  {
    title: 'Costwithfee（元）',
    dataIndex: 'costwithfee',
    key: 'costwithfee',
    align: 'center',
    width: 100
  }
];
export const UpdateCols = [
  {
    title: '订单ID',
    dataIndex: 'order_id',
    key: 'order_id',
    align: 'center',
    width: 100
  },
  {
    title: '订单状态',
    dataIndex: 'status_name',
    key: 'status_name',
    align: 'center',
    width: 100
  },
  {
    title: '需求名称',
    dataIndex: 'requirement_name',
    key: 'requirement_name',
    align: 'center',
    width: 100
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
    width: 100
  }
];
//客户确认状态
export const STATUS_CUSTOMER = [
  { key: '客户待确认', value: 11 },
  { key: '客户确认', value: 12 },
  { key: '客户拒绝', value: 13 },
  { key: '客户取消', value: 14 },
  { key: '过时未确认', value: 15 },
  { key: '待支付', value: 36 }
];
//详情客户确认状态
export const DETAIL_STATUS_CUSTOMER = [
  { key: '客户待确认', value: 11 },
  { key: '客户已确认', value: 12 },
  { key: '客户已拒绝', value: 13 }
];
//预约中状态
export const STATUS_RESERVATION = [
  { key: '预约中', value: 1 },
  { key: '应约', value: 2 },
  { key: '拒约', value: 3 },
  { key: '流约', value: 4 },
  { key: '预约取消', value: 5 },
  { key: '终止申请中', value: 31 },
];
