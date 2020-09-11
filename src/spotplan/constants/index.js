import React from 'react'
import { Modal, Input, Form, Select, Tooltip, DatePicker, InputNumber } from 'antd'
import numeral from 'numeral'
import moment from 'moment'

import '../containers/index.less'
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
let position = {
  1: '头条',
  2: '次条',
  3: '三条',
  4: '四条',
  5: '五条',
  6: '六条',
  7: '七条',
  8: '八条',
}
let clientName = {
  1: '天猫',
  2: '京东',
  3: '唯品会',
  4: '考拉',
  5: '苏宁易购',
  6: '线上（其他）',
  7: '七条',
  8: '线下',
}
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
export const EditOrderFunc = (getFieldDecorator, handleUpdate, handleDelete, getFieldValue, setFieldsValue, validateFields) => [
  {
    title: '订单ID',
    dataIndex: 'order_id',
    key: 'order_id',
    align: 'center',
    width: 110,
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
    title: '账号ID（必填）',
    dataIndex: 'weibo_id',
    key: 'weibo_id',
    align: 'center',
    width: 120,
    render: (text, record) => {
      return <FormItem>
        {getFieldDecorator(`${record.order_id}.weibo_id`, {
          validateTrigger: ['onChange'],
          validateFirst: true,
          rules: [{ required: true, message: '请填写账号ID' }, {
            validator: (rule, value, callback) => {
              let reg = /^[^\u4e00-\u9fa5]{0,255}$/
              if (value == '') {
                callback('请输入')
              } else if (!reg.test(value)) {
                callback('请输入中文除外的，最多255个字符')
              } else {
                callback()
              }
            }
          }]
        })(
          <Input onFocus={() => {
            if (record.weibo_type == 23) {
              let newWei = `${record.order_id}.weibo_id`;
              setFieldsValue({ [newWei]: '' });
            }
          }} onBlur={(e) => {
            if (e.target.value != record.weibo_id) {
              handleUpdate({ order_id: record.order_id, price_id: record.price_id, weibo_id: e.target.value })
            }
          }} />
        )
        }
      </FormItem>
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
      // const flag = (record.customer_confirmation_status == 11 && [0, 4].includes(parseInt(record.last_apply_status))) ? true : false;
      return record.is_inward_send == 1 || record.last_apply_status == 1 || record.last_apply_status == 2 ? text : <FormItem>
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
      </FormItem>
    }
  },
  {
    title: 'Cost（元）',
    dataIndex: 'cost',
    key: 'cost',
    align: 'center',
    width: 180,
    render: (text, record) => {
      return record.is_inward_send == 1 || record.last_apply_status == 1 || record.last_apply_status == 2 ? text && numeral(text).format('0,0.00') || '-' : <FormItem>
        {getFieldDecorator(`${record.order_id}.cost`, {
          validateTrigger: ['onChange'],
          validateFirst: true,
          rules: [{ required: true, message: '请填写cost金额' }, {
            validator: (rule, value, callback) => {
              if (value.toString().split('.')[0].length > 8) {
                callback('最多输入8位数')
                return
              } else if (value <= 0) {
                callback('请输入大于0的数')
                return
              } else {
                callback()
              }
            }
          }]
        })(
          <InputNumber precision={2} max={99999999} min={1} style={{ width: 150 }} onBlur={(e) => {
            validateFields([`${record.order_id}.cost`], (errors, values) => {
              if (!errors) {
                if (e.target.value != '' && e.target.value != record.cost) {
                  handleUpdate({ order_id: record.order_id, price_id: record.price_id, cost: e.target.value }).then((res) => {
                    if (record.costwithfee) {
                      let newAt = `${record.order_id}.costwithfee`;
                      setFieldsValue({ [newAt]: res.data.costwithfee });
                      validateFields([`${record.order_id}.costwithfee`])
                    }
                  })
                }
              }
            })

          }} />
        )
        }
      </FormItem>
    }
  },
  {
    title: 'Costwithfee（元）',
    dataIndex: 'costwithfee',
    key: 'costwithfee',
    align: 'center',
    width: 180,
    render: (text, record) => {
      return record.is_inward_send == 1 || record.last_apply_status == 1 || record.last_apply_status == 2 ? text && numeral(text).format('0,0.00') || '-' : <FormItem>
        {getFieldDecorator(`${record.order_id}.costwithfee`, {
          validateTrigger: ['onChange'],
          validateFirst: true,
          rules: [{ required: true, message: '请填写costwithfee金额' }, {
            validator: (rule, value, callback) => {
              if (value.toString().split('.')[0].length > 9) {
                callback('最多输入9位数')
                return
              }else if (value == 0) {
                callback('请输入非0的数')
                return
              }else {
                callback()
              }
            }
          }]
        })(
          <InputNumber precision={2} max={999999999} style={{ width: 150 }} onBlur={(e) => {
            validateFields([`${record.order_id}.costwithfee`], (errors, values) => {
              if (!errors) {
                if (e.target.value != '' && e.target.value != record.costwithfee) {
                  handleUpdate({ order_id: record.order_id, price_id: record.price_id, costwithfee: e.target.value })
                }
              }
            })
          }} />
        )
        }
      </FormItem>
    }
  },
  {
    title: '账号分类',
    dataIndex: 'account_category_name',
    key: 'account_category_name',
    align: 'center',
    width: 100,
    render: (text, record) => {
      // const flag = (record.customer_confirmation_status == 11 && [0, 4].includes(parseInt(record.last_apply_status))) ? true : false;
      return record.is_inward_send == 1 || record.last_apply_status == 1 || record.last_apply_status == 2 ? text : <FormItem>
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
    title: '位置/直发or转发',
    dataIndex: 'release_form',
    key: 'release_form',
    align: 'center',
    width: 210,
    render: (text, record) => {
      // const flag = (record.customer_confirmation_status == 11 && [0, 4].includes(parseInt(record.last_apply_status))) ? true : false;
      return record.is_inward_send == 1 || record.last_apply_status == 1 || record.last_apply_status == 2 ? text : <FormItem>
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
      </FormItem>
    }
  },
  {
    title: '发文位置（微信必填）',
    dataIndex: 'publish_articles_address',
    key: 'publish_articles_address',
    align: 'center',
    width: 210,
    render: (text, record) => {
      return record.is_inward_send == 1 || record.last_apply_status == 1 || record.last_apply_status == 2 ? position[text] : <FormItem>
        {getFieldDecorator(`${record.order_id}.publish_articles_address`, {
          validateTrigger: ['onChange'],
          validateFirst: true,
          rules: [
            {
              required: record.weibo_type == 9 ? true : false,
              message: '请填写发文位置',
            }]
        })(
          <Select placeholder="请选择" style={{ width: 120 }} onChange={(value) => {
            handleUpdate({ order_id: record.order_id, price_id: record.price_id, publish_articles_address: value || '' })
          }} allowClear>
            <Option value={1}>头条</Option>
            <Option value={2}>次条</Option>
            <Option value={3}>三条</Option>
            <Option value={4}>四条</Option>
            <Option value={5}>五条</Option>
            <Option value={6}>六条</Option>
            <Option value={7}>七条</Option>
            <Option value={8}>八条</Option>
          </Select>
        )}
      </FormItem>
    }
  },
  {
    title: '发文时间（微信必填）',
    dataIndex: 'publish_articles_at',
    key: 'publish_articles_at',
    align: 'center',
    width: 210,
    render: (text, record) => {
      return record.is_inward_send == 1 || record.last_apply_status == 1 || record.last_apply_status == 2 ? text : <FormItem>
        {getFieldDecorator(`${record.order_id}.publish_articles_at`, {
          validateTrigger: ['onChange'],
          validateFirst: true,
          rules: [
            {
              required: record.weibo_type == 9 ? true : false,
              message: '请填写发文时间',
            }]
        })(
          <DatePicker dropdownClassName="sp-calendar" allowClear={record.publish_articles_at == null ? true : false} showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }} format="YYYY-MM-DD HH:mm:ss" placeholder="请输入" style={{ width: 130 }} onOk={(value) => {
            handleUpdate({ order_id: record.order_id, price_id: record.price_id, publish_articles_at: value.format("YYYY-MM-DD HH:mm:ss") })
          }} onBlur={() => {
            let newAt = `${record.order_id}.publish_articles_at`;
            console.log(record.publish_articles_at)
            // console.log(getFieldValue(`${record.order_id}.publish_articles_at`).format("YYYY-MM-DD HH:mm:ss"))
            if (!getFieldValue(`${record.order_id}.publish_articles_at`)) {
              if (record.publish_articles_at != '0000-00-00 00:00:00') {
                if (record.publish_articles_at) {
                  setFieldsValue({ [newAt]: moment(record.publish_articles_at) })
                }
              }
            } else if (record.publish_articles_at != getFieldValue(`${record.order_id}.publish_articles_at`).format("YYYY-MM-DD HH:mm:ss")) {
              handleUpdate({ order_id: record.order_id, price_id: record.price_id, publish_articles_at: getFieldValue(`${record.order_id}.publish_articles_at`).format("YYYY-MM-DD HH:mm:ss") })
            }
          }} />
        )}
      </FormItem>
    }
  }, {
    title: 'Client（非必填）',
    dataIndex: 'client',
    key: 'client',
    align: 'center',
    width: 210,
    render: (text, record) => {
      return record.is_inward_send == 1 || record.last_apply_status == 1 || record.last_apply_status == 2 ? position[text] : <FormItem>
        {getFieldDecorator(`${record.order_id}.client`)(
          <Select placeholder="请选择" style={{ width: 120 }} onChange={(value) => {
            handleUpdate({ order_id: record.order_id, price_id: record.price_id, client: value || '' })
          }} allowClear>
            <Option value={1}>天猫</Option>
            <Option value={2}>京东</Option>
            <Option value={3}>唯品会</Option>
            <Option value={4}>考拉</Option>
            <Option value={5}>苏宁易购</Option>
            <Option value={6}>线上（其他）</Option>
            <Option value={7}>线下</Option>
          </Select>
        )}
      </FormItem>
    }
  }, {
    title: 'content type（非必填）',
    dataIndex: 'content_type',
    key: 'content_type',
    align: 'center',
    width: 240,
    render: (text, record) => {
      // const flag = (record.customer_confirmation_status == 11 && [0, 4].includes(parseInt(record.last_apply_status))) ? true : false;
      return record.is_inward_send == 1 || record.last_apply_status == 1 || record.last_apply_status == 2 ? <Tooltip title={<div style={{ width: '200px' }}>{text}</div>}>
        <div style={{ width: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{text}
        </div>
      </Tooltip> : <FormItem>
          {getFieldDecorator(`${record.order_id}.content_type`, {
            rules: [
              { max: 255, message: '不能超过255字' }
            ]
          })(
            <TextArea autosize={false} style={{ width: 140, height: 86, resize: 'none', marginRight: '20px' }} placeholder='请填写内容类型' onBlur={(e) => {
              if (e.target.value != record.content_type) {
                handleUpdate({ order_id: record.order_id, price_id: record.price_id, content_type: e.target.value })
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
    width: 240,
    render: (text, record) => {
      // const flag = (record.customer_confirmation_status == 11 && [0, 4].includes(parseInt(record.last_apply_status))) ? true : false;
      return record.is_inward_send == 1 || record.last_apply_status == 1 || record.last_apply_status == 2 ? <Tooltip title={<div style={{ width: '200px' }}>{text}</div>}>
        <div style={{ width: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{text}
        </div>
      </Tooltip> : <FormItem>
          {getFieldDecorator(`${record.order_id}.content`, {
            rules: [
              { max: 120, message: '不能超过120字' }
            ]
          })(
            <TextArea autosize={false} style={{ width: 140, height: 86, resize: 'none', marginRight: '20px' }} placeholder='填写备注信息' onBlur={(e) => {
              if (e.target.value != record.content) {
                handleUpdate({ order_id: record.order_id, price_id: record.price_id, content: e.target.value })
              }
            }} />
          )
          }
        </FormItem>
    }
  }, {},
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    fixed: 'right',
    width: 100,
    render: (text, record) => {
      return record.is_inward_send == 1 || record.last_apply_status == 1 || record.last_apply_status == 2 ? null : <div><a href='javascript:;' onClick={() => {
        handleDelete(record.order_id)
      }}>删除订单</a></div>
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

export const DetailTableFunc = (handleChangeNumber, handleQuitOrder, handleUpdateOrder, handleEditOrder, handleDelete, handleHistory, handleAddNumber, handleUpdateArtical) => [
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
  }, {
    title: 'Spotplan下发状态',
    dataIndex: 'is_inward_send',
    key: 'is_inward_send',
    align: 'center',
    width: 180,
    render: (text, record) => {
      return record.inward_send_at != '0000-00-00 00:00:00' ? <Tooltip title={<div><p>成功下发时间</p><p>{record.inward_send_at}</p></div>}>
        <span>{record.is_inward_send == 1 ? 'SP下发成功' : '待下发SP'}</span>
      </Tooltip> : <span>{record.is_inward_send == 1 ? 'SP下发成功' : '待下发SP'}</span>
    }
  },
  {
    title: 'spotplan更新审核状态',
    dataIndex: 'last_apply_status',
    key: 'last_apply_status',
    align: 'center',
    width: 120,
    render: (text, record = {}) => {
      const _record = record.record || {};
      const node = text ? <div>
        <div>申请类型：{APPLY_TYPE[_record.apply_type]} <a href='javascript:;' onClick={(e) => {
          handleHistory(e, _record);
        }}>查看详情</a></div>
        {_record.apply_status == 4 && <div>拒绝原因：{_record.check_reason}</div>}
        {_record.apply_status == 4 && <div>拒绝时间：{_record.check_at}</div>}
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
      return <div>{text && numeral(text).format('0,0.00') || '-'}</div>
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
      return text ? <Tooltip title={<div style={{ width: '120px' }}>{text}</div>}>
        <div style={{ width: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{text || '-'}
        </div>
      </Tooltip> : '-'
    }
  }, {
    title: '发文位置',
    dataIndex: 'publish_articles_address',
    key: 'publish_articles_address',
    align: 'center',
    width: 120,
    render: text => {
      return text ? position[text] : '-'
    }
  }, {
    title: '发文时间',
    dataIndex: 'publish_articles_at',
    key: 'publish_articles_at',
    align: 'center',
    width: 120,
    render: text => {
      return text ? text : '-'
    }
  }, {
    title: 'Client',
    dataIndex: 'client',
    key: 'client',
    align: 'center',
    width: 120,
    render: text => {
      return text ? clientName[text] : '-'
    }
  }, {
    title: 'content type',
    dataIndex: 'content_type',
    key: 'content_type',
    align: 'center',
    width: 120,
    render: text => {
      return text ? text : '-'
    }
  },
  {
    title: '备注',
    dataIndex: 'content',
    key: 'content',
    align: 'center',
    width: 120,
    render: text => {
      return text ? <Tooltip title={<div style={{ width: '120px' }}>{text}</div>}>
        <div style={{ width: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{text || '-'}
        </div>
      </Tooltip> : '-'
    }
  }, {},
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    width: 100,
    fixed: 'right',
    render: (text, record) => {
      return <>
        {record.added == 1 ? <div> <a href='javascript:;' onClick={() => {
          handleAddNumber(record.order_id)
        }}>申请新增账号</a> </div> : null}
        {
          record.change == 1 ? <div> <a href='javascript:;' onClick={() => {
            handleChangeNumber(record.order_id)
          }}>申请换号</a></div> : null
        }
        {
          record.stopAndUpdate == 1 ? <div>  <a href='javascript:;' onClick={() => {
            handleQuitOrder(record.order_id)
          }}>申请终止合作</a> </div> : null
        }
        {
          record.stopAndUpdate == 1 ?
            <div> <a href='javascript:;' onClick={() => {
              handleUpdateOrder(record.order_id)
            }}>申请更新信息</a> </div> : null}
        {
          record.stopAndUpdate == 1 ?
            <div> <a href='javascript:;' onClick={() => {
              handleUpdateArtical(record.order_id)
            }}>修改订单信息</a> </div> : null}

        {
          record.is_inward_send == 1 || record.last_apply_status == 1 || record.last_apply_status == 2 ? null : <div><a href='javascript:;' onClick={() => {
            handleEditOrder(record.order_id)
          }}>编辑信息</a></div>
        }
        {
          record.is_inward_send == 1 || record.last_apply_status == 1 || record.last_apply_status == 2 ? null : <div><a href='javascript:;' onClick={() => {
            handleDelete(record.order_id)
          }}>删除订单</a></div>
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
    render: (text, record) => {
      return record.apply_type != 7 ? <div>
        {text && text.map((item, index) => {
          return <div key={index}>
            <div style={{ textAlign: 'left' }}>【订单ID:{item.order_id}、{item.weibo_name}】</div>
            {item.price_name && <div style={{ textAlign: 'left' }}>价格名称：{item.price_name}</div>}
            {item.cost && <div style={{ textAlign: 'left' }}>Cost(元)：{numeral(item.cost).format('0,0.00')}</div>}
            {item.service_rate && <div style={{ textAlign: 'left' }}>服务费率：{item.service_rate}%</div>}
            {item.account_category_name && <div style={{ textAlign: 'left' }}>账号分类：{item.account_category_name}</div>}
            {item.release_form && <div style={{ textAlign: 'left' }}>位置/直发or转发：{item.release_form}</div>}
            {item.publish_articles_address && <div style={{ textAlign: 'left' }}>发文位置(非必填):{position[item.publish_articles_address]}</div>}
            {item.publish_articles_at && <div style={{ textAlign: 'left' }}>发文时间(非必填)：{item.publish_articles_at}</div>}
            {item.content && <div style={{ textAlign: 'left' }}>备注(非必填)：{item.content}</div>}
          </div>
        })}
      </div> : '-'
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
            {item.cost && <div style={{ textAlign: 'left' }}>Cost(元)：<span style={item.cost != before_item.cost ? { color: 'red' } : {}}>{numeral(item.cost).format('0,0.00')}</span></div>}
            {item.costwithfee && <div style={{ textAlign: 'left' }}>Costwithfee(元)：<span style={item.costwithfee != before_item.costwithfee ? { color: 'red' } : {}}>{numeral(item.costwithfee).format('0,0.00')}</span></div>}
            {item.service_rate && <div style={{ textAlign: 'left' }}>服务费率：<span style={item.service_rate != before_item.service_rate ? { color: 'red' } : {}}>{item.service_rate}%</span></div>}
            {item.account_category_name && <div style={{ textAlign: 'left' }}>账号分类：<span style={item.account_category_name != before_item.account_category_name ? { color: 'red' } : {}}>{item.account_category_name}</span></div>}
            {item.release_form && <div style={{ textAlign: 'left' }}>位置/直发or转发：<span style={item.release_form != before_item.release_form ? { color: 'red' } : {}}>{item.release_form}</span></div>}
            {item.publish_articles_address && <div style={{ textAlign: 'left' }}>发文位置(非必填)：<span style={item.publish_articles_address != before_item.publish_articles_address ? { color: 'red' } : {}}>{position[item.publish_articles_address]}</span></div>}
            {item.publish_articles_at && <div style={{ textAlign: 'left' }}>发文时间(非必填)：<span style={item.publish_articles_at != before_item.publish_articles_at ? { color: 'red' } : {}}>{item.publish_articles_at}</span></div>}
            {item.content && <div style={{ textAlign: 'left' }}>备注(非必填):<span style={item.content != before_item.content ? { color: 'red' } : {}}>{item.content}</span></div>}
          </div>
        })}
      </div>
    }
  }, {
    title: '原因',
    dataIndex: 'reason',
    key: 'reason',
    align: 'center',
    width: 100,
    render: (text) => {
      return text ? text : '-'
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
export const ArticalCols = [
  {
    title: '订单ID',
    dataIndex: 'order_id',
    key: 'order_id',
    align: 'center',
    className: "columns",
  },
  {
    title: '订单状态',
    dataIndex: 'status_name',
    key: 'status_name',
    align: 'center',
    className: "columns",
  },
  {
    title: '需求名称',
    dataIndex: 'requirement_name',
    key: 'requirement_name',
    align: 'center',
    className: "columns",
  },
  {
    title: '平台',
    dataIndex: 'weibo_type_name',
    key: 'weibo_type_name',
    align: 'center',
    className: "columns",
  },
  {
    title: '账号名称',
    dataIndex: 'weibo_name',
    key: 'weibo_name',
    align: 'center',
    className: "columns",
  }, {
    title: '账号ID',
    dataIndex: 'weibo_id',
    key: 'weibo_id',
    align: 'center',
    className: "columns",
    render: (text, record) => {
      const flag = record.weibo_type == 23 ? true : false;
      return <div>{flag ? '-' : text}</div>
    }
  }, {
    title: 'PriceID',
    dataIndex: 'price_id',
    key: 'price_id',
    align: 'center',
    className: "columns",
  },
  {
    title: '价格名称',
    dataIndex: 'price_name',
    key: 'price_name',
    align: 'center',
    className: "columns",
  },
  {
    title: 'Cost（元）',
    dataIndex: 'cost',
    key: 'cost',
    align: 'center',
    className: "columns",
    render: text => {
      return text && numeral(text).format('0,0.00') || '-'
    }
  },
  {
    title: 'Costwithfee（元）',
    dataIndex: 'costwithfee',
    key: 'costwithfee',
    align: 'center',
    className: "columns",
    render: text => {
      return text && numeral(text).format('0,0.00') || '-'
    }
  },
  {
    title: '发文时间',
    dataIndex: 'publish_articles_at',
    key: 'publish_articles_at',
    align: 'center',
    className: "columns",
    render: text => {
      return text ? text : '-'
    }
  },
  {
    title: 'Client',
    dataIndex: 'client',
    key: 'client',
    align: 'center',
    className: "columns",
    render: text => {
      return text ? clientName[text] : '-'
    }
  },
  {
    title: 'content type',
    dataIndex: 'content_type',
    key: 'content_type',
    align: 'center',
    className: "columns",
    render: text => {
      return text ? text : '-'
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
