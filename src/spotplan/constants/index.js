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
  6: '终止合作',
  7: '新增账号'
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
      return numeral(record.cost).format('0,0') + '/' + numeral(record.costwithfee).format('0,0')
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
            handleDel(2, record.order_id)
          }
        })
      }}>删除</a>
    }
  }
];
export const EditOrderFunc = (getFieldDecorator, handleUpdate, handleDelete) => [
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
    width: 120
  },
  {
    title: '账号名称',
    dataIndex: 'weibo_name',
    key: 'weibo_name',
    align: 'center',
    width: 100,
    render: (text, record) => {
      return record.link_url && <a href={record.link_url} target="_blank">{text}</a> || text
    }
  },
  {
    title: '账号ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    width: 120,
    render: (text, record) => {
      const flag = record.weibo_type == 23 ? true : false;
      return flag ? '-' : text
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
    width: 210,
    render: (text, record) => {
      const flag = (record.customer_confirmation_status == 11 && [0, 4].includes(parseInt(record.last_apply_status))) ? true : false;
      return flag ? <FormItem>
        {getFieldDecorator(`${record.order_id}.price_name`, {
          rules: [{ required: true, message: '请填写名称' }]
        })(
          <TextArea autosize={false} style={{ width: 140, height: 86, resize: 'none' }} placeholder='请填写名称' onBlur={(e) => {
            if (e.target.value != record.price_name) {
              handleUpdate({ order_id: record.order_id, price_id: record.price_id, price_name: e.target.value })
            }
          }} />
        )
        }
      </FormItem> : text
    }
  },
  {
    title: 'Cost（元）',
    dataIndex: 'cost',
    key: 'cost',
    align: 'center',
    width: 80,
    render: text => {
      return text && numeral(text).format('0,0') || '-'
    }
  },
  {
    title: 'Costwithfee（元）',
    dataIndex: 'costwithfee',
    key: 'costwithfee',
    align: 'center',
    width: 100,
    render: text => {
      return text && numeral(text).format('0,0') || '-'
    }
  },
  {
    title: '账号分类',
    dataIndex: 'account_category_name',
    key: 'account_category_name',
    align: 'center',
    width: 100,
    render: (text, record) => {
      const flag = (record.customer_confirmation_status == 11 && [0, 4].includes(parseInt(record.last_apply_status))) ? true : false;
      return flag ? <FormItem>
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
      </FormItem> : text
    }
  },
  {
    title: '位置/直发or转发',
    dataIndex: 'release_form',
    key: 'release_form',
    align: 'center',
    width: 210,
    render: (text, record) => {
      const flag = (record.customer_confirmation_status == 11 && [0, 4].includes(parseInt(record.last_apply_status))) ? true : false;
      return flag ? <FormItem>
        {getFieldDecorator(`${record.order_id}.release_form`, {
          rules: [{ required: true, message: '请填写位置' }]
        })(
          <TextArea autosize={false} style={{ width: 140, height: 86, resize: 'none' }} onBlur={(e) => {
            if (e.target.value != record.release_form) {
              handleUpdate({ order_id: record.order_id, price_id: record.price_id, release_form: e.target.value })
            }
          }} />
        )
        }
      </FormItem> : text
    }
  },
  {
    title: '备注（非必填）',
    dataIndex: 'content',
    key: 'content',
    align: 'center',
    width: 210,
    render: (text, record) => {
      const flag = (record.customer_confirmation_status == 11 && [0, 4].includes(parseInt(record.last_apply_status))) ? true : false;
      return flag ? <FormItem>
        {getFieldDecorator(`${record.order_id}.content`, {
          rules: [
            { max: 400, message: '不能超过400字' }
          ]
        })(
          <TextArea autosize={false} style={{ width: 140, height: 86, resize: 'none' }} placeholder='填写备注信息' onBlur={(e) => {
            if (e.target.value != record.content) {
              handleUpdate({ order_id: record.order_id, price_id: record.price_id, content: e.target.value })
            }
          }} />
        )
        }
      </FormItem> : text
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    fixed: 'right',
    width: 100,
    render: (text, record) => {
      const flag = (record.customer_confirmation_status == 11 && [0, 4].includes(parseInt(record.last_apply_status))) ? true : false;
      return flag ? <a href='javascript:;' onClick={() => {
        handleDelete(record.order_id)
      }}>删除订单</a> : ''
    }
  }
];
export const SpotplanListFunc = () => [
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
    dataIndex: 'customer_po_code',
    key: 'customer_po_code',
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
        <div><span>项目：{record.project_name ? <a href={record.project_path} target='_blank'>{record.project_name}</a> : '-'}</span></div>
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
      return <a href={`/order/spotplan/detail?spotplan_id=${record.spotplan_id}`} target='_blank'>查看详情</a>
    }
  }
];
export const DetailTableFunc = (handleChangeNumber, handleQuitOrder, handleUpdateOrder, handleEditOrder, handleDelete, handleHistory, handleAddNumber) => [
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
    width: 150,
    fixed: 'left',
    render: (text, record) => {
      return <div style={{ width: 100 }}>
        <a href={record.requirement_path} target="_blank">{text}</a>
      </div>
    }
  }, {
    title: 'Spotplan下发状态',
    dataIndex: 'is_inward_send',
    key: 'is_inward_send',
    align: 'center',
    width: 180,
    render: (text, record) => {
      return <Tooltip title={<div><p>成功下发时间</p><p>133</p></div>}>
        <span>{record.is_inward_send == 1 ? 'SP下发成功' : '待下发SP'}</span>
      </Tooltip>
    }
  },
  {
    title: '订单状态',
    dataIndex: 'status_name',
    key: 'status_name',
    align: 'center',
    width: 100,
    render: text => {
      return <div>{text || '-'}</div>
    }
  },
  {
    title: 'spotplan更新审核状态',
    dataIndex: 'last_apply_status',
    key: 'last_apply_status',
    align: 'center',
    width: 120,
    render: (text, record) => {
      const node = text ? <div>
        <div>申请类型：{APPLY_TYPE[record.record.apply_type]} <a href='javascript:;' onClick={(e) => {
          handleHistory(e, record.record);
        }}>查看详情</a></div>
        {record.record.apply_status == 4 && <div>拒绝原因：{record.record.check_reason}</div>}
        {record.record.apply_status == 4 && <div>拒绝时间：{record.record.check_at}</div>}
      </div> : ''
      return <div>{text ? <Tooltip title={node}>{APPLY_STATUS[text]}</Tooltip> : '-'}</div>
    }
  },
  {
    title: '平台',
    dataIndex: 'weibo_type_name',
    key: 'weibo_type_name',
    align: 'center',
    width: 100,
    render: text => {
      return <div>{text || '-'}</div>
    }
  },
  {
    title: '账号名称',
    dataIndex: 'weibo_name',
    key: 'weibo_name',
    align: 'center',
    width: 120,
    render: (text, record) => {
      return <div>{record.link_url && <a href={record.link_url} target="_blank">{text}</a> || text}</div>
    }
  },
  {
    title: '账号ID',
    dataIndex: 'weibo_id',
    key: 'weibo_id',
    align: 'center',
    width: 100,
    render: (text, record) => {
      const flag = record.weibo_type == 23 ? true : false;
      return <div>{flag ? '-' : text}</div>
    }
  },
  {
    title: 'PriceID',
    dataIndex: 'price_id',
    key: 'price_id',
    align: 'center',
    width: 100,
    render: text => {
      return <div>{text || '-'}</div>
    }
  },
  {
    title: '价格名称',
    dataIndex: 'price_name',
    key: 'price_name',
    align: 'center',
    width: 120,
    render: text => {
      return <div>{text || '-'}</div>
    }
  },
  {
    title: 'Cost（元）',
    dataIndex: 'cost',
    key: 'cost',
    align: 'center',
    width: 120,
    render: text => {
      return <div>{text && numeral(text).format('0,0') || '-'}</div>
    }
  },
  {
    title: 'Costwithfee（元）',
    dataIndex: 'costwithfee',
    key: 'costwithfee',
    align: 'center',
    width: 120,
    render: text => {
      return <div>{text && numeral(text).format('0,0.00') || '-'}</div>
    }
  },
  {
    title: '账号分类',
    dataIndex: 'account_category_name',
    key: 'account_category_name',
    align: 'center',
    width: 120,
    render: text => {
      return <div>{text || '-'}</div>
    }
  },
  {
    title: '位置/直发or转发',
    dataIndex: 'release_form',
    key: 'release_form',
    align: 'center',
    width: 120,
    render: text => {
      return <div>{text || '-'}</div>
    }
  },
  {
    title: '备注',
    dataIndex: 'content',
    key: 'content',
    align: 'center',
    width: 120,
    render: text => {
      return <div>{text || '-'}</div>
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
        {record.added == 1 ? <a href='javascript:;' onClick={() => {
          handleAddNumber(record)
        }}>申请新增账号</a> : null}
        {/* {[12, 21, 25, 31].includes(parseInt(record.customer_confirmation_status)) && [0, 3, 4].includes(parseInt(record.last_apply_status)) && <div><a href='javascript:;' onClick={() => {
          handleChangeNumber(record.order_id)
        }}>申请换号</a></div>} */}
        {
          record.change == 1 ? <a href='javascript:;' onClick={() => {
            handleChangeNumber(record)
          }}>申请换号</a> : null
        }
        {
          record.stopAndUpdate == 1 ? <a href='javascript:;' onClick={() => {
            handleQuitOrder(record.order_id)
          }}>申请终止合作</a> : null
        }
        {/* {
          record.stopAndUpdate == 1 ?  */}
        <a href='javascript:;' onClick={() => {
          handleUpdateOrder(record)
        }}>申请更新信息</a>
        {/* //   : null
        // } */}
        {/* {[12, 21, 25, 31].includes(parseInt(record.customer_confirmation_status)) && [0, 3, 4].includes(parseInt(record.last_apply_status)) && <div><a href='javascript:;' onClick={() => {
          handleQuitOrder(record.order_id)
        }}>申请终止合作</a></div>}
        {[12, 21, 22, 26, 27, 28, 32, 33, 34].includes(parseInt(record.customer_confirmation_status)) && [0, 3, 4].includes(parseInt(record.last_apply_status)) && <div><a href='javascript:;' onClick={() => {
          handleUpdateOrder(record.order_id)
        }}>申请更新信息</a></div>} */}
        {/* {record.customer_confirmation_status == 11 && [0, 4].includes(parseInt(record.last_apply_status)) && <div><a href='javascript:;' onClick={() => {
          handleEditOrder(record.order_id)
        }}>编辑信息</a></div>} */}
        {
          record.is_inward_send == 2 ? <div><a href='javascript:;' onClick={() => {
            handleEditOrder(record)
          }}>编辑信息</a></div> : null
        }
        {/* {record.customer_confirmation_status == 11 && [0, 4].includes(parseInt(record.last_apply_status)) && <div><a href='javascript:;' onClick={() => {
          handleDelete(record.order_id)
        }}>删除订单</a></div>} */}
        {
          record.is_inward_send == 2 ? <div><a href='javascript:;' onClick={() => {
            handleEditOrder(record)
          }}>删除订单</a></div> : null
        }
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
    width: 100,
    render: (text, record) => {
      const node = <div>
        <div>拒绝原因：{record.check_reason}</div>
        {/* <div>拒绝时间：{record.check_at}</div> */}
      </div>
      return text ? record.apply_status == 4 ? <Tooltip title={node}>{APPLY_STATUS[text]}</Tooltip> : APPLY_STATUS[text] : '-'
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
      return record.apply_type == 6 ? '-' : <div>
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
        <div style={{ textAlign: 'left' }}>申请时间：{record.created_at || '-'}</div>
        <div style={{ textAlign: 'left' }}>审核时间：{record.check_at == '0000-00-00 00:00:00' ? '-' : record.check_at}</div>
      </div>
    }
  }
];
export const AddOrderCols = [
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
    title: 'PriceID',
    dataIndex: 'price_id',
    key: 'price_id',
    align: 'center',
    width: 100
  },
  {
    title: 'Cost（元）',
    dataIndex: 'cost',
    key: 'cost',
    align: 'center',
    width: 100,
    render: text => {
      return text && numeral(text).format('0,0.00') || '-'
    }
  },
  {
    title: 'Costwithfee（元）',
    dataIndex: 'costwithfee',
    key: 'costwithfee',
    align: 'center',
    width: 100,
    render: text => {
      return text && numeral(text).format('0,0.00') || '-'
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
  }, {
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
    width: 100
  },
  {
    title: 'Cost（元）',
    dataIndex: 'cost',
    key: 'cost',
    align: 'center',
    width: 100,
    render: text => {
      return text && numeral(text).format('0,0.00') || '-'
    }
  },
  {
    title: 'Costwithfee（元）',
    dataIndex: 'costwithfee',
    key: 'costwithfee',
    align: 'center',
    width: 100,
    render: text => {
      return text && numeral(text).format('0,0.00') || '-'
    }
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
  }, {
    title: 'PriceID',
    dataIndex: 'price_id',
    key: 'price_id',
    align: 'center',
    width: 100
  }
];
//客户确认状态
export const STATUS_CUSTOMER = [
  { key: '客户待确认', value: 11 },
  { key: '客户已确认', value: 12 },
  { key: '客户已拒绝', value: 13 },
  { key: '客户取消', value: 14 },
  { key: '过时未确认', value: 15 },
  { key: '待支付', value: 36 }
];
//详情客户确认状态
export const DETAIL_STATUS_CUSTOMER = [
  { key: 'SP更新待提交客户审核', value: 1 },
  { key: 'SP更新待审核', value: 2 },
  { key: 'SP更新审核通过', value: 3 },
  { key: 'SP更新审核被拒', value: 4 },
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
