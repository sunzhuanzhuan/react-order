
import React from 'react'
import { Form, Select, Modal, Input, InputNumber } from 'antd'
const { Option } = Select;
const { confirm } = Modal;
export const columnsWeidu = (getFieldDecorator) => {
  return [
    {
      title: '定向维度',
      dataIndex: 'itemTypef',
      width: '30%',
      render: (val, record) => {
        return <Form.Item>
          {getFieldDecorator(`${record.groupId}.itemTypef`, {
            initialValue: val
          })(
            <Select mode="tags" style={{ width: '300px' }} placeholder="添加维度">
              <Option value='1'>乘车日期</Option>
              <Option value='2'>目的地城市</Option>
              <Option value='3'>出发城市</Option>
              <Option value='4'>性别</Option>
              <Option value='5'>年龄</Option>
              <Option value='6'>车次字头</Option>
              <Option value='7'>坐席</Option>
            </Select>
          )
          }
        </Form.Item>

      }
    },
    {
      title: '图文形式折扣售价（元/条）',
      render: (val, record) => {
        return record.offerTypes.map((item) => {
          if (item.offerType == 1) {
            return <Form.Item>
              {getFieldDecorator(`${record.groupId}.B`, {
                initialValue: item.unitPrice
              })(
                <InputNumber min={0} precision={2} />
              )
              }
            </Form.Item>
          }
        })
      }
    },
    {
      title: '视频形式折扣售价（元/条）',
      render: (val, record) => {
        return record.offerTypes.map((item) => {
          if (item.offerType == 2) {
            return <Form.Item>
              {getFieldDecorator(`${record.groupId}.C`, {
                initialValue: item.unitPrice
              })(
                <InputNumber min={0} precision={2} />
              )
              }
            </Form.Item>
          }
        })
      }
    }, {
      title: '图文形式刊例价（元/条）',
      render: (val, record) => {
        return record.offerTypes.map((item) => {
          if (item.offerType == 3) {
            return <Form.Item>
              {getFieldDecorator(`${record.groupId}.D`, {
                initialValue: item.unitPrice
              })(
                <InputNumber min={0} precision={2} />
              )
              }
            </Form.Item>
          }
        })
      }
    },
    {
      title: '视频形式刊例价（元/条）',
      render: (val, record) => {
        return record.offerTypes.map((item) => {
          if (item.offerType == 4) {
            return <Form.Item>
              {getFieldDecorator(`${record.groupId}.E`, {
                initialValue: item.unitPrice
              })(
                <InputNumber min={0} precision={2} />
              )
              }
            </Form.Item>
          }
        })
      }
    }
  ];
}
export const columnsTian = (getFieldDecorator) => [
  {
    title: '投放天数（天）',
    dataIndex: 'launchDay',
    render: (val, record, index) => {
      return <Form.Item>
        {getFieldDecorator(`${record.id}.B`, {
          initialValue: val
        })(
          <InputNumber min={0} />
        )
        }
      </Form.Item>
    }
  },
  {
    title: '对外售价（元）',
    dataIndex: 'taskOfferPrice',
    render: (val, record, index) => {
      return <Form.Item>
        {getFieldDecorator(`${record.id}.C`, {
          initialValue: val
        })(
          <InputNumber min={0} precision={2} />
        )
        }
      </Form.Item>
    }
  },
]
export const columnsHui = (getFieldDecorator) => {
  return [
    {
      title: '对外售价（元）',
      dataIndex: 'taskOfferPrice',
      render: (val, record, index) => {
        return <Form.Item>
          {getFieldDecorator(`${record.id}.B`, {
            initialValue: val
          })(
            <InputNumber min={0} precision={2} />
          )
          }
        </Form.Item>
      }
    },
    {
      title: '返现金额（元）',
      dataIndex: 'discountPrice',
      render: (val, record) => {
        return <Form.Item>
          {getFieldDecorator(`${record.id}.C`, {
            initialValue: val
          })(
            <InputNumber min={0} precision={2} />
          )
          }
        </Form.Item>
      }
    },
  ]
}
