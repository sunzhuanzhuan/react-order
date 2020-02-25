
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
            initialValue: val,
            rules: [
              {
                required: true,
                message: '请选择定向维度',
              },
            ],
          })(
            <Select style={{ width: '300px' }} placeholder="添加维度" mode="multiple">
              <Option value='1'>乘车日期</Option>
              <Option value='2'>目的地城市</Option>
              <Option value='3'>出发城市</Option>
              <Option value='5'>性别</Option>
              <Option value='6'>年龄</Option>
              <Option value='7'>车次字头</Option>
              <Option value='8'>坐席</Option>
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
                initialValue: item.unitPrice,
                rules: [
                  {
                    required: true,
                    message: '请输入图文形式折扣售价',
                  },
                ],
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
                initialValue: item.unitPrice,
                rules: [
                  {
                    required: true,
                    message: '请输入视频形式折扣售价',
                  },
                ],
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
                initialValue: item.unitPrice,
                rules: [
                  {
                    required: true,
                    message: '请输入图文形式刊例价',
                  },
                ],
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
                initialValue: item.unitPrice,
                rules: [
                  {
                    required: true,
                    message: '请输入视频形式刊例价',
                  },
                ],
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
          initialValue: val,
          rules: [
            {
              required: true,
              message: '请输入投放天数',
            },
          ],
        })(
          <InputNumber min={0} max={9999999999999} />
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
          initialValue: val,
          rules: [
            {
              required: true,
              message: '请输入对外售价',
            },
          ],
        })(
          <InputNumber min={0} precision={2} max={9999999999999} />
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
            initialValue: val,
            rules: [
              {
                required: true,
                message: '请输入对外售价',
              },
            ],
          })(
            <InputNumber min={0} precision={2} max={9999999999999} />
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
            initialValue: val,
            rules: [
              {
                required: true,
                message: '请输入返现金额',
              },
            ],
          })(
            <InputNumber min={0} precision={2} max={9999999999999} />
          )
          }
        </Form.Item>
      }
    },
  ]
}
