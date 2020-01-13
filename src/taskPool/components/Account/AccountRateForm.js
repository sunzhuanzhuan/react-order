
import React, { useEffect } from 'react'
import { Form, Rate, Button, message } from 'antd';
import './AccountRateForm.less'
function AccountRate(props) {
  const { form, actions, accountEstimateDetails = {}, isDisabled, accountId } = props
  useEffect(() => {
    getEstimate()
  }, [])
  async function getEstimate() {
    await actions.TPGetAccountEstimateDetails({ accountId: accountId })
  }
  const { estimateitems = [] } = accountEstimateDetails
  function rateVali(rule, value, callback) {
    if (value > 0.5 || value == 0.5) {
      callback()
    } else {
      callback("请勾选评分")
    }
  }
  function saveList() {
    form.validateFields((error, values) => {
      if (!error) {
        const list = estimateitems.map(one => ({ ...one, contentEstimateScore: values[one.dicItemId] }))
        save(list)
      }
    })
  }
  async function save(list) {
    await actions.TPAccountEstimateSubmit({ estimateitems: list, accountId: accountId })
    message.success('操作成功')
    props.getAccountDetailAsync()
    getEstimate()
  }
  return <Form>
    <table className='account-rate-table' border='1'>
      <tbody>
        <tr>
          <th>序号</th>
          <th>调查项</th>
          <th>提示</th>
          <th className='is-required'>评分</th>
        </tr>
        {estimateitems.map((one, index) => <tr key={one.dicItemId}>
          <td>{index + 1}</td>
          <td>{one.itemName}</td>
          <td>{one.itemDesc}</td>
          <td>
            <Form.Item style={{ margin: 0 }}>
              {form.getFieldDecorator(`${one.dicItemId}`, {
                rules: [
                  {
                    required: true,
                    message: `评分不能为空`,
                  },
                  { validator: rateVali },
                ],
                initialValue: one.contentEstimateScore,
              })(<Rate allowHalf disabled={isDisabled} />)}
            </Form.Item>
          </td>
        </tr>
        )}
      </tbody>
    </table>
    {!isDisabled ? <div className='button-footer'>
      <Button onClick={() => window.open('/order/task/account-manage', "_self")}>返回</Button>
      <Button type='primary' onClick={saveList}>提交</Button>
    </div> : null}
  </Form>
}
const AccountRateForm = Form.create()(AccountRate)
export default AccountRateForm
