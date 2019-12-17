import React from 'react'
import { Form, Input } from 'antd'

function KpiForm(props) {
  const { form } = props
  const { getFieldDecorator } = form
  const list = [
    {
      name: '多图文第一条',
      startKey: 'mediaIndex1stReadKpiStartNum',
      endKey: 'mediaIndex1stReadKpiEndNum'
    }, {
      name: '多图文第二条',
      startKey: 'mediaIndex2stReadKpiStartNum',
      endKey: 'mediaIndex2stReadKpiEndNum'
    }, {
      name: '多图文第3-N条',
      startKey: 'mediaOtherReadKpiStartNum',
      endKey: 'mediaOtherReadKpiEndNum'
    },
  ]
  return (
    <div>
      <Form.Item label='KPI范围'>
        {list.map(one => <span key={one.name} style={{ paddingLeft: 10 }}>
          {one.name}
          {getFieldDecorator(`form.${one.startKey}`, {
          })(
            <Input placeholder='请输入' style={{ width: 100, margin: '0px 6px' }} />
          )}-
        {getFieldDecorator(`form.${one.endKey}`, {
          })(
            <Input placeholder='请输入' style={{ width: 100, margin: '0px 6px' }} />
          )}</span>)}
      </Form.Item>
    </div>
  )
}

export default KpiForm
